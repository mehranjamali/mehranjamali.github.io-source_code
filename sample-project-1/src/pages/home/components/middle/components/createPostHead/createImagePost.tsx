import { useState, useEffect, useRef } from "react";

// redux
import { useDispatchHook, useSelectorHook, RootState } from "../../../../../../store/hooks/useHooks";
import {
   createPostModalWriteStateCommand,
   createPostModalReadStateSelector,
} from "../../../../../../store/slices/uiController";

// context
import { useModal } from "../../../../../../context/globalModal/globalModalContext";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

// components
import CreatePostModal from "./createPostModal";

function CreateImagePost() {
   const dispatch = useDispatchHook();
   const uiState = useSelectorHook((state: RootState) => createPostModalReadStateSelector(state));

   // modal context
   const modal = useModal();

   const selectPhotoInput = useRef<any>(null);

   // state
   const [photo, setPhoto] = useState<any>(null);
   // const [photo, setPhoto] = useState<File | null>(null);

   // clear local state & clear input[type="file"] & focus on input
   useEffect(() => {
      if (modal.isHideGlobalModal) {
         selectPhotoInput.current.value = null;
         setPhoto(null);
      } else {
         selectPhotoInput.current.click();
      }
   }, [modal.isHideGlobalModal]);

   // handle file input change
   const handleFileInputChange = (e: any) => {
      if (e?.target.files && e?.target.files[0]) {
         // only photo url
         setPhoto(URL.createObjectURL(e.target.files[0]));
      }
   };

   // close modal
   const closeModal = () => {
      modal.hideModal();
   };

   const handleSendImage = () => {
      if (photo) {
         dispatch(createPostModalWriteStateCommand({ ...uiState, photo: photo, needDiscard: true }));
         modal.showModal(<CreatePostModal photo={photo} />);
      }
   };

   return (
      <div className="w-full text-slate-700 dark:text-slate-200">
         <div
            data-name="image-post-modal-header"
            className="flex flex-row items-center gap-2 pb-4 pr-4 border-b dark:border-slate-700"
         >
            <span>افزودن تصویر</span>
         </div>
         <div data-name="image-post-modal-container" className="">
            <div data-name="image-post-modal-body" className="max-h-96 overflow-y-auto">
               <div data-name="select-photo-box" className={`${photo && "hidden"} py-6`}>
                  {/* add-image-label */}
                  <label
                     htmlFor="selectPhoto"
                     className="add-image-label relative cursor-pointer h-full flex justify-center items-center gap-3"
                  >
                     {/* add-image-toLeft-arrow */}
                     <FontAwesomeIcon
                        className="add-image-toLeft-arrow absolute right-0 text-xl dark:text-slate-400 text-slate-500"
                        icon={faAngleLeft}
                     />

                     {/* add-image-toRight-arrow */}
                     <FontAwesomeIcon
                        className="add-image-toRight-arrow absolute left-0 text-xl dark:text-slate-400 text-slate-500"
                        icon={faAngleRight}
                     />

                     {/* add-image-text */}
                     <span className="add-image-text absolute text-xs -ml-2 dark:text-slate-400 text-slate-500">
                        انتخاب کردن تصویر
                     </span>

                     {/* add-image-icon */}
                     <FontAwesomeIcon
                        icon={faFileCirclePlus}
                        className="add-image-icon text-5xl dark:text-slate-400 text-slate-500"
                     />
                  </label>
                  <input
                     ref={selectPhotoInput}
                     type="file"
                     id="selectPhoto"
                     className="hidden"
                     accept="image/*"
                     onChange={(e) => handleFileInputChange(e)}
                  />
               </div>
               <div
                  data-name="photo-box"
                  className={`${
                     !photo && "hidden"
                  } w-full h-full flex justify-center items-center overflow-x-hidden overflow-hidden shadow-lg text-0`}
               >
                  <img src={photo} alt="" className="w-full h-full object-cover pointer-events-none" />
                  {/* <img
                     src={`${process.env.REACT_APP_IMG_PUBLIC_PATH}${photo?.name}`}
                     alt=""
                     className="w-full h-full"
                  /> */}
               </div>
            </div>
            <div
               data-name="image-post-modal-footer"
               className="flex flex-row-reverse gap-2 text-sm border-t dark:border-slate-700 pb-0.5 pt-2.5 px-3"
            >
               <button
                  disabled={!photo}
                  className="disabled:cursor-not-allowed disabled:bg-gray-200 dark:disabled:bg-slate-600 dark:disabled:text-slate-400 
                           disabled:text-slate-400 disabled:shadow-none text-sm py-1 px-3 shadow-md rounded-full bg-blue-600 text-white"
                  onClick={() => handleSendImage()}
               >
                  انجام
               </button>
               <button
                  className="text-sm border-2 border-blue-500 px-3 pt-1 rounded-full text-blue-500 hover:bg-blue-100 dark:hover:bg-slate-700 transition-03"
                  onClick={() => closeModal()}
               >
                  انصراف
               </button>
            </div>
         </div>
      </div>
   );
}

export default CreateImagePost;
