import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-regular-svg-icons";
import { faHeart, faThumbsUp, faHandsClapping } from "@fortawesome/free-solid-svg-icons";

type LikeCommentNumberPropsType = { post: any };

function LikeCommentNumber({ post }: LikeCommentNumberPropsType) {
   return (
      <div
         data-name="like-comment-number-container"
         className="border-t dark:border-slate-700 w-full flex flex-row justify-between pb-1
                pt-2 px-2 text-xs text-slate-400 dark:text-slate-400"
      >
         <div
            data-name="like-comment-number-container-right"
            className={`flex flex-row items-center justify-start gap-1 `}
         >
            <div data-name="like-comment-icon-group">
               <FontAwesomeIcon
                  icon={faThumbsUp}
                  className={`text-white bg-blue-500 w-2.5 h-2.5 p-1 rounded-full border ${
                     post.numberOfLike < 1 && "hidden"
                  }`}
               />
               <FontAwesomeIcon
                  icon={faHeart}
                  className={`text-white bg-red-500 w-2.5 h-2.5 p-1 rounded-full border -mr-1.5 ${
                     post.numberOfLike < 2 && "hidden"
                  }`}
               />
               <FontAwesomeIcon
                  icon={faHandsClapping}
                  className={`text-white bg-green-500 w-2.5 h-2.5 p-1 rounded-full border -mr-1.5 ${
                     post.numberOfLike < 3 && "hidden"
                  }`}
               />
            </div>
            <div className={`${post.numberOfLike === 0 && "hidden"}`}>{post.numberOfLike}</div>
         </div>
         <div
            data-name="like-comment-number-container-left"
            className={`flex flex-row items-center justify-start gap-1 ${post.numberOfComments === 0 && "hidden"}`}
         >
            <div>
               <span className="pl-1">{post.numberOfComments}</span>
               <span>نظر</span>
            </div>
            <div className="text-base">.</div>
            <div>
               <span className="pl-1">{post.numberOfComments}</span>
               <span>اشتراک گذاری</span>
            </div>
         </div>
      </div>
   );
}

export default LikeCommentNumber;
