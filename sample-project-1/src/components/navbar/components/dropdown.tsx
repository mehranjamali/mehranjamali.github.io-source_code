import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

type props = {
   showDropdown: boolean;
   dropdownObjs: dropdownType[];
};

export type dropdownType = {
   title: string;
   list: { link: string; name: string }[];
};

function Dropdown({ showDropdown, dropdownObjs }: props) {
   return (
      <ul
         className={`profile-dropdown before:border-l before:border-t before:bg-white dark:before:bg-slate-800 
        before:border-t-slate-300 dark:before:border-t-slate-600 before:border-l-slate-300 dark:before:border-l-slate-600
        absolute top-16 left-0 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-2xl z-50 h-fit
        px-4 py-2 text-sm ${!showDropdown ? "hidden" : ""}`}
      >
         {dropdownObjs.map((dropdownObj: dropdownType, index: number) => {
            return (
               <li
                  key={index}
                  className="flex flex-col items-start py-2 pb-3 border-b border-gray-400"
               >
                  <h3 className="mb-2 text-lg font-bold dark:text-gray-100">{dropdownObj.title}</h3>
                  {dropdownObj.list.map((item: any, index: number) => {
                     return (
                        <Link
                           key={index}
                           className="py-1 pr-2 border-r-2 border-gray-400 text-xs w-full 
                     dark:hover:bg-slate-600 hover:bg-gray-200
                     dark:active:bg-slate-600 active:bg-gray-200
                     hover:text-sky-400 hover:border-sky-400 transition-03 mt-1"
                           to={item.link}
                        >
                           {item.name}
                        </Link>
                     );
                  })}
               </li>
            );
         })}

         <li className="flex flex-row items-start justify-between gap-4 pt-3 pb-1">
            <div className="w-full">
               <button
                  className="flex items-center justify-center text-xs font-semibold 
                          text-red-500 py-2 border border-red-500 rounded-md w-full
                          hover:text-white hover:bg-red-500 
                          active:text-white active:bg-red-500 
                          shadow-xl transition-03"
               >
                  <FontAwesomeIcon icon={faArrowRightFromBracket} className="pl-2" />
                  <span>خروج</span>
               </button>
            </div>
            <div className="w-full">
               <button
                  className="text-xs font-semibold text-sky-400 py-2 border
                     border-sky-500 rounded-md w-full 
                          hover:text-white hover:bg-sky-500 
                          active:text-white active:bg-sky-500 
                          shadow-xl transition-03"
               >
                  ایجاد حساب
               </button>
            </div>
         </li>
      </ul>
   );
}

export default Dropdown;
