import showToast from "../../../../../../../utiles/toast";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular, faFlag, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import { saveMainPostCommand } from "../../../../../../../store/slices/fakePost";

import { useDispatchHook } from "../../../../../../../store/hooks/useHooks";

// props type
type PostControlMenuDDPropsType = {
   showControlMenu: boolean;
   setShowControlMenu: React.Dispatch<React.SetStateAction<boolean>>;
   post: any;
   showPostReportModal: () => void;
   setShowHidePostReasonContainer: React.Dispatch<React.SetStateAction<boolean>>;
};

function PostControlMenuDD({
   showControlMenu,
   setShowControlMenu,
   post,
   setShowHidePostReasonContainer,
   showPostReportModal,
}: PostControlMenuDDPropsType) {
   const dispatch = useDispatchHook();
   // Copy Post Link
   const handleCopyPostLink = (postLink: string) => {
      navigator.clipboard.writeText(process.env.REACT_APP_BASE_URL + postLink);
      showToast(
         <div className="w-full flex flex-row items-center gap-2 pt-1" dir="rtl">
            <p className="">لینک کپی شد.</p>
            <Link to={postLink} className="text-xs text-blue-600 dark:text-blue-400">
               مشاهده پست
            </Link>
         </div>,
         "success",
         false
      );
   };
   return (
      <div
         data-name="post-control-menu"
         className={`absolute w-60 h-auto left-3 top-9 z-40 py-1 mb-0 bg-white dark:bg-slate-800 border 
            dark:border-slate-700 shadow-md shadow-slate-300 dark:shadow-slate-900 rounded-md rounded-tl-none 
         ${showControlMenu ? "block" : "hidden"}`}
      >
         <div className="flex flex-col text-xs">
            {/* save - unsave */}
            <button
               className="flex flex-row items-center text-right gap-1.5 p-3 
               dark:hover:bg-slate-600 hover:bg-gray-200 transition-03"
               onClick={() => {
                  dispatch(saveMainPostCommand(post.id));
                  setShowControlMenu(false);
               }}
            >
               <FontAwesomeIcon
                  icon={!post.saved ? faBookmarkRegular : faBookmarkSolid}
                  className="w-4 text-sm"
               ></FontAwesomeIcon>
               <div>{post.saved ? <div>حذف کردن از لیست</div> : <div>ذخیره کردن پست</div>}</div>
            </button>
            {/* end of => save - unsave */}
            {/* copy link */}
            <button
               className="flex flex-row items-center text-right gap-1.5 p-3
             dark:hover:bg-slate-600 hover:bg-gray-200 transition-03"
               onClick={() => {
                  handleCopyPostLink(`posts/${post.id}`);
                  setShowControlMenu(false);
               }}
            >
               <FontAwesomeIcon icon={faLink} className="w-4 text-sm"></FontAwesomeIcon>
               <div>
                  <div>کپی کردن لینک پست</div>
               </div>
            </button>
            {/* end of => copy link */}
            {/* hide post */}
            <button
               className="flex flex-row items-center text-right gap-1.5 p-3
             dark:hover:bg-slate-600 hover:bg-gray-200 transition-03"
               onClick={() => {
                  setShowHidePostReasonContainer(true);
                  setShowControlMenu(false);
               }}
            >
               <FontAwesomeIcon icon={faEyeSlash} className="w-4 text-sm"></FontAwesomeIcon>
               <div>
                  <div>این پست را برای من نمایش نده</div>
               </div>
            </button>
            {/* end of => hide post */}
            {/* report */}
            <button
               className="flex flex-row items-center text-right gap-1.5 p-3 
            dark:hover:bg-slate-600 hover:bg-gray-200 transition-03"
               onClick={() => {
                  setShowControlMenu(false);
                  showPostReportModal();
               }}
            >
               <FontAwesomeIcon icon={faFlag} className="w-4 text-sm"></FontAwesomeIcon>
               <div>
                  <div>گزارش دادن این پست</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                     گزارش بلافاصله مورد بررسی قرار میگیرد
                  </div>
               </div>
            </button>
            {/* end of => report */}
         </div>
      </div>
   );
}

export default PostControlMenuDD;
