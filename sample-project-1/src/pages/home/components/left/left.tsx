import React, { useEffect } from "react";
import Popular from "./components/popular/popular";
import Relevant from "./components/relevant/relevant";

function LC() {
   useEffect(() => {
      // console.log("LC re-rendered");
   });

   return (
      <div data-name="left-sidebar-content" className="lg:flex lg:flex-col items-start justify-start gap-2 h-full">
         <Relevant />
         <Popular />
      </div>
   );
}

export default LC;
