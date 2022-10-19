// FontAwesome icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

type globalModalPropsType = {
   isHideGlobalModal: boolean;
   onClose: () => void;
   children?: any;
};

function GlobalModal({ isHideGlobalModal, onClose, children }: globalModalPropsType) {
   return (
      <div
         className={`Modal__bg-height w-full fixed inset-0 flex items-center justify-center z-80 ${
            isHideGlobalModal && "hidden"
         }`}
      >
         {/* modal bg */}
         <div
            className="absolute inset-0 dark:bg-slate-900/60 bg-slate-900/60 z-90"
            onClick={() => {
               onClose();
            }}
         ></div>
         {/* modal content */}
         <div
            className="Modal absolute pt-4 pb-2 rounded-md border dark:border-slate-700 border-slate-500
                     dark:bg-slate-800 bg-white shadow-md dark:shadow-slate-900 shadow-slate-600 z-100"
         >
            <button
               onClick={() => {
                  onClose();
               }}
               className="absolute text-slate-600 dark:text-slate-200 text-lg top-3 left-2 bg-white dark:bg-slate-800 p-1 pb-0"
            >
               <FontAwesomeIcon icon={faX} />
            </button>
            <div>{children}</div>
         </div>
      </div>
   );
}

export default GlobalModal;
