import React, { useEffect, useReducer, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHistory } from "@fortawesome/free-solid-svg-icons";

import { NavLink } from "react-router-dom";

// search service
import { getAllSugests } from "./searchService";

// spinner
import Spinner from "../../snipper/spinner";

// types
type props = {
   showModal: boolean;
};

type reducerState = {
   searchSugests: any;
   filtered: any;
};
type action = {
   type: string;
   payload: any;
};

// initial state
const initialState: reducerState = {
   filtered: [],
   searchSugests: [],
};

// search reducer
const searchReducer = (state: reducerState, action: action) => {
   switch (action.type) {
      case "setSearchSugests":
         return { ...state, searchSugests: action.payload };
      case "setFiltered":
         if (action.payload) {
            return {
               ...state,
               filtered: state.searchSugests.filter((item: any) =>
                  item.title.toLowerCase().includes(action.payload.toLowerCase())
               ),
            };
         }
         return {
            ...state,
            filtered: state.searchSugests.filter((item: any) => item.history).slice(0, 5),
         };

      default:
         return state;
   }
};

function Search({ showModal }: props) {
   // reducer, because of handling search sugests
   const [searchItems, searchDispath] = useReducer(searchReducer, initialState);
   // ---end of reducer, because of handling search sugests
   //
   const [showSearchResult, setShowSearchResult] = useState(false);
   const [loading, setLoading] = useState(false);
   // we must get "searchResult and searchSugests" from server
   const [searchResult, setSearchResult] = useState([]);

   // fetching sugests from server
   useEffect(() => {
      // local service "search.ts"
      searchDispath({ type: "setSearchSugests", payload: getAllSugests() });
      searchDispath({ type: "setFiltered", payload: "" });
   }, []);

   // handle search input
   const handleSearchInput = (event: any) => {
      searchDispath({ type: "setFiltered", payload: event.currentTarget.value });
   };

   // do search
   const doSearch = (e: any) => {
      e.preventDefault();
      // search request
      // ...
      setShowSearchResult(true);
      setLoading(true);
      if (!searchResult.length) {
         setTimeout(() => {
            setShowSearchResult(false);
         }, 3000);
      }
      setTimeout(() => {
         setLoading(false);
      }, 1200);
   };

   return (
      <div
         className={`relative flex flex-col shadow-2xl w-11/12 sm:max-w-xl mx-auto bg-white 
         dark:bg-slate-800 mt-6 md:mt-7  mb-30  rounded-md  transition-05 dark:border-slate-500 overflow-y-auto ${
            showModal ? "" : "translate-y-search-modal"
         }`}
      >
         {/* search modal */}
         <div className="p-3 border-b dark:border-slate-600 border-slate-300 sticky top-0 dark:bg-slate-800 bg-white">
            <input
               className="shadow appearance-none border rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               type="text"
               name="search"
               placeholder="جستجو . . ."
               onChange={(e) => {
                  handleSearchInput(e);
               }}
            />
            <button
               className="absolute left-3 top-3 z-50 text-slate-500 px-2 pt-2 bg-slate-300 border-r 
               border-slate-300 rounded-l-sm hover:text-sky-500 transition-03"
               onClick={(e) => doSearch(e)}
            >
               <FontAwesomeIcon icon={faSearch} />
            </button>
         </div>
         {/* search result list */}
         <div
            className={`w-full px-3 py-3 border-b dark:border-slate-600 border-slate-300 ${
               showSearchResult ? "" : "hidden"
            }`}
         >
            {loading ? (
               <div className="flex justify-center items-center">
                  <Spinner spin={loading} />
               </div>
            ) : searchResult.length ? (
               <div className="text-base text-center">
                  <p>not empty</p>
               </div>
            ) : (
               <div className="text-base text-center">
                  <p className="">موردی یافت نشد</p>
               </div>
            )}
         </div>
         {/* ---end of search result list */}
         {!searchItems.searchSugests.length && (
            <div className="text-center py-3 text-slate-500 dark:text-slate-400">
               <p>Nothing to load</p>
            </div>
         )}
         {/* sugests list */}
         {searchItems.filtered.map((item: any, index: number) => {
            return (
               <div key={index}>
                  <NavLink
                     className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 border-b transition-03 px-5 py-2 
                     dark:border-slate-600 border-slate-200 dark:hover:bg-slate-600 dark:active:bg-slate-600 
                     hover:bg-gray-200 active:bg-gray-200"
                     to={`/search/${item.id}?title=${item.title}`}
                  >
                     <div className="dark:text-slate-400 text-slate-400 text-sm">
                        <FontAwesomeIcon className="-mb-0.5" icon={faSearch} />
                        <span className="pr-2">{item.title}</span>
                     </div>
                     <div className="text-slate-400 dark:text-slate-400 text-xs">
                        <span className={`pl-2 ${item.history ? "" : "hidden"}`}>
                           <FontAwesomeIcon className="-mb-0.5" icon={faHistory} />
                        </span>
                        <span>{item.categoryTitle} - </span>
                        <span>تعداد بازدید : </span>
                        <span>{item.visitNumber}</span>
                     </div>
                  </NavLink>
               </div>
            );
         })}
         {/* ---end of sugests list */}
         {/* ---end of search modal */}
      </div>
   );
}

export default Search;
