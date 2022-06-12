import React from "react";

function HomePage() {
   return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
         {/* right section */}
         <div className="col-span-12 md:col-span-4 lg:col-span-2">
            <div className="bg-white text-slate-900 dark:bg-slate-800 dark:text-white shadow-xl p-2 sm:rounded-md">
               <p className="text-base">right section</p>
            </div>
         </div>
         {/* middle section */}
         <div className="col-span-12 md:col-span-8 lg:col-span-7 ">
            <div className="bg-white text-slate-900 dark:bg-slate-800 dark:text-white shadow-xl p-2 min-h-screen sm:rounded-md">
               middle section
            </div>
         </div>
         {/* left section */}
         <div className="hidden gap-4 lg:col-span-3 lg:flex lg:flex-col">
            <div className="bg-white text-slate-900 dark:bg-slate-800 dark:text-white shadow-xl p-2 sm:rounded-md">
               <p className="text-xs">left section</p>
            </div>
            <div className="bg-white text-slate-900 dark:bg-slate-800 dark:text-white shadow-xl p-2 sm:rounded-md">
               <p className="text-xs">left section</p>
            </div>
         </div>
      </div>
   );
}

export default HomePage;
