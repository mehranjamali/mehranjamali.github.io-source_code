import { useSelectorHook, RootState } from "../../store/hooks/useHooks";
import { stateType } from "../../store/types/type";

// redux
import { getSavedPostsSelector, mainPostType } from "../../store/slices/fakePost";

// components
import PostContainer from "../home/components/middle/components/mainPosts/components/postContainer";

// fontAwesome icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

function SavedPosts() {
   const savedPosts: stateType<mainPostType[]> = useSelectorHook((state: RootState) => getSavedPostsSelector(state));

   return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-full justify-start">
         <div data-name="saved-posts-right-section" className="col-span-12 h-full md:col-span-4 lg:col-span-3">
            <div
               className="sticky top-18 bg-white text-slate-900 dark:bg-slate-800 dark:text-white shadow-xl
                  sm:rounded-md transition-03 border border-slate-200 dark:border-slate-700
                  text-sm w-full flex flex-col items-start justify-start gap-3 py-3"
            >
               <div className="flex items-center justify-start gap-2 border-b w-full px-3 pb-2 dark:border-slate-700">
                  <FontAwesomeIcon icon={faBookmark} className="" />
                  <span className="">موارد من</span>
               </div>
               <div className="flex items-center justify-between w-full px-3">
                  <span className="text-xs">پست های ذخیره شده</span>
                  <span className="text-sm">{savedPosts.data.length}+</span>
               </div>
            </div>
         </div>
         <div data-name="saved-posts-container" className="col-span-12 md:col-span-8 lg:col-span-6 h-full">
            {savedPosts.data.length ? (
               savedPosts.data.map((post: mainPostType, index: number) => (
                  <div data-name="saved-posts-container" key={index} className="mb-5">
                     <PostContainer post={post} />
                  </div>
               ))
            ) : (
               <div className="flex justify-center items-center h-full">
                  <p>موردی برای نمایش وجود ندارد</p>
               </div>
            )}
         </div>
      </div>
   );
}

export default SavedPosts;
