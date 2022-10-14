import React, { useContext, useState, useCallback, useEffect } from "react";

// components
import Spinner from "../../../../../../../components/spinner/spinner";
import HidePostReasonContainer from "./HidePostReasonContainer";
import ReportPostReasonContainer from "./ReportPostReasonContainer";
import LikeCommentNumber from "./LikeCommentNumber";
import PostControlMenuDD from "./postControlMenuDD";

// context
import { GlobalModalContext } from "../../../../../../../context/globalModalContext";

// redux
// -- fakePost slice
import {
   reasonType,
   reportPostReasonsListType,
   hideMainPostCommand,
   reportMainPostCommand,
} from "../../../../../../../store/slices/fakePost";
// -- user
import {
   userAuthReadStateSelector,
   userAuthType,
   userMustBeAuthenticatedError,
} from "../../../../../../../store/slices/user";

// fontawesome icon
import { useDispatchHook, RootState, useSelectorHook } from "../../../../../../../store/hooks/useHooks";
import PostFooterActions from "./postFooterActions";
import { Link } from "react-router-dom";

type postContainerPropsType = {
   post: any;
};

// hide post reason list
const hidePostReasonsList: reasonType[] = [
   {
      id: 1,
      reason: "من به این نویسنده علاقه مند نیستم",
   },
   {
      id: 2,
      reason: "من به این موضوع علاقه مند نیستم",
   },
   {
      id: 3,
      reason: "من پست های زیادی در این مورد دیده ام",
   },
   {
      id: 4,
      reason: "من این پست را قبلا دیده ام",
   },
   {
      id: 5,
      reason: "این پست قدیمی است",
   },
   {
      id: 6,
      reason: "به خاطر موارد دیگر",
   },
];

// report post reason list
const reportPostReasonsList: reportPostReasonsListType[] = [
   {
      id: 1,
      title: "Suspicious, spam, or fake",
      reasons: [
         { id: 1, reason: "Misinformation", desc: "Spreading false or misleading information as if it were factual" },
         { id: 2, reason: "Fraud or scam", desc: "Deceiving others to obtain money or access private information" },
         {
            id: 3,
            reason: "Spam",
            desc: "Sharing irrelevant or repeated content to boost visibility or for monetary gain",
         },
         { id: 4, reason: "Fake account", desc: "Inaccurate or misleading representation" },
      ],
   },
   {
      id: 2,
      title: "Harassment or hateful speech",
      reasons: [
         {
            id: 5,
            reason: "Bullying or trolling",
            desc: "Attacking or intimidating others, or deliberately and repeatedly disrupting conversations",
         },
         {
            id: 6,
            reason: "Sexual harassment",
            desc: "Unwanted romantic advances, requests for sexual favors, or unwelcome sexual remarks",
         },
         {
            id: 7,
            reason: "Hateful or abusive speech",
            desc: "Hateful, degrading, or inflammatory speech",
         },
         {
            id: 8,
            reason: "Spam",
            desc: "Sharing irrelevant or repeated content to boost visibility or for monetary gain",
         },
      ],
   },
   {
      id: 3,
      title: "Violence or phisical Harm",
      reasons: [
         {
            id: 9,
            reason: "Inciting violence or is a threat",
            desc: "Encouraging violent acts or threatening physical harm",
         },
         { id: 10, reason: "Self-harm", desc: "Suicidal remarks or threatening to harm oneself" },
         {
            id: 11,
            reason: "Shocking or groy",
            desc: "Shocking or graphic content",
         },
         {
            id: 12,
            reason: "Terrorism or act of extreme violence",
            desc: "Depicting or encouraging terrorist acts or severe harm",
         },
      ],
   },
   {
      id: 4,
      title: "Adult content",
      reasons: [
         { id: 13, reason: "Nudity or sexual content", desc: "Nudity, sexual scenes or language, or sex trafficking" },
         { id: 14, reason: "Shocking or groy", desc: "Shocking or graphic content" },
         {
            id: 15,
            reason: "Sexual harassment",
            desc: "Unwanted romantic advances, requests for sexual favors, or unwelcome sexual remarks",
         },
      ],
   },
];

const spinnerSize = {
   layer1: { width: "w-3", height: "h-3" },
   layer2: { width: "w-2", height: "h-2" },
   layer3: { width: "w-1", height: "h-1" },
};

function PostContainer({ post }: postContainerPropsType) {
   const dispatch = useDispatchHook();
   const userState: userAuthType = useSelectorHook((state: RootState) => userAuthReadStateSelector(state));
   // state
   const [showPost, setShowPost] = useState<boolean>(true);
   const [showHidePostReasonContainer, setShowHidePostReasonContainer] = useState<boolean>(false);
   const [showControlMenu, setShowControlMenu] = useState<boolean>(false);
   const [showControlMenuSpinner, setShowControlMenuSpinner] = useState<boolean>(false);
   // show more text
   const [isShowMoreActive, setIsShowMoreActive] = useState<boolean>(false);
   // context
   const modal = useContext(GlobalModalContext);

   const handleShowControlMenu = useCallback(() => {
      if (!showControlMenu) {
         setShowControlMenuSpinner(true);
         setTimeout(() => {
            setShowControlMenuSpinner(false);
            setShowControlMenu(!showControlMenu);
         }, 300);
         return;
      }
      setShowControlMenuSpinner(false);
      setShowControlMenu(!showControlMenu);
   }, [showControlMenu]);

   // hide post - reason
   const dispatchHidePost = (reason: reasonType) => {
      dispatch(hideMainPostCommand({ postId: post.id, reason: reason }));
      setShowPost(false);
      setShowHidePostReasonContainer(false);
   };

   // report post - reason
   const dispatchReportPost = (reason: reasonType) => {
      dispatch(reportMainPostCommand({ postId: post.id, reason: reason }));
      modal.hideModal();
      setShowPost(false);
   };

   //
   const handleHidePostReasonContainer = (bool: boolean) => {
      if (userState.accessToken) {
         setShowHidePostReasonContainer(bool);
         modal.hideModal();
      } else {
         userMustBeAuthenticatedError();
      }
   };

   // show hide post container
   // HPRC => Hide Post Reason Container
   const showHPRCAndHideReportModal = () => {
      if (userState.accessToken) {
         setShowHidePostReasonContainer(true);
         modal.hideModal();
      } else {
         userMustBeAuthenticatedError();
      }
   };

   // Call Show Post and Send Component as a Parameter
   const showPostReportModal = () => {
      if (userState.accessToken) {
         modal.showModal(
            <ReportPostReasonContainer
               post={post}
               reportPostReasonsList={reportPostReasonsList}
               submitReportPostReason={dispatchReportPost}
               hideModal={modal.hideModal}
               showHPRCAndHideReportModal={showHPRCAndHideReportModal}
            />
         );
      } else {
         userMustBeAuthenticatedError();
      }
   };

   return (
      <div
         data-name="post-container"
         className={`relative w-full last:mb-0 border border-slate-200 dark:border-slate-700 
                sm:rounded-md shadow-lg p-1 bg-white dark:bg-slate-800 transition-03 
                ${!showPost && "hidden"}`}
      >
         {/* post-container-head */}
         <div
            data-name="post-container-head"
            className="flex flex-row flex-nowrap justify-between align-middle gap-2 px-2 mb-2 h-auto overflow-hidden"
         >
            <div
               data-name="post-container-head-right"
               className="pt-2 flex flex-row gap-2 text-ellipsis whitespace-nowrap overflow-hidden w-11/12"
            >
               <div className="relative">
                  <img
                     src={post.userImageUrl}
                     className="object-cover rounded-full w-12 h-12 bg-slate-200 dark:bg-slate-600 text-2xs text-slate-400 
                                flex items-center justify-center"
                     alt="users"
                  />
                  {/* online green light */}
                  <span
                     className={`absolute right-0.5 bottom-0.5 rounded-full bg-green-500 p-1.5 ${
                        post.isOnline ? "" : "hidden"
                     }`}
                  ></span>
                  {/* end -> online green light */}
               </div>
               <div className="text-xs leading-4 text-ellipsis whitespace-nowrap overflow-hidden w-10/12">
                  <p className="text-sm text-slate-700 dark:text-slate-100 text-ellipsis whitespace-nowrap overflow-hidden">
                     {post.name}
                  </p>
                  <p className="text-slate-400 dark:text-slate-400 text-ellipsis whitespace-nowrap overflow-hidden">
                     {post.description}
                  </p>
                  <p className="font-bYekan text-slate-400 dark:text-slate-400">{post.postTime}</p>
               </div>
            </div>
            <div data-name="post-container-head-left" className="flex-1 text-left">
               {/* ... */}
               <button className="" onClick={handleShowControlMenu}>
                  <span className={`${showControlMenuSpinner ? "hidden" : ""}`}>...</span>
                  <span className={`bg-slate-300 rounded-full h-3 w-3 ${showControlMenuSpinner ? "" : "hidden"}`}>
                     <Spinner spin={showControlMenuSpinner} size={spinnerSize} />
                  </span>
               </button>
               <PostControlMenuDD
                  post={post}
                  showControlMenu={showControlMenu}
                  setShowControlMenu={setShowControlMenu}
                  handleHidePostReasonContainer={handleHidePostReasonContainer}
                  showPostReportModal={showPostReportModal}
               />
            </div>
            {/* hide post reason modal */}
            <HidePostReasonContainer
               showHidePostReasonContainer={showHidePostReasonContainer}
               handleHidePostReasonContainer={handleHidePostReasonContainer}
               submitHidePostReason={dispatchHidePost}
               hidePostReasonsList={hidePostReasonsList}
               post={post}
            />
            {/* end of => hide post reason modal */}
         </div>
         {/* end -> post-container-head */}

         <div data-name="post-container-content" className="p-2 pb-3">
            <p
               className={`text-sm text-slate-600 dark:text-slate-300 w-full overflow-hidden line-clamp-4 whitespace-pre-line ${
                  isShowMoreActive && "line-clamp-none"
               }`}
            >
               {post.postContent.text}
            </p>
            <span
               className={`text-xs text-blue-500 hover:cursor-pointer ${isShowMoreActive && "hidden"}`}
               onClick={() => {
                  setIsShowMoreActive(true);
               }}
            >
               بیشتر ...
            </span>
            <div className="text-xs text-left" dir="ltr">
               {post.postContent.tags.map((tag: any, index: number) => {
                  return (
                     <Link key={index} to={`/${tag.link}`} className="text-blue-400 pr-1.5">
                        #{tag.tagName}
                     </Link>
                  );
               })}
            </div>
            <div className={`mt-2 rounded-md min-h- ${!post.postContent?.imgUrl && "hidden"}`}>
               <img
                  src={post.postContent?.imgUrl}
                  alt="post-img"
                  className="main-post-img rounded-md text-2xs bg-slate-200 dark:bg-slate-600 text-slate-400"
               />
            </div>
         </div>

         <div data-name="post-container-footer" className="">
            {/*  */}
            <LikeCommentNumber post={post} />
            <PostFooterActions post={post} />
         </div>
      </div>
   );
}

export default React.memo(PostContainer);
