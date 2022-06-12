import React, { useMemo, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSun, faMoon, faBell } from "@fortawesome/free-regular-svg-icons";
import { faSearch, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
   // body
   const body = useMemo(() => {
      console.log("useMemo called!");
      return document.body;
   }, []);

   // mobile menu
   const mobileMenuBg: any = useRef(null);
   const mobileMenu: any = useRef(null);
   const mobileMenuBtn: any = useRef(null);

   // profile dropdown
   const profileDd: any = useRef(null);

   // close menus
   const closeMenus = (type: string) => {
      switch (type) {
         case "mobile":
            mobileMenuBg.current.classList.add("hidden");
            mobileMenuBtn.current.classList.remove("open");
            mobileMenu.current.classList.add("translate-x-full");
            break;
         case "profile":
            profileDd.current.classList.add("hidden");
            break;
         default:
            break;
      }
      // scroll body
      body.classList.remove("stop-scroll");
   };

   // toggle mobile menu
   const toggleMobileMenu = () => {
      // bg
      mobileMenuBg.current.classList.toggle("hidden");
      // btn
      mobileMenuBtn.current.classList.toggle("open");
      // menu
      mobileMenu.current.classList.toggle("translate-x-full");
      // scroll body
      body.classList.toggle("stop-scroll");
   };

   // toggle profile dropdown
   const toggleProfileDropDown = () => {
      profileDd.current.classList.toggle("hidden");
   };

   return (
      <nav
         className="fixed top-0 right-0 left-0 z-50 bg-white text-slate-900 dark:bg-slate-800 dark:text-white border-b 
      border-slate-300 dark:border-b dark:border-slate-600"
      >
         {/* nav container */}
         <div className=" flex flex-row justify-between items-center w-full px-4 lg:px-0 lg:max-w-5xl xl:max-w-6xl mx-auto navbar-h">
            {/* hamburger , brand , mobile menu - nav links */}
            <div className="flex flex-row justify-end items-center gap-12">
               {/* hamburger , brand , mobile menu */}
               <div className="flex flex-row justify-end items-center gap-6">
                  {/* mobile menu */}
                  <div className="absolute w-0 top-14 right-0 md:hidden">
                     <div
                        ref={mobileMenuBg}
                        className="hidden absolute top-0 bottom-0 z-10 right-0 left-0 h-screen w-screen bg-slate-400/50 md:hidden"
                     ></div>
                     <ul
                        ref={mobileMenu}
                        className=" absolute h-screen
                        flex flex-col justify-start items-start mr-0 z-50 shadow-2xl w-52 font-semibold text-sm bg-white dark:bg-slate-800 
                        border-t-2 dark:border-slate-600
                        translate-x-full transition-05"
                     >
                        <li className="relative w-full py-3 hover:bg-gray-100 dark:hover:bg-slate-700">
                           <NavLink
                              to="/"
                              className={({ isActive }) =>
                                 `py-3 pr-4 pl-28 hover:text-gray-800 dark:hover:text-gray-50 ${
                                    isActive
                                       ? "border-r-2 border-slate-800 dark:border-slate-50 font-bold hover:text-gray-600"
                                       : ""
                                 }`
                              }
                           >
                              صفحه اصلی
                           </NavLink>
                        </li>

                        <li className="relative w-full py-3 hover:bg-gray-100 dark:hover:bg-slate-700">
                           <NavLink
                              to="/users"
                              className={({ isActive }) =>
                                 `py-3 pr-4 pl-28 hover:text-gray-800 dark:hover:text-gray-50 ${
                                    isActive
                                       ? "border-r-2 border-slate-800 dark:border-slate-50 font-bold hover:text-gray-600"
                                       : ""
                                 }`
                              }
                           >
                              نویسنده ها
                           </NavLink>
                        </li>
                        <li className="relative w-full py-3 hover:bg-gray-100 dark:hover:bg-slate-700">
                           <NavLink
                              to="/articles"
                              className={({ isActive }) =>
                                 `py-3 pr-4 pl-28 hover:text-gray-800 dark:hover:text-gray-50 ${
                                    isActive
                                       ? "border-r-2 border-slate-800 dark:border-slate-50 font-bold hover:text-gray-600"
                                       : ""
                                 }`
                              }
                           >
                              مقالات
                           </NavLink>
                        </li>
                        <li className="relative w-full py-3 hover:bg-gray-100 dark:hover:bg-slate-700">
                           <NavLink
                              to="/onlineLearning"
                              className={({ isActive }) =>
                                 `py-3 pr-4 pl-28 hover:text-gray-800 dark:hover:text-gray-50 ${
                                    isActive
                                       ? "border-r-2 border-slate-800 dark:border-slate-50 font-bold hover:text-gray-600"
                                       : ""
                                 }`
                              }
                           >
                              آموزش مجازی
                           </NavLink>
                        </li>
                        <li className="relative w-full py-3 hover:bg-gray-100 dark:hover:bg-slate-700">
                           <NavLink
                              to="/aboutUs"
                              className={({ isActive }) =>
                                 `py-3 pr-4 pl-36 hover:text-gray-800 dark:hover:text-gray-50 ${
                                    isActive
                                       ? "border-r-2 border-slate-800 dark:border-slate-50 font-bold hover:text-gray-600"
                                       : ""
                                 }`
                              }
                           >
                              درباره ما
                           </NavLink>
                        </li>
                     </ul>
                  </div>
                  {/* hamburger */}
                  <div
                     ref={mobileMenuBtn}
                     className="block hamburger md:hidden"
                     onClick={toggleMobileMenu}
                  >
                     <span className="hamburger-top bg-slate-800 dark:bg-white"></span>
                     <span className="hamburger-middle bg-slate-800 dark:bg-white"></span>
                     <span className="hamburger-bottom bg-slate-800 dark:bg-white"></span>
                  </div>
                  {/* brand */}
                  <NavLink to="/" className="font-bold text-xl">
                     {/* set style later */}
                     Brand
                  </NavLink>
               </div>
               {/* nav links */}
               <div className="hidden md:block">
                  <ul className="flex flex-row justify-end gap-5 text-sm text-slate-600 dark:text-slate-300 nav-links">
                     <li className="py-4">
                        <NavLink
                           to="/"
                           className={({ isActive }) =>
                              `py-4 px-1 hover:text-gray-800 dark:hover:text-slate-50 ${
                                 isActive
                                    ? "border-b border-slate-800 dark:border-slate-100 font-bold hover:text-gray-600 dark:text-gray-50"
                                    : ""
                              }`
                           }
                        >
                           صفحه اصلی
                        </NavLink>
                     </li>
                     <li className="py-4">
                        <NavLink
                           to="/users"
                           className={({ isActive }) =>
                              `py-4 px-1 hover:text-gray-800 dark:hover:text-slate-50 ${
                                 isActive
                                    ? "border-b border-slate-800 dark:border-slate-100 font-bold hover:text-gray-600 dark:text-gray-50"
                                    : ""
                              }`
                           }
                        >
                           نویسنده ها
                        </NavLink>
                     </li>
                     <li className="py-4">
                        <NavLink
                           to="/articles"
                           className={({ isActive }) =>
                              `py-4 px-1 hover:text-gray-800 dark:hover:text-slate-50 ${
                                 isActive
                                    ? "border-b border-slate-800 dark:border-slate-100 font-bold hover:text-gray-600 dark:text-gray-50"
                                    : ""
                              }`
                           }
                        >
                           مقالات
                        </NavLink>
                     </li>
                     <li className="py-4">
                        <NavLink
                           to="/onlineLearning"
                           className={({ isActive }) =>
                              `py-4 px-1 hover:text-gray-800 dark:hover:text-slate-50 ${
                                 isActive
                                    ? "border-b border-slate-800 dark:border-slate-100 font-bold hover:text-gray-600 dark:text-gray-50"
                                    : ""
                              }`
                           }
                        >
                           آموزش مجازی
                        </NavLink>
                     </li>
                     <li className="py-4">
                        <NavLink
                           to="/aboutUs"
                           className={({ isActive }) =>
                              `py-4 px-1 hover:text-gray-800 dark:hover:text-slate-50 ${
                                 isActive
                                    ? "border-b border-slate-800 dark:border-slate-100 font-bold hover:text-gray-600 dark:text-gray-50"
                                    : ""
                              }`
                           }
                        >
                           درباره ما
                        </NavLink>
                     </li>
                  </ul>
               </div>
            </div>
            {/* profile , search , notification , theme*/}
            <div className="relative flex flex-row justify-start items-center gap-6">
               <div className="flex items-center py-4 cursor-pointer text-lg">
                  <FontAwesomeIcon icon={faSun} className="text-yellow-500 py-1" />
                  <FontAwesomeIcon icon={faMoon} className="text-indigo-700 py-1" />
               </div>
               <div className="flex items-center py-4 cursor-pointer text-lg">
                  <FontAwesomeIcon icon={faSearch} className="py-1" />
               </div>
               <div className="flex items-center py-4 cursor-pointer text-lg">
                  <FontAwesomeIcon icon={faBell} className="py-1" />
               </div>
               {/* user icon */}
               <div className="flex items-center relative py-4 cursor-pointer text-lg">
                  <FontAwesomeIcon
                     icon={faUser}
                     className="bg-gray-200 dark:bg-slate-600 text-gray-600 dark:text-gray-200 p-2 rounded-full"
                     onClick={toggleProfileDropDown}
                  />
                  {/* !!!!!!!!!!!!!!!!!!!!!! Create DropDown Component */}
                  <ul
                     ref={profileDd}
                     className="hidden profile-dropdown before:border-l before:border-t before:bg-white dark:before:bg-slate-800 
                     before:border-t-slate-300 dark:before:border-t-slate-600 before:border-l-slate-300 dark:before:border-l-slate-600
                     absolute top-16 left-0 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md shadow-2xl z-50 h-fit
                     px-4 py-2 text-sm"
                  >
                     <li className="flex flex-col items-start py-2">
                        <h3 className="mb-2 text-lg font-bold dark:text-white">اکانت کاربری</h3>
                        <div
                           className="py-1 pr-2 border-r-2 border-gray-400 text-xs w-full 
                                    dark:hover:bg-slate-600 hover:bg-gray-200
                                    dark:active:bg-slate-600 active:bg-gray-200
                                    hover:text-sky-400 hover:border-sky-400 transition-03"
                        >
                           <p>تنظیمات</p>
                        </div>
                        <div
                           className="py-1 pr-2 mt-1 border-r-2 border-gray-400 text-xs w-full 
                                    dark:hover:bg-slate-600 hover:bg-gray-200
                                    dark:active:bg-slate-600 active:bg-gray-200
                                    hover:text-sky-400 hover:border-sky-400 transition-03"
                        >
                           <p>ویرایش اطلاعات کاربری</p>
                        </div>
                     </li>

                     <li className="flex flex-col items-start py-2 mt-2 border-t border-gray-400">
                        <h3 className="mb-2 text-lg font-bold dark:text-white">مدیریت</h3>
                        <div
                           className="py-1 pr-2 border-r-2 border-gray-400 text-xs w-full 
                                    dark:hover:bg-slate-600 hover:bg-gray-200
                                    dark:active:bg-slate-600 active:bg-gray-200
                                    hover:text-sky-400 hover:border-sky-400 transition-03"
                        >
                           <p> لیست های من</p>
                        </div>
                        <div
                           className="py-1 pr-2 mt-1 border-r-2 border-gray-400 text-xs w-full 
                                    dark:hover:bg-slate-600 hover:bg-gray-200
                                    dark:active:bg-slate-600 active:bg-gray-200
                                    hover:text-sky-400 hover:border-sky-400 transition-03"
                        >
                           مورد علاقه های من
                        </div>
                        <div
                           className="py-1 pr-2 mt-1 border-r-2 border-gray-400 text-xs w-full 
                                    dark:hover:bg-slate-600 hover:bg-gray-200
                                    dark:active:bg-slate-600 active:bg-gray-200
                                    hover:text-sky-400 hover:border-sky-400 transition-03"
                        >
                           آموزش های من
                        </div>
                        <div
                           className="py-1 pr-2 mt-1 border-r-2 border-gray-400 text-xs w-full 
                                    dark:hover:bg-slate-600 hover:bg-gray-200
                                    dark:active:bg-slate-600 active:bg-gray-200
                                    hover:text-sky-400 hover:border-sky-400 transition-03"
                        >
                           پست ها و پیش نویس ها
                        </div>
                     </li>

                     <li className="flex flex-row items-start justify-between gap-4 pt-3 pb-1 mt-2 border-t border-gray-400">
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
               </div>
               {/* end of user icon */}
            </div>
            {/* end of profile , search , notification , theme*/}
         </div>
      </nav>
   );
}

export default Navbar;
