import React, { useEffect, useMemo, useRef } from "react";
// hooks
import { useSelectorHook, useDispatchHook, RootState } from "../../../../../../store/hooks/useHooks";

// redux
// import posts, { selectPostsByUser, fetchPosts, selectPosts, postType } from "../../../../../../store/slices/posts";
import { fetchMainPostsCommand, mainPostType, getMainPostsSelector } from "../../../../../../store/slices/fakePost";

import { stateType } from "../../../../../../store/types/type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import Spinner from "../../../../../../components/spinner/spinner";
import PostContainer from "./components/postContainer";

function MainPosts() {
   const dispatch = useDispatchHook();
   const toggleSortDDAngle: any = useRef(null);
   const sortBoxDD: any = useRef(null);
   // get data from jsonplaceholder server REAL
   // const doSelectPostsByUser = useMemo(selectPostsByUser, []);
   // const postsByUser: stateType<postType[]> = useSelectorHook((state: RootState) => doSelectPostsByUser(state, 1));
   // const posts: postType[] = useSelectorHook(selectPosts);
   const doSelectMainPosts = useMemo(() => getMainPostsSelector, []);
   // const doSelectSavedPosts = useMemo(() => getSavedPostsSelector, []);
   const mainPosts: stateType<mainPostType[]> = useSelectorHook((state: RootState) => doSelectMainPosts(state));
   // const savedPosts: stateType<mainPostType[]> = useSelectorHook((state: RootState) => doSelectSavedPosts(state));

   useEffect(() => {
      // real
      // dispatch(fetchPosts());
      // fake => we will show this data in DOM
      dispatch(fetchMainPostsCommand());
   }, [dispatch]);

   const toggleSortBox = () => {
      toggleSortDDAngle.current.classList.toggle("-rotate-90");
      sortBoxDD.current.classList.toggle("hidden");
      if (!sortBoxDD.current.classList.contains("hidden")) {
         setTimeout(() => {
            window.addEventListener(
               "click",
               () => {
                  toggleSortDDAngle.current.classList.remove("-rotate-90");
                  sortBoxDD.current.classList.add("hidden");
               },
               { once: true }
            );
         }, 100);
      }
   };

   const doSortOnPosts = () => {
      toggleSortDDAngle.current.classList.remove("-rotate-90");
      sortBoxDD.current.classList.add("hidden");
   };


   return (
      <div data-name="main-posts" className="w-full">
         {mainPosts.loading ? (
            <div data-name="main-posts-loading" className="w-full flex justify-center items-center py-2">
               <Spinner spin={mainPosts.loading} />
            </div>
         ) : mainPosts.error ? (
            <div className="w-full text-center text-base py-2 text-red-500">
               <p>{mainPosts.error}</p>
            </div>
         ) : mainPosts.data?.length ? (
            <div data-name="main-posts-container" className="flex flex-col gap-2">
               {/* sort dropdown */}
               <div data-name="sort-dropdown" className="w-full relative">
                  <button
                     className="flex flex-row items-center justify-start gap-3 w-full text-xs"
                     onClick={() => toggleSortBox()}
                  >
                     <div className="align-middle flex flex-row items-center gap-2">
                        <span>جدید</span>
                        <span ref={toggleSortDDAngle} className="transition-03">
                           <FontAwesomeIcon className="pt-1" icon={faAngleLeft} />
                        </span>
                     </div>
                     <hr className="align-middle h-01 rounded-full bg-slate-300 dark:bg-slate-600 border-none flex-grow" />
                  </button>
                  <div
                     ref={sortBoxDD}
                     className="hidden z-50 absolute top-702 right-0 bg-white dark:bg-slate-800 border dark:border-slate-700 shadow-2xl 
                                rounded-bl-md rounded-tr-md dark:shadow-slate-900"
                  >
                     <div className="flex flex-col items-start justify-between w-36 text-xs">
                        <button
                           className="w-full py-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-03"
                           onClick={() => doSortOnPosts()}
                        >
                           پرطرفدار
                        </button>
                        <button
                           className="w-full py-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-03"
                           onClick={() => doSortOnPosts()}
                        >
                           جدید
                        </button>
                     </div>
                  </div>
               </div>
               {/* end of sort dropdown */}

               <div data-name="main-posts-list" className="w-full flex flex-col gap-2">
                  {mainPosts.data.map((post: any, index: number) => {
                     return <PostContainer key={index} post={post} />;
                  })}
               </div>
            </div>
         ) : (
            <div className="w-full text-center">
               <p>هیچ پستی برای نمایش وجود ندارد</p>
            </div>
         )}
      </div>
   );
}

export default React.memo(MainPosts);
