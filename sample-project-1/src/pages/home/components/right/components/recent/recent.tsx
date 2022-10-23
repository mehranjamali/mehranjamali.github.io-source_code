// component
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faAngleLeft, faAngleDown } from "@fortawesome/free-solid-svg-icons";

import Spinner from "../../../../../../components/spinner/spinner";

import { getRecentList, getRecentListType } from "./recentService";

function Recent() {
   const [loading, setLoading] = useState(true);
   const [recentList, setRecentList] = useState([] as getRecentListType);

   useEffect(() => {
      setRecentList(getRecentList());
      setTimeout(() => {
         setLoading(false);
      }, 1000);
   }, []);
   return (
      <div
         data-name="recent"
         className="bg-white text-slate-900 dark:bg-slate-800 dark:text-white shadow-xl 
                sm:rounded-md transition-03 border border-slate-200 dark:border-slate-700 recent-max-h
                text-base w-full flex flex-col items-center justify-center gap-3 sticky top-18 py-3"
      >
         <div data-name="recent-box-title" className="w-full flex flex-row justify-between items-center px-3">
            <h4>اخیراً</h4>
            <FontAwesomeIcon
               icon={faHistory}
               className="bg-slate-200 dark:bg-slate-600 rounded-md text-xs py-1 px-1.5 transition-03"
            />
         </div>
         {loading ? (
            <div className="p-3">
               <Spinner spin={loading} />
            </div>
         ) : (
            <>
               <div data-name="recent-list" className="px-2 pb-1 flex flex-col gap-4 w-full overflow-x-hidden">
                  {recentList.length &&
                     recentList.map((item: any, index: number) => {
                        return (
                           <Link
                              key={index}
                              // to="/ss"
                              to="/"
                              data-name="recent-item"
                              className="flex flex-row justify-start items-center gap-2 w-full text-xs hover:text-sky-500 dark:hover:text-sky-500
                                       text-slate-700 dark:text-slate-300 transition-03 "
                           >
                              <img
                                 src={item.img}
                                 alt="recent-img"
                                 className="h-14 w-20 object-cover object-center rounded-md bg-slate-200 dark:bg-slate-600 text-2xs text-slate-400 pointer-events-none"
                              />
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between md:flex-col md:items-start gap-2 w-full">
                                 <p className="text-xs">{item.title}</p>
                                 <p className="text-slate-400 dark:text-slate-500 text-xs">{item.date}</p>
                              </div>
                           </Link>
                        );
                     })}
               </div>
               <div
                  className="flex flex-row items-center justify-center gap-2 w-full px-2 pt-3 border-t text-slate-400 font-normal 
                            hover:text-sky-500 border-slate-200 dark:border-slate-700 text-xs hover:cursor-pointer transition-03"
               >
                  <span className="">مشاهده موارد بیشتر</span>
                  <FontAwesomeIcon icon={faAngleDown} />
               </div>
            </>
         )}
      </div>
   );
}

export default Recent;
