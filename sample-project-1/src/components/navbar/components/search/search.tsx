import React, { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHistory } from "@fortawesome/free-solid-svg-icons";

// type
import { actionType } from "../../../../store/types/type";

// search service
import { getAllSugests } from "./searchService";

// spinner
import Spinner from "../../../spinner/spinner";

// types
type propsSearch = {
   showModal: boolean;
};

type reducerState = {
   searchSugests: any;
   filtered: any;
};

// initial state
const initialState: reducerState = {
   filtered: [],
   searchSugests: [],
};

// search reducer
const searchReducer = (state: reducerState, action: actionType<any>) => {
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

function Search({ showModal }: propsSearch) {
   // reducer, because of handling search sugests
   const [searchItems, searchDispath] = useReducer(searchReducer, initialState);
   // useState
   const [showSearchResult, setShowSearchResult] = useState(false);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState({ inputEmpty: true, showError: false });
   // we must get "searchResult and searchSugests" from server
   const [searchResult, setSearchResult] = useState([]);

   // fetching sugests from server
   useEffect(() => {
      // local service "search.ts"
      searchDispath({ type: "setSearchSugests", payload: getAllSugests() });
      searchDispath({ type: "setFiltered", payload: "" });
   }, []);

   useEffect(() => {
      // console.log("Search Component re-rendered");
   });

   // handle search input
   const handleSearchInput = (event: any) => {
      searchDispath({ type: "setFiltered", payload: event.currentTarget.value });
      if (event.currentTarget.value.length) {
         setError({ showError: false, inputEmpty: false });
         return;
      }
      setError({ ...error, inputEmpty: true });
   };

   // do search
   const doSearch = (e: any) => {
      e.preventDefault();
      if (error.inputEmpty) {
         setError({ ...error, showError: true });
         return;
      }
      setError({ ...error, showError: false });
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
         data-name="search"
         className={`absolute left-0 right-0 flex flex-col shadow-2xl w-11/12 sm:max-w-xl mx-auto bg-white 
         dark:bg-slate-800 mt-12 mb-30  rounded-md  transition-05 dark:border-slate-500 overflow-y-auto ${
            !showModal && "translate-y-search-modal"
         }`}
      >
         {/* search modal */}
         <div
            data-name="search-input-box"
            className="p-3 border-b dark:border-slate-700 border-slate-300 
                     sticky top-0 dark:bg-slate-800 bg-white transition-03"
         >
            <input
               className="shadow appearance-none border rounded relative w-full py-2 px-3 text-sm
                          dark:bg-slate-700 dark:text-slate-200 dark:border-slate-500
                        text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               type="text"
               name="search"
               placeholder="جستجو . . ."
               onChange={(e) => {
                  handleSearchInput(e);
               }}
            />
            <button
               className="absolute search-btn-position z-50 text-slate-500 hover:text-sky-500 transition-05 
                        dark:bg-slate-500 dark:text-slate-200
                        shadow-2xl rounded-md bg-gray-300 flex justify-center items-center p-1.5"
               onClick={(e) => doSearch(e)}
            >
               <FontAwesomeIcon icon={faSearch} className="" />
            </button>
            {error.showError && (
               <p className="text-xs text-red-500 mt-2 text-center sm:text-right w-full">
                  کلمه مورد نظر را به درستی جستجو کنید
               </p>
            )}
         </div>
         {/* search result list */}
         <div
            data-name="search-result-main"
            className={`w-full px-3 py-3 border-b dark:border-slate-700 border-slate-300 transition-05 min-h-full ${
               !showSearchResult && "hidden"
            }`}
         >
            {loading ? (
               <div className="flex justify-center items-center">
                  <Spinner spin={loading} />
               </div>
            ) : searchResult.length ? (
               <div className="text-base text-center">
                  <p>we have data in list</p>
               </div>
            ) : (
               <div className="text-base text-center">
                  <p className="">موردی یافت نشد</p>
               </div>
            )}
         </div>
         {/* ---end of search result list */}
         {!searchItems.searchSugests.length && (
            <div data-name="search-sugest-empty" className="text-center py-3 text-slate-500 dark:text-slate-400">
               <p>Nothing to load</p>
            </div>
         )}
         {/* sugests list */}
         {searchItems.filtered.map((item: any, index: number) => {
            return (
               <div data-name="search-sugest-item" key={index}>
                  <Link
                     className="w-full flex flex-col xs:flex-row items-center justify-between gap-3 border-b transition-03 
                     px-5 py-2 dark:border-slate-700 border-slate-200 dark:hover:bg-slate-600 dark:active:bg-slate-600 
                     hover:bg-gray-200 active:bg-gray-200"
                     to={`/search/${item.id}?title=${item.title}`}
                  >
                     <div className="dark:text-slate-400 text-slate-400 text-xs">
                        <FontAwesomeIcon className="-mb-0.5" icon={faSearch} />
                        <span className="pr-2">{item.title}</span>
                     </div>
                     <div className="text-slate-400 dark:text-slate-400 text-xs">
                        <span>{item.categoryTitle} - </span>
                        <span>تعداد بازدید : </span>
                        <span>{item.visitNumber}</span>
                        <span className={`pr-4 ${!item.history && "hidden"}`}>
                           <FontAwesomeIcon className="-mb-0.5" icon={faHistory} />
                        </span>
                     </div>
                  </Link>
               </div>
            );
         })}
         {/* ---end of sugests list */}
         {/* ---end of search modal */}
      </div>
   );
}

export default React.memo(Search);
