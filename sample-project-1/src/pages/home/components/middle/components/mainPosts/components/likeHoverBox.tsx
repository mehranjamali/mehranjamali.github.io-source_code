// FontAwesomeIcon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faThumbsUp as faThumbsUpSolid,
   faHeart,
   faHandsClapping,
   faHandHoldingHeart,
   faFaceGrinSquint,
} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons";

export const initialLikeType = {
   status: 0,
   name: "لایک",
   intialIcon: faThumbsUpRegular,
   likedIcon: faThumbsUpSolid,
   color: "text-blue-500",
};

type LikeHoverBoxPropsType = {
   onLike: (likeTypeObj: typeof initialLikeType) => void;
};

function LikeHoverBox({ onLike }: LikeHoverBoxPropsType) {
   return (
      <div
         className="absolute bottom-14 -right-5 bg-white dark:bg-slate-800 shadow-xl dark:shadow-slate-900 shadow-slate-300
         border rounded-md px-2 pt-2.5 pb-1 border-slate-200 dark:border-slate-700 text-xl transition-03 flex flex-row"
      >
         {/* Like */}
         <button
            data-name="post-like-btns"
            className="post-like-btns text-blue-500 like-btn-animation"
            onClick={() => {
               onLike(initialLikeType);
            }}
         >
            <FontAwesomeIcon icon={faThumbsUpSolid} />
         </button>
         {/* Love */}
         <button
            data-name="post-like-btns"
            className="post-like-btns text-red-600 love-btn-animation"
            onClick={() => {
               onLike({
                  status: 1,
                  name: "Love",
                  intialIcon: faHeart,
                  likedIcon: faHeart,
                  color: "text-red-600",
               });
            }}
         >
            <FontAwesomeIcon icon={faHeart} />
         </button>
         {/* Celebrate */}
         <button
            data-name="post-like-btns"
            className="post-like-btns text-green-600 celebrate-btn-animation"
            onClick={() => {
               onLike({
                  status: 2,
                  name: "Celebrate",
                  intialIcon: faHandsClapping,
                  likedIcon: faHandsClapping,
                  color: "text-green-600",
               });
            }}
         >
            <FontAwesomeIcon icon={faHandsClapping} />
         </button>
         {/* Support */}
         <button
            data-name="post-like-btns"
            className="post-like-btns text-purple-600 support-btn-animation"
            onClick={() => {
               onLike({
                  status: 3,
                  name: "Support",
                  intialIcon: faHandHoldingHeart,
                  likedIcon: faHandHoldingHeart,
                  color: "text-purple-600",
               });
            }}
         >
            <FontAwesomeIcon icon={faHandHoldingHeart} />
         </button>
         {/* Funny */}
         <button
            data-name="post-like-btns"
            className="post-like-btns text-cyan-500 funny-btn-animation"
            onClick={() => {
               onLike({
                  status: 4,
                  name: "Funny",
                  intialIcon: faFaceGrinSquint,
                  likedIcon: faFaceGrinSquint,
                  color: "text-cyan-500",
               });
            }}
         >
            <FontAwesomeIcon icon={faFaceGrinSquint} />
         </button>
      </div>
   );
}

export default LikeHoverBox;
