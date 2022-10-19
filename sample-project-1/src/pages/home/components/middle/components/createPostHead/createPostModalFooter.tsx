import { useContext } from "react";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faNewspaper, faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";

type CreatePostModalFooterPorpsType = {
   permissionItem: any;
   onSubmit: () => void;
   haveText?: boolean;
   havePhoto?: boolean;
   onChangeModal: () => void;
};

function CreatePostModalFooter({
   permissionItem,
   onSubmit,
   havePhoto,
   haveText,
   onChangeModal,
}: CreatePostModalFooterPorpsType) {
   return (
      <div
         data-name="create-post-modal-footer"
         className="flex flex-col xs:flex-row items-center justify-between flex-wrap gap-1 
                    border-t dark:border-slate-700 pb-0 pt-2.5 px-3"
      >
         <div className="flex flex-row justify-between w-full xs:w-fit text-sm xs:text-lg ">
            <button
               onClick={() => onChangeModal()}
               disabled={havePhoto}
               className="px-2 xs:px-3 pt-2.5 pb-1 rounded-full dark:hover:bg-slate-700 hover:bg-slate-200 transition-03 disabled:cursor-not-allowed 
                        disabled:hover:bg-white dark:disabled:hover:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600"
            >
               <FontAwesomeIcon icon={faImage} />
            </button>
            <button
               disabled={havePhoto}
               className="px-2 xs:px-3 pt-2.5 pb-1 rounded-full dark:hover:bg-slate-700 hover:bg-slate-200 transition-03 disabled:cursor-not-allowed 
                        disabled:hover:bg-white dark:disabled:hover:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600"
            >
               <FontAwesomeIcon icon={faCirclePlay} />
            </button>
            <button
               disabled={havePhoto}
               className="px-2 xs:px-3 pt-2.5 pb-1 rounded-full dark:hover:bg-slate-700 hover:bg-slate-200 transition-03 disabled:cursor-not-allowed 
                        disabled:hover:bg-white dark:disabled:hover:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600"
            >
               <FontAwesomeIcon icon={faNewspaper} />
            </button>
            <button
               disabled={havePhoto}
               className="px-2 xs:px-3 pt-2.5 pb-1 rounded-full dark:hover:bg-slate-700 hover:bg-slate-200 transition-03 disabled:cursor-not-allowed 
                        disabled:hover:bg-white dark:disabled:hover:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600"
            >
               <FontAwesomeIcon icon={faBriefcase} />
            </button>
            <div className="flex justify-center items-center gap-2 text-sm px-2 xs:px-3">
               <FontAwesomeIcon icon={permissionItem.icon} />
               <span>{permissionItem.name}</span>
            </div>
         </div>
         <button
            disabled={!havePhoto && !haveText}
            className="px-4 py-2 text-xs w-full xs:w-fit rounded-full text-white bg-blue-600 disabled:cursor-not-allowed 
                     disabled:bg-slate-200 disabled:text-slate-400 dark:disabled:bg-slate-700 hover:bg-blue-700 transition-02"
            onClick={() => onSubmit()}
         >
            پست کردن
         </button>
      </div>
   );
}

export default CreatePostModalFooter;
