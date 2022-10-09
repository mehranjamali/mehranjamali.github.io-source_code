import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faPlus, faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";

// component
import Spinner from "../../../../../../components/spinner/spinner";

// service
import { getRelevantList, relevantListType } from "./relevantService";

const initialState = {
   relevantList: [] as relevantListType,
   partOfList: [] as relevantListType,
   // partNumber: 0,
   // showLoadMoreBtn: false,
};

// spinner size
const spinnerSize = {
   layer1: { width: "w-3", height: "h-3" },
   layer2: { width: "w-2", height: "h-2" },
   layer3: { width: "w-1", height: "h-1" },
};

const reducer = (state: typeof initialState, action: any) => {
   switch (action.type) {
      case "setRelevantList":
         return { ...state, relevantList: [...action.payload], partOfList: [...action.payload].splice(0, 3) };

      case "follow":
         return {
            ...state,
            relevantList: state.relevantList.filter((x) => x.id !== action.payload),
            partOfList: [...state.relevantList].filter((x) => x.id !== action.payload).splice(0, 3),
         };

      default:
         return state;
   }
};

// generate relevant id
const generateId = (id: number) => {
   return `relevant-item-${id}`;
};

// generate Follow Btn Id
const generateFollowBtnId = (id: number) => {
   return `relevant-follow-btn-${id}`;
};

// generate Following Btn Id
const generateFollowingBtnId = (id: number) => {
   return `relevant-following-btn-${id}`;
};

function Relevant() {
   const [{ partOfList, relevantList }, dispatch] = useReducer(reducer, initialState);
   const [showSpinner, setShowSpinner] = useState(true);

   // CDM
   useEffect(() => {
      dispatch({ type: "setRelevantList", payload: getRelevantList() });
      setTimeout(() => {
         setShowSpinner(false);
      }, 800);
   }, []);

   // loadMore
   // const loadMore = () => {
   //    setShowSpinner(true);
   //    setTimeout(() => {
   //       dispatch({ type: "setPartOfList" });
   //       setShowSpinner(false);
   //    }, 1200);
   // };

   // do follow
   const doFollow = (id: number) => {
      const itemInDOM = document.getElementById(generateId(id));
      const followBtnInDom = document.getElementById(generateFollowBtnId(id));
      const followingBtnInDom = document.getElementById(generateFollowingBtnId(id));
      followBtnInDom?.classList.add("hidden");
      followingBtnInDom?.classList.remove("hidden");
      setTimeout(() => {
         itemInDOM?.classList.add("relevant-item-animation");
         // setShowSpinner(true);
      }, 300);
      setTimeout(() => {
         followBtnInDom?.classList.remove("hidden");
         followingBtnInDom?.classList.add("hidden");
         itemInDOM?.classList.remove("relevant-item-animation");
         dispatch({ type: "follow", payload: id });
         // setShowSpinner(false);
      }, 1000);
   };

   return (
      <div
         data-name="relevant"
         className="bg-white text-slate-900 dark:bg-slate-800 dark:text-white shadow-xl p-3 
                      sm:rounded-md transition-03 border border-slate-200 dark:border-slate-700"
      >
         {/* head */}
         <div data-name="relevant-box-title" className="flex flex-row justify-between items-center">
            <h4 className="text-base font-normal">مرتبط ترین با شما</h4>
            <FontAwesomeIcon
               icon={faInfo}
               className="bg-slate-200 dark:bg-slate-600 rounded-md text-xs py-1 px-2 transition-03"
            />
         </div>
         {/* list */}
         <div data-name="relevant-list" className="relative flex flex-col gap-3 pt-6 pb-3 overflow-hidden">
            {partOfList.map((item: any, index: number) => {
               return (
                  <div
                     data-name="relevant-item"
                     className="flex flex-row flex-nowrap items-center gap-3"
                     key={index}
                     id={generateId(item.id)}
                  >
                     <Link data-name="relevant-item-img" to={`users/${item.id}${item.name}`}>
                        <img
                           src={item.img}
                           alt="relevant-user-img"
                           className="w-14 h-14 text-xs object-cover rounded-full bg-slate-200 dark:bg-slate-600"
                        />
                     </Link>
                     <div data-name="relevant-item-info" className="flex-1">
                        <p className="text-sm text-slate-600 dark:text-slate-200">{item.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 py-0.5">{item.headline}</p>
                        <button
                           data-name="follow-btn"
                           className="relative overflow-y-hidden flex items-center justify-center gap-1 text-slate-600 dark:text-slate-400 
                               border border-slate-400 mt-1 px-2 w-26 rounded-full transition-03 hover:shadow-xl dark:hover:shadow-2xl 
                             hover:text-sky-500 hover:border-sky-500 dark:hover:text-sky-500 dark:hover:border-sky-500"
                           onClick={() => {
                              doFollow(item.id);
                           }}
                        >
                           <div className="hidden p-0 m-0" id={generateFollowingBtnId(item.id)}>
                              <FontAwesomeIcon
                                 icon={faCheck}
                                 className="absolute pl-1 text-sm follow-btn__faCheck transition-03"
                              />
                              <span className="text-xs pr-5">دنبال شد</span>
                           </div>
                           <div className="p-0 m-0" id={generateFollowBtnId(item.id)}>
                              <FontAwesomeIcon
                                 icon={faPlus}
                                 className="absolute text-sm follow-btn__faPlus transition-03"
                              />
                              <div className="absolute follow-btn__spinner -mb-1 transition-03">
                                 <Spinner size={spinnerSize} spin />
                              </div>
                              <span className="text-xs pr-5">دنبال کردن</span>
                           </div>
                        </button>
                     </div>
                  </div>
               );
            })}
            <div
               data-name="relevant-item-spinner"
               className={`w-full flex justify-center p-2 ${!showSpinner && "hidden"}`}
            >
               <Spinner spin={showSpinner} />
            </div>
         </div>

         {/* <button
            data-name="relevant-load-more"
            className={`pt-3 text-slate-400 font-normal hover:text-sky-500 ${!showLoadMoreBtn && "hidden"}`}
            onClick={() => loadMore()}
         >
            <span className="text-xs transition-05">مشاهده موارد بیشتر</span>
            <FontAwesomeIcon
               icon={faArrowLeft}
               className="relevant-load-more__faArrowLeft text-xs pr-2 transition-05 -mb-0.5"
            />
         </button> */}
         <button data-name="relevant-load-more" className="text-slate-400 font-normal hover:text-sky-500">
            <span className="text-xs transition-05">مشاهده همه موارد</span>
            <FontAwesomeIcon
               icon={faArrowLeft}
               className="relevant-load-more__faArrowLeft text-xs pr-2 transition-05 -mb-0.5"
            />
         </button>
      </div>
   );
}

export default Relevant;
