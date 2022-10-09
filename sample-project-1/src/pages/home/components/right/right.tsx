import React, { useEffect } from "react";
import UserInfo from "./components/userInfo/userInfo";
import Recent from "./components/recent/recent";

function RC() {
   useEffect(() => {
      // console.log("RC re-rendered");
   });

   return (
      <div data-name="right-sidebar-content" className={`flex flex-col items-start justify-start gap-2 h-full `}>
         <UserInfo />
         <Recent />
      </div>
   );
}

export default RC;
