import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

// redux
// -- hooks
import { useDispatchHook } from "../../../../store/hooks/useHooks";
// -- user
import { userAuthLogoutCommand } from "../../../../store/slices/user";

// components
import Spinner from "../../../../components/spinner/spinner";

type propsDropdown = {
   showDropdown: boolean;
   dropdownObjs: dropdownType[];
   closeMenus: any;
};

export type dropdownType = {
   title: string;
   list: { link: string; name: string }[];
};

// spinner size
const spinnerSize = {
   layer1: { width: "w-6", height: "h-6" },
   layer2: { width: "w-4", height: "h-4" },
   layer3: { width: "w-2", height: "h-2" },
};

function Dropdown({ showDropdown, dropdownObjs, closeMenus }: propsDropdown) {
   const navigate = useNavigate();
   const dispatch = useDispatchHook();

   const [showSpinner, setShowSpinner] = useState<boolean>(false);

   // handle logout
   const handleLogout = () => {
      setShowSpinner(true);
      setTimeout(() => {
         setShowSpinner(false);
         dispatch(userAuthLogoutCommand());
         closeMenus();
      }, 500);
   };

   // close dropdown
   // useEffect(() => {
   //    if (showDropdown) window.addEventListener("click", () => closeMenus(), { once: true });
   // }, []);

   // handle create account navigator
   const handleCreateAccountNavigator = () => {
      closeMenus();
      // navigate("/register");
      navigate("/login");
   };

   return (
      <ul
         data-name="dropdown"
         className={`profile-dropdown before:border-l before:border-t before:bg-white dark:before:bg-slate-800 
        before:border-t-slate-300 dark:before:border-t-slate-600 before:border-l-slate-300 dark:before:border-l-slate-600
        absolute top-16 left-0 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-2xl z-50 h-fit
        px-4 py-2 text-sm ${!showDropdown ? "hidden" : ""}`}
      >
         {dropdownObjs.map((dropdownObj: dropdownType, index: number) => {
            return (
               <li
                  data-name="dropdown-item"
                  key={index}
                  className="flex flex-col items-start py-2 pb-3 border-b border-gray-400"
               >
                  <h3 className="mb-2 text-lg font-bold dark:text-gray-100">{dropdownObj.title}</h3>
                  {dropdownObj.list.map((item: any, index: number) => {
                     return (
                        <div
                           key={index}
                           className="py-1 pr-2 border-r-2 border-gray-400 text-xs w-full cursor-pointer
                                    dark:hover:bg-slate-600 hover:bg-gray-200
                                    dark:active:bg-slate-600 active:bg-gray-200
                                    hover:text-sky-400 hover:border-sky-400 transition-03 mt-1"
                           // to={item.link}
                           onClick={() => {
                              closeMenus();
                           }}
                        >
                           {item.name}
                        </div>
                     );
                  })}
               </li>
            );
         })}

         <li data-name="dropdown-btn-box" className="flex flex-row items-start justify-between gap-4 pt-3 pb-1">
            <div data-name="sign-out" className="w-full">
               <button
                  className="flex items-center justify-center text-xs  h-9 
                          text-red-500 py-2 border border-red-500 rounded-md w-full
                          hover:bg-red-100 dark:hover:bg-slate-700 shadow-xl transition-03"
                  onClick={() => handleLogout()}
               >
                  <div className={`${showSpinner && "hidden"} flex items-center justify-center`}>
                     <FontAwesomeIcon icon={faArrowRightFromBracket} className="pl-2" />
                     <span>خروج</span>
                  </div>
                  <Spinner size={spinnerSize} spin={showSpinner} color={"border-red-500"} />
               </button>
            </div>
            <div data-name="sign-up" className="w-full">
               <button
                  className="text-xs text-sky-400 py-2 border border-sky-500 rounded-md w-full 
                  h-9 hover:bg-sky-100 dark:hover:bg-slate-700 shadow-xl transition-03"
                  onClick={() => handleCreateAccountNavigator()}
               >
                  ایجاد حساب
               </button>
            </div>
         </li>
      </ul>
   );
}

export default React.memo(Dropdown);
