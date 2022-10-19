import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import showToast from "../../../../utiles/toast";

// nav link type
export type navLinkType = {
   title: string;
   to: string;
   icon: any;
};

// props type
type propsMobileNavMenu = {
   showMobileMenu: boolean;
   closeMenus: any;
   navLinks: navLinkType[];
};

// generate NavLink class
const generateNavLinkClass = (isActive: boolean) => {
   return `py-2.5 px-2 w-full dark:hover:bg-slate-600 hover:bg-gray-200 dark:active:bg-slate-600 active:bg-gray-200 
           border-r-2 hover:text-sky-400 hover:border-sky-400 dark:hover:border-sky-400 transition-03  ${
              isActive
                 ? "border-sky-400 dark:text-white text-slate-800 bg-gray-200 dark:bg-slate-700"
                 : "border-white dark:border-slate-800"
           }`;
};

function MobileNavMenu({ showMobileMenu, closeMenus, navLinks }: propsMobileNavMenu) {
   // Copy Post Link
   const handleCopyPostLink = (link: string, event: any) => {
      navigator.clipboard.writeText(link);
      showToast(
         <div>
            <p>ایمیل کپی شد.</p>
            <p>{link}</p>
         </div>,
         "success",
         1000
      );
   };

   return (
      <div
         data-name="mobile-menu"
         className={`absolute h-screen flex flex-col justify-between items-start mr-0 z-50 shadow-2xl w-56 text-sm 
                         bg-white dark:bg-slate-800 dark:text-slate-300 text-slate-500 border-t border-l 
                         dark:border-slate-700 translate-x-full transition-03 px-2 pb-16 pt-2.5 ${
                            showMobileMenu ? "transform-none" : "translate-x-full"
                         }`}
      >
         {/* side list */}
         <div data-name="nav-link" className="w-full p-0 m-0 z-50 flex flex-col gap-2">
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
                     <div className="w-full flex justify-start items-center">
                        <FontAwesomeIcon icon={item.icon} className=" pl-3 w-6 text-lg " />
                        <span>{item.title}</span>
                     </div>
                  </NavLink>
               );
            })}
         </div>
         {/* ---end of side list */}
         {/* Design By Me */}
         <div data-name="about-me" className="flex flex-col px-2 gap-2 w-full">
            <div className="flex flex-col justify-between items-center px-3">
               <a
                  className="hover:text-sky-500 active:text-sky-500 underline"
                  href="https://www.linkedin.com/in/mehran-jamali-b2a43b239/"
               >
                  Linkedin
               </a>
               <span className="h-3">||||||||||</span>
               <span className="h-3">||||||||||</span>
               <span className="h-3">||||||||||</span>
               <a
                  className="pt-2 hover:text-sky-500 active:text-sky-500 underline"
                  href="https://github.com/mehranjamali"
               >
                  Github
               </a>
            </div>
            <div className="flex flex-row justify-center items-center text-xs">
               <p className="py-2">mehranjamali117@gmail.com</p>
               <button className=" py-2 pr-2 hover:text-sky-500 transition-03" onClick={(e: any) => handleCopyPostLink("mehranjamali117@gmail.com", e)}>
                  <FontAwesomeIcon icon={faCopy} className="" />
               </button>
            </div>
            <div className="text-center w-full">
               <span className="text-xs text-slate-400"> Developed By </span>
               <span className="text-sm"> Mehran Jamali </span>
            </div>
         </div>
         {/* ---end of me -_- */}
      </div>
   );
}

export default React.memo(MobileNavMenu);
