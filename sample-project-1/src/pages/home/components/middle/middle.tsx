// components
import { useEffect } from "react";
import CreatePostHead from "./components/createPostHead/createPostHead";
import MainPosts from "./components/mainPosts/mainPosts";

function MC() {
   useEffect(() => {
      // console.log("MC re-rendered");
   });

   return (
      <div
         data-name="main-content"
         className="text-slate-700 dark:text-slate-200 min-h-screen sm:rounded-md transition-03 w-full 
                     flex flex-col items-start justify-start gap-2 h-full"
      >
         <CreatePostHead />
         <MainPosts />
      </div>
   );
}

export default MC;
