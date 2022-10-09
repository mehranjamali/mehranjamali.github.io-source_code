import { useEffect, useState } from "react";
import LC from "./components/left/left";
import MC from "./components/middle/middle";
import RC from "./components/right/right";

// component
import HomeLoader from "../../components/loader/homeLoader";

function HomePage() {
   // state
   const [showLoader, setShowLoader] = useState<boolean>(true);

   // useEffect CDM
   useEffect(() => {
      setShowLoader(true);
      setTimeout(() => {
         setShowLoader(false);
      }, 1000);
   }, []);

   useEffect(() => {
      // console.log("Home-Page Component re-rendered");
   });

   return (
      <div data-name="home" className="">
         {/* home loader */}
         <div
            className={`${
               !showLoader && " hidden "
            } absolute inset-0 flex justify-center items-center bg-white dark:bg-slate-800`}
         >
            <HomeLoader loading={showLoader} />
         </div>
         {/* body content */}
         <div className={`${showLoader && "hidden"} grid grid-cols-1 md:grid-cols-12 gap-5 h-full`}>
            {/* right section */}
            <div data-name="right-sidebar" className="col-span-12 md:col-span-4 lg:col-span-3 h-full">
               <RC />
            </div>
            {/* middle section */}
            <div data-name="main" className="col-span-12 md:col-span-8 lg:col-span-6 h-full">
               <MC />
            </div>
            {/* left section */}
            <div data-name="left-sidebar" className="hidden lg:col-span-3 lg:block h-full">
               <LC />
            </div>
         </div>
      </div>
   );
}

export default HomePage;
