import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faImage, faNewspaper, faCirclePlay } from "@fortawesome/free-regular-svg-icons";

// context
import { GlobalModalContext } from "../../../../../../context/globalModalContext";

// component
import Spinner from "../../../../../../components/spinner/spinner";
import CreateImagePost from "./createImagePost";
import CreatePostModal from "./createPostModal";
import { useContext } from "react";

// redux
// -- hooks
import { RootState, useSelectorHook } from "../../../../../../store/hooks/useHooks";
import { userAuthType, userAuthReadStateSelector } from "../../../../../../store/slices/user";

// spinner size
const spinnerSize = {
   layer1: { width: "w-6", height: "h-6" },
   layer2: { width: "w-4", height: "h-4" },
   layer3: { width: "w-2", height: "h-2" },
};

function CreatePostHead() {
   const userState: userAuthType = useSelectorHook((state: RootState) => userAuthReadStateSelector(state));

   // context
   const modal = useContext(GlobalModalContext);
   // image post
   const onShowCreateImagePostModal = () => {
      modal.showModal(<CreateImagePost />);
   };
   // video post
   const onShowCreateVideoPostModal = () => {
      // modal.showModal(<div>test</div>);
   };
   // ceate post ---> don't need discard modal
   const onShowCreatePostModal = () => {
      modal.showModal(<CreatePostModal />);
   };

   return (
      <div
         data-name="main-content-head"
         className={`w-full last:mb-0 border border-slate-200 dark:border-slate-700 
                   sm:rounded-md shadow-lg p-3 pb-2 bg-white dark:bg-slate-800 transition-03
                   flex flex-col gap-2 items-center justify-center ${!userState.accessToken && "hidden"}`}
      >
         <div className="flex flex-row items-center w-full gap-3">
            <div className="w-14 h-12 rounded-full">
               <img
                  className="w-full h-full rounded-full text-xs bg-slate-200 dark:bg-slate-600"
                  src={process.env.REACT_APP_USER_IMG_URL}
                  alt="user-img"
               />
            </div>
            <div className="w-full">
               <button
                  className="w-full border border-slate-400  rounded-full py-2 px-3 hover:bg-slate-100 dark:hover:bg-slate-700
                            text-sm text-slate-500 dark:text-slate-400 hover:shadow-lg transition-03
                            flex flex-row justify-between items-center relative overflow-hidden create-new-post-btn"
                  onClick={() => onShowCreatePostModal()}
               >
                  <span>ایجاد یک پست جدید</span>
                  <div className="absolute top-1.5 left-3 opacity-0 transition-03">
                     <Spinner spin size={spinnerSize} />
                  </div>
               </button>
            </div>
         </div>
         <div className="w-full flex flex-row items-center justify-between text-slate-500 dark:text-slate-300 text-xs px-2">
            <button
               className="flex items-center gap-3 hover:bg-slate-200 dark:hover:bg-slate-700 py-2 px-3 rounded-md transition-03"
               onClick={() => onShowCreateImagePostModal()}
            >
               <FontAwesomeIcon icon={faImage} className="text-xl text-blue-500" />
               <span className="hidden xs:inline">تصویر</span>
            </button>
            <button
               className="flex items-center gap-3 hover:bg-slate-200 dark:hover:bg-slate-700 py-2 px-3 rounded-md transition-03"
               onClick={() => onShowCreateVideoPostModal()}
            >
               <FontAwesomeIcon icon={faCirclePlay} className="text-xl text-green-500" />
               <span className="hidden xs:inline">ویدیو</span>
            </button>
            <button className="flex items-center gap-3 hover:bg-slate-200 dark:hover:bg-slate-700 py-2 px-3 rounded-md transition-03">
               <FontAwesomeIcon icon={faBriefcase} className="text-xl text-purple-500" />
               <span className="hidden xs:inline">کار</span>
            </button>
            <button className="flex items-center gap-3 hover:bg-slate-200 dark:hover:bg-slate-700 py-2 px-3 rounded-md transition-03">
               <FontAwesomeIcon icon={faNewspaper} className="text-xl text-orange-500" />
               <span className="hidden xs:inline">نوشتن مقاله</span>
            </button>
         </div>
      </div>
   );
}

export default CreatePostHead;
