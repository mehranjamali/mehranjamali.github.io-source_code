import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireFlameCurved, faArrowRight, faArrowLeft, faBlog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

// service
import { getPopularList, popularListType } from "./popularService";

// component
import Spinner from "../../../../../../components/snipper/spinner";
import Slider from "../../../../../../components/slider/slider";

function Popular() {
   const [popularList, setPopularList] = useState([] as popularListType);
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      setPopularList(getPopularList());
      setTimeout(() => {
         setLoading(false);
      }, 1000);
   }, []);

   return (
      <div
         data-name="popular"
         className="flex flex-col gap-2 bg-white text-slate-900 dark:bg-slate-800 dark:text-white shadow-xl py-3
                   sm:rounded-md transition-03 border border-slate-200 dark:border-slate-600 sticky top-18 w-full"
      >
         {/* head */}
         <div data-name="relevant-box-title" className="flex flex-row justify-between items-center px-3">
            <h4 className="text-base font-normal">محبوب ترین ها</h4>
            <FontAwesomeIcon
               icon={faFireFlameCurved}
               className="bg-slate-200 dark:bg-slate-600 rounded-md text-xs py-1 px-1.5 transition-03"
            />
         </div>
         {/* spinner */}
         {loading && (
            <div className="w-full flex justify-center p-2">
               <Spinner spin />
            </div>
         )}
         {/* slider */}
         <div data-name="slider" className={`p-1 rounded-md ${loading && "hidden"}`}>
            {popularList.length && <Slider popularList={popularList} />}
         </div>

         {/* list */}
         <div data-name="popular-list" className="">
            <ul className="flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
               <li className="flex flex-row justify-start gap-3 hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-sky-500 transition-03 px-3 py-1">
                  <FontAwesomeIcon icon={faBlog} className="pt-0.5" />
                  <Link to="/" className="border-b border-slate-300 dark:border-slate-600">
                     {" "}
                     عملکرد Docker به چه صورت است؟{" "}
                  </Link>
               </li>
               <li className="flex flex-row justify-start gap-3 hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-sky-500 transition-03 px-3 py-1">
                  <FontAwesomeIcon icon={faBlog} className="pt-0.5" />
                  <Link to="/" className="border-b border-slate-300 dark:border-slate-600">
                     طراحی سایت چیست؟ چه مراحلی دارد؟{" "}
                  </Link>
               </li>
               <li className="flex flex-row justify-start gap-3 hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-sky-500 transition-03 px-3 py-1">
                  <FontAwesomeIcon icon={faBlog} className="pt-0.5" />
                  <Link to="/" className="border-b border-slate-300 dark:border-slate-600">
                     {" "}
                     صفر تا صد نرم افزار CRM{" "}
                  </Link>
               </li>
               <li className="flex flex-row justify-start gap-3 hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-sky-500 transition-03 px-3 py-1">
                  <FontAwesomeIcon icon={faBlog} className="pt-0.5" />
                  <Link to="/" className="border-b border-slate-300 dark:border-slate-600">
                     دات نت نیوک چیست ؟{" "}
                  </Link>
               </li>
               <li className="flex flex-row justify-start gap-3 hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-sky-500 transition-03 px-3 py-1">
                  <FontAwesomeIcon icon={faBlog} className="pt-0.5" />
                  <Link to="/" className="border-b border-slate-300 dark:border-slate-600">
                     {" "}
                     عملکرد Docker به چه صورت است؟{" "}
                  </Link>
               </li>
               <li className="flex flex-row justify-start gap-3 hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-sky-500 transition-03 px-3 py-1">
                  <FontAwesomeIcon icon={faBlog} className="pt-0.5" />
                  <Link to="/" className="border-b border-slate-300 dark:border-slate-600">
                     طراحی سایت چیست؟ چه مراحلی دارد؟{" "}
                  </Link>
               </li>
            </ul>
         </div>
      </div>
   );
}

export default Popular;
