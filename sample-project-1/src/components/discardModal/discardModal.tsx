// FontAwesome icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

type discardModalPropsType = {
   doHideGlobalModal: () => void;
   isHideDiscardModal: boolean;
   setIsHideDiscardModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function DiscardModal({ doHideGlobalModal, isHideDiscardModal, setIsHideDiscardModal }: discardModalPropsType) {
   // do close all
   const doCloseAll = () => {
      setIsHideDiscardModal(true);
      doHideGlobalModal();
   };

   return (
      <div
         className={`Modal__bg-height w-full fixed inset-0 flex items-center justify-center z-110 ${
            isHideDiscardModal && "hidden"
         }`}
      >
         {/* modal bg */}
         <div
            className="absolute inset-0 dark:bg-slate-900/60 bg-slate-900/60 z-120"
            onClick={() => {
               setIsHideDiscardModal(true);
            }}
         ></div>
         {/* modal content */}
         <div
            className="Modal-discard absolute p-4 pb-2 rounded-md border dark:border-slate-700 border-slate-500
                     dark:bg-slate-800 bg-white shadow-md dark:shadow-slate-900 shadow-slate-600 z-130"
         >
            {/* X icon top-left */}
            <button
               onClick={() => {
                  setIsHideDiscardModal(true);
               }}
               className="absolute text-slate-600 dark:text-slate-200 text-lg top-3 left-2 bg-white dark:bg-slate-800 p-1 pb-0"
            >
               <FontAwesomeIcon icon={faX} />
            </button>
            {/* discard modal container */}
            <div data-name="discard-modal-container" className="w-full text-slate-700 dark:text-slate-200">
               <div
                  data-name="discard-modal-header"
                  className="flex flex-row items-center gap-2 pb-4 pl-6  border-b dark:border-slate-700"
               >
                  <h4>خروج</h4>
               </div>
               <div data-name="discard-modal-content">
                  <div data-name="discard-modal-body" className="py-4 text-sm">
                     <p>آیا از خروج مطمئن هستید؟</p>
                     <p className="pt-2 text-sm text-red-500">پستی که شروع کرده بودید پاک خواهد شد.</p>
                  </div>
                  <div
                     data-name="discard-modal-footer"
                     className="flex flex-row-reverse gap-2 text-sm border-t dark:border-slate-700 py-0.5 pt-2.5"
                  >
                     <button
                        onClick={() => doCloseAll()}
                        className="border border-red-500 text-red-500 px-3 py-1 rounded-full hover:text-white hover:bg-red-500 transition-03"
                     >
                        مطمئن هستم
                     </button>
                     <button
                        onClick={() => setIsHideDiscardModal(true)}
                        className="border border-blue-500 text-blue-500 px-3 py-1 rounded-full hover:text-white hover:bg-blue-500 transition-03"
                     >
                        انصراف
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default DiscardModal;
