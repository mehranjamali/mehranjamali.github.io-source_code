import { useState } from "react";

// FontAwesomeIcon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";

// redux
// hook
import { useDispatchHook, RootState, useSelectorHook } from "../../../../../../../store/hooks/useHooks";

// -- fakePost
import { likeMainPostCommand } from "../../../../../../../store/slices/fakePost";
// -- user
import {
   userAuthReadStateSelector,
   userMustBeAuthenticatedError,
   userAuthType,
} from "../../../../../../../store/slices/user";

import LikeHoverBox, { initialLikeType } from "./likeHoverBox";

type PostFooterActionsPropsType = {
   post: any;
};

function PostFooterActions({ post }: PostFooterActionsPropsType) {
   const [likeType, setLikeType] = useState<typeof initialLikeType>(initialLikeType);

   const dispatch = useDispatchHook();
   const userState: userAuthType = useSelectorHook((state: RootState) => userAuthReadStateSelector(state));

   // handle like
   const handleLike = (likeTypeObj: typeof initialLikeType) => {
      if (userState.accessToken) {
         if (likeType.status !== likeTypeObj.status) {
            dispatch(likeMainPostCommand(post.id, true));
            setLikeType(likeTypeObj);
         } else {
            dispatch(likeMainPostCommand(post.id, !post.liked));
         }
      } else {
         userMustBeAuthenticatedError();
      }
   };

   // set default like
   const setDefaultLike = () => {
      if (userState.accessToken) {
         if (likeType.status !== 0) {
            dispatch(likeMainPostCommand(post.id, false));
            setLikeType(initialLikeType);
            return;
         } else {
            dispatch(likeMainPostCommand(post.id, !post.liked));
         }
      } else {
         userMustBeAuthenticatedError();
      }
   };

   return (
      <div className="w-full px-4">
         <div className="w-full flex flex-row justify-between align-middle gap-1 text-xs text-slate-500 dark:text-slate-300 pt-1 border-t dark:border-slate-700">
            <button
               onClick={() => {
                  setDefaultLike();
               }}
               // like-post-btn
               className={`like-post-btn-footer hover:bg-slate-200 dark:hover:bg-slate-700 py-2 px-3 rounded-md flex-grow box-border 
               ${post.liked && likeType.color} hover:peer-first:block `}
            >
               <span className="text-lg xs:text-base xs:pl-2">
                  <FontAwesomeIcon icon={post.liked ? likeType.likedIcon : likeType.intialIcon} className="-mb-0.5" />
               </span>
               <span className="hidden xs:inline">{likeType.name}</span>
            </button>
            {/* like-post-btn-box */}
            <div className="like-post-btns-hover-box">
               <LikeHoverBox onLike={handleLike} />
            </div>
            {/* end of ---> like-post-btn-box */}
            <button className="hover:bg-slate-200 dark:hover:bg-slate-700 py-2 px-3 rounded-md transition-03 flex-grow box-border">
               <span className="text-lg xs:text-base xs:pl-2">
                  <FontAwesomeIcon icon={faComment} className="-mb-0.5" />
               </span>
               <span className="hidden xs:inline">نظر</span>
            </button>
            <button className="hover:bg-slate-200 dark:hover:bg-slate-700 py-2 px-3 rounded-md transition-03 flex-grow box-border">
               <span className="text-lg xs:text-base xs:pl-2">
                  <FontAwesomeIcon icon={faRepeat} className="-mb-0.5" />
               </span>
               <span className="hidden xs:inline">پست کردن مجدد</span>
            </button>
            <button className="hover:bg-slate-200 dark:hover:bg-slate-700 py-2 px-3 rounded-md transition-03 flex-grow box-border">
               <span className="text-lg xs:text-base xs:pl-2">
                  <FontAwesomeIcon icon={faPaperPlane} className="-mb-0.5" />
               </span>
               <span className="hidden xs:inline">ارسال</span>
            </button>
         </div>
      </div>
   );
}

export default PostFooterActions;
