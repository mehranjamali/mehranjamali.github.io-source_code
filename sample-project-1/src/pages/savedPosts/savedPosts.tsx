import { useSelectorHook, RootState } from "../../store/hooks/useHooks";
import { stateType } from "../../store/types/type";
import { useNavigate } from "react-router-dom";

// redux
import { getSavedPostsSelector, mainPostType } from "../../store/slices/fakePost";

// components
import PostContainer from "../home/components/middle/components/mainPosts/components/postContainer";

// fontAwesome icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faArrowLeft, faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { faSadTear } from "@fortawesome/free-regular-svg-icons";

function SavedPosts() {
   const savedPosts: stateType<mainPostType[]> = useSelectorHook((state: RootState) => getSavedPostsSelector(state));
   const navigate = useNavigate();
   const handleNavigateToHome = () => {
      navigate("/home");
   };

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
               <div
                  className="bg-white text-slate-900 dark:bg-slate-800 dark:text-white shadow-xl
                               sm:rounded-md transition-03 border border-slate-200 dark:border-slate-700
                               text-sm w-full flex flex-col items-start justify-start gap-4 p-3"
               >
                  <div className="flex flex-col gap-4 w-full">
                     <div className="flex items-center gap-2 text-base">
                        <FontAwesomeIcon
                           icon={faSadTear}
                           className="text-lg text-slate-800 dark:text-slate-200 transition-03"
                        />
                        <p>موردی برای نمایش وجود ندارد</p>
                     </div>
                     <div className="flex items-center justify-center gap-3 bg-gray-200 dark:bg-slate-700 w-full rounded-md py-4">
                        <p className="text-5xl -mb-3 text-slate-800 dark:text-slate-200 transition-03">404</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-200 dark:bg-slate-700 w-full rounded-md p-2 text-xs">
                     <FontAwesomeIcon icon={faDotCircle} />
                     <p>شما باید پست ها را ذخیره کنید تا در اینجا نمایش داده شود.</p>
                  </div>
                  <div className="w-full flex justify-end">
                     <button
                        className="flex flex-row items-center gap-4 text-sm transition-03 
                                 hover:text-sky-500 dark:hover:text-sky-500"
                        onClick={() => handleNavigateToHome()}
                     >
                        <span>بازگشت به صفحه اصلی</span>
                        <FontAwesomeIcon icon={faArrowLeft} />
                     </button>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

export default SavedPosts;
