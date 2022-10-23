import React, { useState, useEffect, useReducer } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faSearch,
   faSun,
   faMoon,
   faHome,
   faUsers,
   faNewspaper,
   faBook,
   faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";

// components
import Search from "./components/search/search";
import Notification from "./components/notification/notification";
import Dropdown, { dropdownType } from "./components/dropdown/dropdown";
import MobileNavMenu, { navLinkType } from "./components/mobileNavMenu/mobileNavMenu";

// redux
// -- hooks
import { RootState, useSelectorHook } from "../../store/hooks/useHooks";
// -- user
import { userAuthReadStateSelector, userAuthType } from "../../store/slices/user";

// dropdown items
const dropdownObjs: dropdownType[] = [
   {
      title: "اکانت کاربری",
      list: [
         { link: "/", name: "تنظیمات" },
         { link: "/", name: "ویرایش اطلاعات کاربری" },
      ],
   },
   {
      title: "مدیریت",
      list: [
         { link: "/", name: "لیست های من" },
         { link: "/", name: "مورد علاقه های من" },
         { link: "/", name: "آموزش های من" },
         { link: "/", name: "پست ها و پیش نویس ها" },
      ],
   },
];

// nav links
const navLinks: navLinkType[] = [
   { title: "صفحه اصلی", to: "/", icon: faHome },
   { title: "نویسنده ها", to: "/author", icon: faUsers },
   { title: "مقالات", to: "/articles", icon: faNewspaper, extraClassName: "pointer-events-none" },
   { title: "کتاب ها", to: "/books", icon: faBook, extraClassName: "pointer-events-none" },
   { title: "درباره ما", to: "/aboutUs", icon: faExclamationCircle, extraClassName: "pointer-events-none" },
];

// html, body
const body = document.body;
const html = document.getElementById("html");

// initial state
const initialState = {
   showSearchModal: false,
   showNotificationPanel: false,
   showDropdown: false,
   showMobileMenu: false,
};

// reducer
const reducer = (state: typeof initialState, action: any) => {
   switch (action.type) {
      // toggle mobile menu below the md(768px) media screen
      case "mobile-menu":
         // media-scroll below the md(768px) media screen --> because of mobile menu
         body.classList.toggle("media-scroll");
         // stop scroll in all media screen --> because of notification , search
         body.classList.remove("stop-scroll-body");
         return { ...initialState, showMobileMenu: !state.showMobileMenu };

      // toggle notification panel in all media screen
      case "notification-panel":
         // media-scroll --> because of mobile menu
         body.classList.remove("media-scroll");
         if (!state.showNotificationPanel) body.classList.add("stop-scroll-body");
         else body.classList.remove("stop-scroll-body");
         return { ...initialState, showNotificationPanel: !state.showNotificationPanel };

      // toggle search modal in all media screen
      case "search-modal":
         body.classList.remove("media-scroll");
         if (!state.showSearchModal) body.classList.add("stop-scroll-body");
         else body.classList.remove("stop-scroll-body");
         return { ...initialState, showSearchModal: !state.showSearchModal };

      // toggle dropdown in all media screen
      case "dropdown":
         body.className = "";
         return { ...initialState, showDropdown: !state.showDropdown };

      case "close-all":
         body.className = "";
         return { ...initialState };

      default:
         return state;
   }
};

// Component
function Navbar() {
   const [{ showDropdown, showMobileMenu, showNotificationPanel, showSearchModal }, navbarDispatch] = useReducer(
      reducer,
      initialState
   );

   const [lightTheme, setLightTheme] = useState(localStorage.getItem("theme") === "light");
   const userState: userAuthType = useSelectorHook((state: RootState) => userAuthReadStateSelector(state));

   const location = useLocation();

   // handle navbar visibility
   const handleNavbarVisibility = () => {
      // pathname
      if (["/login", "/register"].includes(location.pathname)) {
         return "hidden";
      }
   };

   // CDM check theme
   useEffect(() => {
      const theme: string | null = localStorage.getItem("theme");
      if (theme) {
         html?.classList.add(theme);
      } else {
         // default theme is light
         html?.classList.add("light");
         setLightTheme(true);
      }
   }, []);

   useEffect(() => {
      // console.log("Navbar Component re-rendered");
   });

   // toggleTheme
   const toggleTheme = (status: boolean) => {
      // true --> light
      // false --> dark
      if (status) {
         localStorage.setItem("theme", "light");
         setLightTheme(true);
         html?.classList.remove("dark");
         html?.classList.add("light");
      } else {
         localStorage.setItem("theme", "dark");
         setLightTheme(false);
         html?.classList.add("dark");
         html?.classList.remove("light");
      }
   };

   // dropdown handleEventListener
   const handleEventListener = () => {
      if (!showDropdown) {
         setTimeout(() => {
            window.addEventListener("click", () => navbarDispatch({ type: "close-all" }), { once: true });
         }, 100);
      }
   };

   // generate NavLink class
   const generateNavLinkClass = (isActive: boolean, extraClassName: string) => {
      return `py-4 px-1 hover:text-sky-400 hover:border-sky-400 transition-03 ${extraClassName} ${
         isActive && "border-b border-sky-400 text-slate-900 dark:text-slate-50"
      }`;
   };

   return (
      <nav
         data-name="navbar"
         className={`fixed top-0 right-0 left-0 bg-white text-slate-700 dark:bg-slate-800 dark:text-slate-200 
                    border-b border-slate-300 dark:border-b dark:border-slate-700 z-50 transition-03 ${handleNavbarVisibility()}`}
      >
         <div
            data-name="navbar-container"
            className="flex flex-row justify-between items-center w-full px-4 lg:px-0 lg:max-w-5xl xl:max-w-6xl mx-auto navbar-h"
         >
            {/* right_side: hamburger , brand , mobile menu - nav links */}
            <div data-name="navbar-right-side" className="flex flex-row justify-end items-center gap-12">
               {/* hamburger , brand , mobile menu */}
               <div className="flex flex-row justify-end items-center gap-4 xs:gap-6">
                  {/* mobile menu */}
                  <div data-name="mobile-menu" className="absolute w-0 top-14 right-0 md:hidden z-50">
                     <div
                        data-name="mobile-menu-bg"
                        className={`absolute top-0 bottom-0 z-50 right-0 left-0 h-screen w-screen bg-slate-400/50 md:hidden ${
                           showMobileMenu ? "" : "hidden"
                        }`}
                        onClick={() => {
                           navbarDispatch({ type: "close-all" });
                        }}
                     ></div>
                     {/* MobileNavMenu Component */}
                     <MobileNavMenu
                        closeMenus={() => navbarDispatch({ type: "close-all" })}
                        navLinks={navLinks}
                        showMobileMenu={showMobileMenu}
                     />
                  </div>
                  {/* ---end of mobile menu */}
                  {/* hamburger */}
                  <div
                     data-name="hamburger"
                     className={`block hamburger md:hidden ${showMobileMenu ? "open" : ""}`}
                     onClick={() => navbarDispatch({ type: "mobile-menu" })}
                  >
                     <span className="hamburger-top bg-slate-800 dark:bg-white"></span>
                     <span className="hamburger-middle bg-slate-800 dark:bg-white"></span>
                     <span className="hamburger-bottom bg-slate-800 dark:bg-white"></span>
                  </div>
                  {/* ---end of hamburger */}
                  {/* brand */}
                  <NavLink to="/" className="font-bold text-base xs:text-xl -mb-1">
                     {/* set style later */}
                     Brand
                  </NavLink>
                  {/* ---end of brand */}
               </div>
               {/* ---end of hamburger , brand , mobile menu */}
               {/* nav links */}
               <div data-name="nav-menu-desktop" className="hidden md:block">
                  <ul className="flex flex-row justify-end gap-5 text-sm text-slate-500 dark:text-slate-300 nav-links">
                     {/* nav link item */}
                     {navLinks.map((item: navLinkType, index: number) => {
                        return (
                           <li data-name="nav-link" className="py-4" key={index}>
                              <NavLink
                                 to={item.to}
                                 className={({ isActive }) => generateNavLinkClass(isActive, item.extraClassName || "")}
                                 onClick={() => {
                                    navbarDispatch({ type: "close-all" });
                                 }}
                              >
                                 {item.title}
                              </NavLink>
                           </li>
                        );
                     })}
                  </ul>
               </div>
               {/* ---end of nav links */}
            </div>
            {/* ---end of right_side: hamburger , brand , mobile menu - nav links */}
            {/* left_side: profile , search , notification , theme*/}
            <div
               data-name="navbar-left-side"
               className="flex flex-row justify-start items-center navbar-h gap-4 xs:gap-6"
            >
               {/* theme */}
               <div data-name="theme" className="flex items-center py-4 text-base xs:text-xl">
                  {lightTheme ? (
                     <FontAwesomeIcon
                        icon={faMoon}
                        className="cursor-pointer text-slate-700 hover:text-indigo-500 py-1 transition-05"
                        onClick={() => {
                           toggleTheme(false);
                        }}
                     />
                  ) : (
                     <FontAwesomeIcon
                        icon={faSun}
                        className="cursor-pointer text-slate-200 py-1 hover:text-yellow-500 transition-05"
                        onClick={() => {
                           toggleTheme(true);
                        }}
                     />
                  )}
               </div>
               {/* ---end of theme */}
               {/* search  */}
               <div data-name="search" className="flex items-center py-4 text-base xs:text-lg">
                  <FontAwesomeIcon
                     icon={faSearch}
                     className="cursor-pointer py-1 hover:text-sky-400 transition-03"
                     onClick={() => {
                        navbarDispatch({ type: "search-modal" });
                     }}
                  />
                  <div className="">
                     {/* bg */}
                     <div
                        data-name="search-bg"
                        className={`absolute inset-0 from-top bg-slate-400/50 w-full h-screen ${
                           !showSearchModal && "hidden"
                        }`}
                        onClick={() => {
                           navbarDispatch({ type: "close-all" });
                        }}
                     ></div>
                     {/* ---end of bg */}
                     {/* Search Component */}
                     <Search showModal={showSearchModal} />
                  </div>
               </div>
               {/* ---end of search  */}
               {/* notification */}
               <div
                  data-name="notification"
                  className={`flex items-center py-4 text-base xs:text-lg ${!userState.accessToken && "hidden"}`}
               >
                  <FontAwesomeIcon
                     icon={faBell}
                     className="cursor-pointer py-1 hover:text-sky-400 transition-03"
                     onClick={() => {
                        navbarDispatch({ type: "notification-panel" });
                     }}
                  />
                  <div className="">
                     {/* bg */}
                     <div
                        data-name="notification-bg"
                        className={`absolute inset-0 bg-slate-400/50  from-top w-full h-screen ${
                           !showNotificationPanel && "hidden"
                        }`}
                        onClick={() => {
                           navbarDispatch({ type: "close-all" });
                        }}
                     ></div>
                     {/* ---end of bg */}
                     <Notification showPanel={showNotificationPanel} />
                  </div>
               </div>
               {/* ---end of notification */}
               {/* user dropdown */}
               <div
                  data-name="dropdown"
                  className={`flex items-center relative py-4 text-lg ${!userState.accessToken && "hidden"}`}
               >
                  <FontAwesomeIcon
                     icon={faUser}
                     className="cursor-pointer bg-gray-200 dark:bg-slate-600 text-gray-600 dark:text-gray-200 p-2 rounded-full 
                     hover:text-sky-400 dark:hover:text-sky-500 transition-03"
                     onClick={() => {
                        navbarDispatch({ type: "dropdown" });
                        handleEventListener();
                     }}
                  />
                  <Dropdown
                     closeMenus={() => navbarDispatch({ type: "close-all" })}
                     showDropdown={showDropdown}
                     dropdownObjs={dropdownObjs}
                  />
               </div>
               <div data-name="login" className={`flex items-center py-4 text-lg ${userState.accessToken && "hidden"}`}>
                  <NavLink to="/login">Login</NavLink>
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
