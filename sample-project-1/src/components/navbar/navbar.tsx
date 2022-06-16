import { useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSun, faMoon, faBell, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// components
import Search from "./components/search";
import Notification from "./components/notification";
import Dropdown, { dropdownType } from "./components/dropdown";

const dropdownObjs: dropdownType[] = [
   {
      title: "اکانت کاربری",
      list: [
         { link: "/users", name: "تنظیمات" },
         { link: "/users", name: "ویرایش اطلاعات کاربری" },
      ],
   },
   {
      title: "مدیریت",
      list: [
         { link: "/users", name: "لیست های من" },
         { link: "/users", name: "مورد علاقه های من" },
         { link: "/users", name: "آموزش های من" },
         { link: "/users", name: "پست ها و پیش نویس ها" },
      ],
   },
];

function Navbar() {
   const [showSearchModal, setShowSearchModal] = useState(false);
   const [showNotificationPanel, setNotificationPanel] = useState(false);
   const [showDropdown, setShowDropdown] = useState(false);
   // body
   const body = useMemo(() => {
      return document.body;
   }, []);

   // mobile menu
   const mobileMenuBg: any = useRef(null);
   const mobileMenu: any = useRef(null);
   const mobileMenuBtn: any = useRef(null);

   // close menus
   const closeMenus = (type: string) => {
      switch (type) {
         case "mobile":
            mobileMenuBg.current.classList.add("hidden");
            mobileMenuBtn.current.classList.remove("open");
            mobileMenu.current.classList.add("translate-x-full");
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
   const toggleProfileDropdown = () => {
      setShowDropdown(!showDropdown);
   };

   // toggle notification slide
   const toggleNotificationSlide = () => {
      setNotificationPanel(!showNotificationPanel);
      body.classList.toggle("stop-scroll-from-notification");
   };

   // toggle search slide
   const toggleSearchModal = () => {
      setShowSearchModal(!showSearchModal);
      body.classList.toggle("stop-scroll-from-search");
   };

   return (
      <nav
         className="fixed top-0 right-0 left-0 bg-white text-slate-900 dark:bg-slate-800 dark:text-white border-b 
      border-slate-300 dark:border-b dark:border-slate-600 z-50"
      >
         {/* nav container */}
         <div className="flex flex-row justify-between items-center w-full px-4 lg:px-0 lg:max-w-5xl xl:max-w-6xl mx-auto navbar-h">
            {/* right_side: hamburger , brand , mobile menu - nav links */}
            <div className="flex flex-row justify-end items-center gap-12">
               {/* hamburger , brand , mobile menu */}
               <div className="flex flex-row justify-end items-center gap-6">
                  {/* mobile menu */}
                  <div className="absolute w-0 top-14 right-0 md:hidden z-50">
                     <div
                        ref={mobileMenuBg}
                        className="hidden absolute top-0 bottom-0 z-50 right-0 left-0 h-screen w-screen bg-slate-400/50 md:hidden"
                     ></div>
                     {/* ---end of side list */}
                     {/* right side panel */}
                     <div
                        ref={mobileMenu}
                        className=" absolute h-screen
                        flex flex-col justify-between items-start mr-0  z-50 shadow-2xl w-52 text-sm 
                        bg-white dark:bg-slate-800 
                        dark:text-slate-300 
                        border-t border-l dark:border-slate-600
                        translate-x-full transition-05 pr-0 pb-16"
                     >
                        {/* side list */}
                        <ul className="w-full p-0 m-0 z-50">
                           <li
                              className="w-full py-3 dark:hover:bg-slate-600 hover:bg-gray-200
                                    dark:active:bg-slate-600 active:bg-gray-200
                                    hover:text-sky-400 hover:border-sky-400 transition-03"
                           >
                              <NavLink
                                 to="/"
                                 className={({ isActive }) =>
                                    `py-3 pr-4 pl-28 ${
                                       isActive
                                          ? "border-r-2 border-sky-400 font-bold dark:text-white"
                                          : ""
                                    }`
                                 }
                              >
                                 صفحه اصلی
                              </NavLink>
                           </li>
                           <li
                              className="w-full py-3 dark:hover:bg-slate-600 hover:bg-gray-200
                                       dark:active:bg-slate-600 active:bg-gray-200
                                    hover:text-sky-400 hover:border-sky-400 transition-03"
                           >
                              <NavLink
                                 to="/users"
                                 className={({ isActive }) =>
                                    `py-3 pr-4 pl-28 ${
                                       isActive
                                          ? "border-r-2 border-sky-400 font-bold dark:text-white"
                                          : ""
                                    }`
                                 }
                              >
                                 نویسنده ها
                              </NavLink>
                           </li>
                           <li
                              className="w-full py-3 dark:hover:bg-slate-600 hover:bg-gray-200
                                       dark:active:bg-slate-600 active:bg-gray-200
                                    hover:text-sky-400 hover:border-sky-400 transition-03"
                           >
                              <NavLink
                                 to="/articles"
                                 className={({ isActive }) =>
                                    `py-3 pr-4 pl-36 ${
                                       isActive
                                          ? "border-r-2 border-sky-400 font-bold dark:text-white"
                                          : ""
                                    }`
                                 }
                              >
                                 مقالات
                              </NavLink>
                           </li>
                           <li
                              className="w-full py-3 dark:hover:bg-slate-600 hover:bg-gray-200
                                       dark:active:bg-slate-600 active:bg-gray-200
                                    hover:text-sky-400 hover:border-sky-400 transition-03"
                           >
                              <NavLink
                                 to="/onlineLearning"
                                 className={({ isActive }) =>
                                    `py-3 pr-4 pl-28 ${
                                       isActive
                                          ? "border-r-2 border-sky-400 font-bold dark:text-white"
                                          : ""
                                    }`
                                 }
                              >
                                 آموزش مجازی
                              </NavLink>
                           </li>
                           <li
                              className="w-full py-3 dark:hover:bg-slate-600 hover:bg-gray-200
                                       dark:active:bg-slate-600 active:bg-gray-200
                                    hover:text-sky-400 hover:border-sky-400 transition-03"
                           >
                              <NavLink
                                 to="/aboutUs"
                                 className={({ isActive }) =>
                                    `py-3 pr-4 pl-36 ${
                                       isActive
                                          ? "border-r-2 border-sky-400 font-bold dark:text-white"
                                          : ""
                                    }`
                                 }
                              >
                                 درباره ما
                              </NavLink>
                           </li>
                        </ul>
                        {/* ---end of side list */}
                        {/* me */}
                        <div className="flex flex-col px-2 gap-5">
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
                           <h2>
                              <span className="text-xs">طراحی شده توسط </span>
                              <FontAwesomeIcon icon={faHeart} className="text-base text-red-500" />
                              <span className="text-base font-bold dark:text-gray-100">
                                 {" "}
                                 مهران جمالی
                              </span>
                           </h2>
                        </div>
                        {/* ---end of me -_- */}
                     </div>
                     {/* --end of right side panel */}
                  </div>
                  {/* ---end of mobile menu */}
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
                  {/* ---end of hamburger */}
                  {/* brand */}
                  <NavLink to="/" className="font-bold text-xl">
                     {/* set style later */}
                     Brand
                  </NavLink>
                  {/* ---end of brand */}
               </div>
               {/* ---end of hamburger , brand , mobile menu */}
               {/* nav links */}
               <div className="hidden md:block">
                  <ul className="flex flex-row justify-end gap-5 text-sm text-slate-600 dark:text-slate-300 nav-links">
                     <li className="py-4">
                        <NavLink
                           to="/"
                           className={({ isActive }) =>
                              `py-4 px-1 hover:text-sky-400 hover:border-sky-400 transition-03 ${
                                 isActive
                                    ? "border-b border-slate-800 dark:border-slate-100 font-bold dark:text-gray-50"
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
                              `py-4 px-1 hover:text-sky-400 hover:border-sky-400 transition-03 ${
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
                              `py-4 px-1 hover:text-sky-400 hover:border-sky-400 transition-03 ${
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
                              `py-4 px-1 hover:text-sky-400 hover:border-sky-400 transition-03 ${
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
                              `py-4 px-1 hover:text-sky-400 hover:border-sky-400 transition-03 ${
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
               {/* ---end of nav links */}
            </div>
            {/* ---end of right_side: hamburger , brand , mobile menu - nav links */}
            {/* left_side: profile , search , notification , theme*/}
            <div className="flex flex-row justify-start items-center gap-6">
               {/* theme */}
               <div className="flex items-center py-4 cursor-pointer text-lg">
                  <FontAwesomeIcon icon={faSun} className="text-yellow-500 py-1" />
                  <FontAwesomeIcon icon={faMoon} className="text-indigo-700 py-1" />
               </div>
               {/* ---end of theme */}
               {/* search  */}
               <div className="flex items-center py-4 cursor-pointer text-lg">
                  <FontAwesomeIcon
                     icon={faSearch}
                     className="py-1 hover:text-sky-400 transition-03"
                     onClick={toggleSearchModal}
                  />
                  <div className="absolute inset-0 from-top h-screen bg-red ">
                     {/* bg */}
                     <div
                        className={`absolute inset-0 bg-slate-400/50 w-full h-screen ${
                           !showSearchModal ? "hidden" : ""
                        }`}
                     ></div>
                     {/* ---end of bg */}
                     {/* Search Component */}
                     <Search showModal={showSearchModal} />
                  </div>
               </div>
               {/* ---end of search  */}
               {/* notification */}
               <div className="flex items-center py-4 text-lg">
                  <FontAwesomeIcon
                     icon={faBell}
                     className="cursor-pointer py-1 hover:text-sky-400 transition-03"
                     onClick={toggleNotificationSlide}
                  />
                  <Notification showPanel={showNotificationPanel} />
               </div>
               {/* ---end of notification */}
               {/* user dropdown */}
               <div className="flex items-center relative py-4 text-lg">
                  <FontAwesomeIcon
                     icon={faUser}
                     className="cursor-pointer bg-gray-200 dark:bg-slate-600 text-gray-600 dark:text-gray-200 p-2 rounded-full 
                     hover:text-sky-400 dark:hover:text-sky-500 transition-03"
                     onClick={toggleProfileDropdown}
                  />
                  <Dropdown showDropdown={showDropdown} dropdownObjs={dropdownObjs} />
               </div>
               {/* ---end of user dropdown */}
            </div>
            {/* ---end of left_side: profile , search , notification , theme*/}
         </div>
         {/* ---end of nav container */}
      </nav>
   );
}

export default Navbar;
