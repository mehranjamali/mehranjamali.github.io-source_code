import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

// nav link type
export type navLinkType = {
   title: string;
   to: string;
};

// props type
type propsMobileNavMenu = {
   showMobileMenu: boolean;
   closeMenus: any;
   navLinks: navLinkType[];
};

// generate NavLink class
const generateNavLinkClass = (isActive: boolean) => {
   return `py-3 pr-4 w-full dark:hover:bg-slate-600 hover:bg-gray-200
           dark:active:bg-slate-600 active:bg-gray-200 border-r-2
           hover:text-sky-400 hover:border-sky-400 transition-05 ${
              isActive ? "border-sky-400 dark:text-white text-slate-800" : "border-white dark:border-slate-800"
           }`;
};

function MobileNavMenu({ showMobileMenu, closeMenus, navLinks }: propsMobileNavMenu) {
   useEffect(() => {
      // console.log("MobileNavMenu Component re-rendered");
   });

   return (
      <div
         data-name="mobile-menu"
         className={`absolute h-screen flex flex-col justify-between items-start mr-0  z-50 shadow-2xl w-56 text-sm 
                        bg-white dark:bg-slate-800 dark:text-slate-300 text-slate-500 border-t border-l dark:border-slate-700
                        translate-x-full transition-05 pr-0 pb-16 ${
                           showMobileMenu ? "transform-none" : "translate-x-full"
                        }`}
      >
         {/* side list */}
         <div data-name="nav-link" className="w-full p-0 m-0 z-50 flex flex-col gap-3">
            {navLinks.map((item: navLinkType, index: number) => {
               return (
                  <NavLink
                     key={index}
                     to={item.to}
                     className={({ isActive }) => generateNavLinkClass(isActive)}
                     onClick={() => {
                        closeMenus();
                     }}
                  >
                     {item.title}
                  </NavLink>
               );
            })}
         </div>
         {/* ---end of side list */}
         {/* Design By Me */}
         <div data-name="about-me" className="flex flex-col px-2 gap-5 w-full">
            <div className="flex flex-col justify-between items-center px-3">
               <a
                  className="hover:text-sky-500 active:text-sky-500 underline"
                  href="https://www.linkedin.com/in/mehran-jamali-b2a43b239/"
               >
                  Linkedin
               </a>
               <span className="h-3">||||||</span>
               <span className="h-3">||||||</span>
               <span className="h-3">||||||</span>
               <span className="h-3">||||||</span>
               <a
                  className="pt-2 hover:text-sky-500 active:text-sky-500 underline"
                  href="https://github.com/mehranjamali/React-Redux-Sample1"
               >
                  Github{" "}
               </a>
            </div>
            <h2 className="text-center w-full">
               {/* <FontAwesomeIcon icon={faHeart} className="text-base text-red-500" /> */}
               <span className="text-xs text-slate-400"> Developed By </span>
               <span className="text-sm"> Mehran Jamali </span>
               {/* <FontAwesomeIcon icon={faHeart} className="text-base text-red-500" /> */}
            </h2>
         </div>
         {/* ---end of me -_- */}
      </div>
   );
}

export default React.memo(MobileNavMenu);
