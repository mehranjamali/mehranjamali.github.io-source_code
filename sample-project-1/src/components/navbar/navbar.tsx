import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faSearch, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

// components
import Search from "./components/search";
import Notification from "./components/notification";
import Dropdown, { dropdownType } from "./components/dropdown";

// dropdown items
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

// html, body
const body = document.body;
const html = document.getElementById("html");

function Navbar() {
   const [showSearchModal, setShowSearchModal] = useState(false);
   const [showNotificationPanel, setNotificationPanel] = useState(false);
   const [showDropdown, setShowDropdown] = useState(false);
   const [lightTheme, setLightTheme] = useState(localStorage.getItem("theme") === "light");

   // mobile menu
   const mobileMenuBg: any = useRef(null);
   const mobileMenu: any = useRef(null);
   const mobileMenuBtn: any = useRef(null);

   // CDM
   useEffect(() => {
      const theme: string | null = localStorage.getItem("theme");
      if (theme) {
         html?.classList.add(theme);
      } else {
         html?.classList.add("light");
         setLightTheme(true);
      }
   }, []);

   // toggleTheme
   const toggleTheme = (status: boolean) => {
      if (status) {
         localStorage.setItem("theme", "light");
         setLightTheme(true);
         html?.classList.remove("dark");
      } else {
         localStorage.setItem("theme", "dark");
         setLightTheme(false);
         html?.classList.add("dark");
      }
   };

   // close menus
   const closeMenus = (type: string) => {
      switch (type) {
         case "mobileMenu":
            setNotificationPanel(false);
            setShowSearchModal(false);
            setShowDropdown(false);
            body.classList.remove("stop-scroll-body");
            break;
         case "dropdown":
            setNotificationPanel(false);
            setShowSearchModal(false);
            closeMobileMenu();
            body.className = "";
            break;
         case "notificationPanel":
            setShowDropdown(false);
            setShowSearchModal(false);
            closeMobileMenu();
            body.classList.remove("stop-scroll");
            break;
         case "searchModal":
            setShowDropdown(false);
            setNotificationPanel(false);
            closeMobileMenu();
            body.classList.remove("stop-scroll");
            break;
         case "all":
            setNotificationPanel(false);
            setShowSearchModal(false);
            setShowDropdown(false);
            closeMobileMenu();
            body.className = "";
            break;
         default:
            break;
      }
   };

   // close mobile nav menu
   const closeMobileMenu = () => {
      mobileMenuBg.current.classList.add("hidden");
      mobileMenuBtn.current.classList.remove("open");
      mobileMenu.current.classList.add("translate-x-full");
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
      closeMenus("mobileMenu");
   };

   // toggle profile dropdown
   const toggleProfileDropdown = () => {
      setShowDropdown(!showDropdown);
      closeMenus("dropdown");
   };

   // toggle notification slide
   const toggleNotificationSlide = () => {
      setNotificationPanel(!showNotificationPanel);
      closeMenus("notificationPanel");
      if (!showNotificationPanel) body.classList.add("stop-scroll-body");
      else body.classList.remove("stop-scroll-body");
   };

   // toggle search slide
   const toggleSearchModal = () => {
      setShowSearchModal(!showSearchModal);
      closeMenus("searchModal");
      if (!showSearchModal) body.classList.add("stop-scroll-body");
      else body.classList.remove("stop-scroll-body");
   };

   return (
      <nav
         className="fixed top-0 right-0 left-0 bg-white text-slate-900 dark:bg-slate-800 dark:text-white border-b 
      border-slate-300 dark:border-b dark:border-slate-600 z-50 transition-03"
      >
         {/* nav container */}
         <div className="flex flex-row justify-between items-center w-full px-4 lg:px-0 lg:max-w-5xl xl:max-w-6xl mx-auto navbar-h">
            {/* right_side: hamburger , brand , mobile menu - nav links */}
            {/* ....................................................................................... */}
            <div className="flex flex-row justify-end items-center gap-12">
               {/* hamburger , brand , mobile menu */}
               <div className="flex flex-row justify-end items-center gap-6">
                  {/* mobile menu */}
                  <div className="absolute w-0 top-14 right-0 md:hidden z-50">
                     <div
                        ref={mobileMenuBg}
                        className="hidden absolute top-0 bottom-0 z-50 right-0 left-0 h-screen w-screen bg-slate-400/50 md:hidden"
                        onClick={() => {
                           closeMenus("all");
                        }}
                     ></div>
                     {/* right side panel */}
                     <div
                        ref={mobileMenu}
                        className=" absolute h-screen
                        flex flex-col justify-between items-start mr-0  z-50 shadow-2xl w-56 text-sm 
                        bg-white dark:bg-slate-800 
                        dark:text-slate-300 text-slate-500
                        border-t border-l dark:border-slate-600
                        translate-x-full transition-05 pr-0 pb-16"
                     >
                        {/* side list */}
                        <div className="w-full p-0 m-0 z-50 flex flex-col gap-3">
                           <NavLink
                              to="/"
                              className={({ isActive }) =>
                                 `py-3 pr-4 w-full dark:hover:bg-slate-600 hover:bg-gray-200
                                    dark:active:bg-slate-600 active:bg-gray-200
                                    hover:text-sky-400 hover:border-sky-400 transition-05 ${
                                       isActive
                                          ? "border-r-2 border-sky-400 dark:text-white text-slate-800"
                                          : "border-r-2 border-white dark:border-slate-800"
                                    }`
                              }
                              onClick={() => {
                                 closeMenus("all");
                              }}
                           >
                              صفحه اصلی
                           </NavLink>
                           <NavLink
                              to="/users"
                              className={({ isActive }) =>
                                 `py-3 pr-4 w-full dark:hover:bg-slate-600 hover:bg-gray-200
                                    dark:active:bg-slate-600 active:bg-gray-200
                                 hover:text-sky-400 hover:border-sky-400 transition-05 ${
                                    isActive
                                       ? "border-r-2 border-sky-400 dark:text-white text-slate-800"
                                       : "border-r-2 border-white dark:border-slate-800"
                                 }`
                              }
                              onClick={() => {
                                 closeMenus("all");
                              }}
                           >
                              نویسنده ها
                           </NavLink>
                           <NavLink
                              to="/articles"
                              className={({ isActive }) =>
                                 `py-3 pr-4 w-full dark:hover:bg-slate-600 hover:bg-gray-200
                                    dark:active:bg-slate-600 active:bg-gray-200
                                 hover:text-sky-400 hover:border-sky-400 transition-05 ${
                                    isActive
                                       ? "border-r-2 border-sky-400 dark:text-white text-slate-800"
                                       : "border-r-2 border-white dark:border-slate-800"
                                 }`
                              }
                              onClick={() => {
                                 closeMenus("all");
                              }}
                           >
                              مقالات
                           </NavLink>
                           <NavLink
                              to="/onlineLearning"
                              className={({ isActive }) =>
                                 `py-3 pr-4 w-full dark:hover:bg-slate-600 hover:bg-gray-200
                                    dark:active:bg-slate-600 active:bg-gray-200
                                 hover:text-sky-400 hover:border-sky-400 transition-05 ${
                                    isActive
                                       ? "border-r-2 border-sky-400 dark:text-white text-slate-800"
                                       : "border-r-2 border-white dark:border-slate-800"
                                 }`
                              }
                              onClick={() => {
                                 closeMenus("all");
                              }}
                           >
                              آموزش مجازی
                           </NavLink>
                           <NavLink
                              to="/aboutUs"
                              className={({ isActive }) =>
                                 `py-3 pr-4 w-full dark:hover:bg-slate-600 hover:bg-gray-200
                                    dark:active:bg-slate-600 active:bg-gray-200
                                 hover:text-sky-400 hover:border-sky-400 transition-05 ${
                                    isActive
                                       ? "border-r-2 border-sky-400 dark:text-white text-slate-800"
                                       : "border-r-2 border-white dark:border-slate-800"
                                 }`
                              }
                              onClick={() => {
                                 closeMenus("all");
                              }}
                           >
                              درباره ما
                           </NavLink>
                        </div>
                        {/* ---end of side list */}
                        {/* me */}
                        <div className="flex flex-col px-2 gap-5 w-full">
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
                              <span className="text-xs"> Design By </span>
                              <span className="text-sm font-bold"> Mehran Jamali </span>
                              {/* <FontAwesomeIcon icon={faHeart} className="text-base text-red-500" /> */}
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
                  <ul className="flex flex-row justify-end gap-5 text-sm text-slate-500 dark:text-slate-300 nav-links">
                     <li className="py-4">
                        <NavLink
                           to="/"
                           className={({ isActive }) =>
                              `py-4 px-1 hover:text-sky-400 hover:border-sky-400 transition-03 ${
                                 isActive
                                    ? "border-b border-sky-400 text-slate-900 dark:text-slate-50"
                                    : ""
                              }`
                           }
                           onClick={() => {
                              closeMenus("all");
                           }}
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
                                    ? "border-b border-sky-400 hover:text-gray-600 text-slate-900 dark:text-slate-50"
                                    : ""
                              }`
                           }
                           onClick={() => {
                              closeMenus("all");
                           }}
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
                                    ? "border-b border-sky-400 hover:text-gray-600 text-slate-900 dark:text-slate-50"
                                    : ""
                              }`
                           }
                           onClick={() => {
                              closeMenus("all");
                           }}
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
                                    ? "border-b border-sky-400 hover:text-gray-600 text-slate-900 dark:text-slate-50"
                                    : ""
                              }`
                           }
                           onClick={() => {
                              closeMenus("all");
                           }}
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
                                    ? "border-b border-sky-400 hover:text-gray-600 text-slate-900 dark:text-slate-50"
                                    : ""
                              }`
                           }
                           onClick={() => {
                              closeMenus("all");
                           }}
                        >
                           درباره ما
                        </NavLink>
                     </li>
                  </ul>
               </div>
               {/* ---end of nav links */}
            </div>
            {/* ....................................................................................... */}
            {/* ---end of right_side: hamburger , brand , mobile menu - nav links */}
            {/* left_side: profile , search , notification , theme*/}
            <div className="flex flex-row justify-start items-center navbar-h gap-6">
               {/* theme */}
               <div className="flex items-center py-4 text-lg">
                  {lightTheme ? (
                     <FontAwesomeIcon
                        icon={faMoon}
                        className="text-indigo-700 py-1 text-xl"
                        onClick={() => {
                           toggleTheme(false);
                        }}
                     />
                  ) : (
                     <FontAwesomeIcon
                        icon={faSun}
                        className="text-yellow-400 py-1 text-xl"
                        onClick={() => {
                           toggleTheme(true);
                        }}
                     />
                  )}
               </div>
               {/* ---end of theme */}
               {/* search  */}
               <div className="flex items-center py-4 text-lg">
                  <FontAwesomeIcon
                     icon={faSearch}
                     className="py-1 hover:text-sky-400 transition-03"
                     onClick={toggleSearchModal}
                  />
                  <div className="">
                     {/* bg */}
                     <div
                        className={`absolute inset-0 from-top bg-slate-400/50 w-full h-screen ${
                           !showSearchModal ? "hidden" : ""
                        }`}
                        onClick={() => {
                           closeMenus("all");
                        }}
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
                  <div className="">
                     {/* bg */}
                     <div
                        className={`absolute inset-0 bg-slate-400/50  from-top w-full h-screen ${
                           !showNotificationPanel ? "hidden" : ""
                        }`}
                        onClick={() => {
                           closeMenus("all");
                        }}
                     ></div>
                     {/* ---end of bg */}
                     <Notification showPanel={showNotificationPanel} />
                  </div>
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
