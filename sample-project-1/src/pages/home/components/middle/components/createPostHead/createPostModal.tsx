import { useContext, useEffect, useMemo, useRef, useState } from "react";

// redux
import { RootState, useDispatchHook, useSelectorHook } from "../../../../../../store/hooks/useHooks";
// -- ui controller
import {
   createPostModalClearStateCommand,
   createPostModalReadStateSelector,
   createPostModalWriteStateCommand,
   uiStateType,
} from "../../../../../../store/slices/uiController";
// -- main post
import { addMainPostCommand } from "../../../../../../store/slices/fakePost";
// -- user
import { userAuthReadStateSelector, userAuthType } from "../../../../../../store/slices/user";

// FontAwesomeIcon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarth, faAngleLeft, faPeopleGroup, faLock, faPerson, faXmark } from "@fortawesome/free-solid-svg-icons";

// components
import CreatePostModalFooter from "./createPostModalFooter";
import CreateImagePost from "./createImagePost";

// context
import { GlobalModalContext } from "../../../../../../context/globalModalContext";

type CreatePostModalPorpsType = {
   photo?: any;
};

const initianlPermissionItem = {
   id: 0,
   name: "همه",
   icon: faEarth,
};

function CreatePostModal({ photo }: CreatePostModalPorpsType) {
   // context
   const modal = useContext(GlobalModalContext);

   // state
   const [showPermissionDD, setShowPermissionDD] = useState<boolean>(false);
   const [permissionItem, setPermissionItem] = useState<typeof initianlPermissionItem>(initianlPermissionItem);
   const [textContent, setTextContent] = useState<string>("");
   const [clearImage, setClearImage] = useState<boolean>(false);

   const dispatch = useDispatchHook();
   const uiState: uiStateType["createPostModal"] = useSelectorHook((state: RootState) =>
      createPostModalReadStateSelector(state)
   );
   const userState: userAuthType = useSelectorHook((state: RootState) => userAuthReadStateSelector(state));

   // ref
   const textarea = useRef<any | null>(null);

   // use effect
   useEffect(() => {
      // if we have initial text in redux store then fetch it
      uiState.text ? setTextContent(uiState.text) : setTextContent("");
   }, [uiState]);

   // handle dd
   const handleShowPermissonDD = () => {
      setTimeout(() => {
         setShowPermissionDD(!showPermissionDD);
      }, 100);
   };

   // handle permission item
   const handlePermissionItem = (item: typeof initianlPermissionItem) => {
      if (item.id === permissionItem.id) return handleShowPermissonDD();
      setTimeout(() => {
         setPermissionItem(item);
      }, 100);
      handleShowPermissonDD();
   };

   // check selected permission item
   const checkSelectedItem = useMemo(() => {
      return (id: number) => id === permissionItem.id && "text-sky-400 ";
   }, [permissionItem]);

   // handle textarea grow
   const handleTextareaGrow = (e: any) => {
      e.target.rows = e.target.value.split("\n").length <= 5 ? 5 : e.target.value.split("\n").length;
      setTextContent(e.target.value);
      // // we have "text" , "photo"
      // // dispatch just one time
      if (e.target.value || (uiState.photo && photo)) {
         if (!uiState.needDiscard) {
            dispatch(
               createPostModalWriteStateCommand({
                  text: e.target.value,
                  rows: e.target.rows,
                  photo: photo,
                  needDiscard: true,
               })
            );
         }
      }
      // we don't have "text" , "photo"
      // dispatch just one time
      else {
         if (uiState.needDiscard) {
            dispatch(
               createPostModalWriteStateCommand({
                  text: "",
                  rows: 5,
                  photo: "",
                  needDiscard: false,
               })
            );
         }
      }
   };

   // handle submit post
   const handleSubmitPost = () => {
      if (photo || textContent) {
         dispatch(addMainPostCommand({ imgUrl: photo ? photo : "", text: textContent ? textContent : "" }));
         if (userState.accessToken) {
            dispatch(createPostModalClearStateCommand());
            modal.hideModal(true);
         }
      }
   };

   // handle change modal (draft)
   const handleChangeModal = () => {
      if (textContent) {
         dispatch(
            createPostModalWriteStateCommand({
               text: textContent,
               rows: textContent.split("\n").length <= 5 ? 5 : textContent.split("\n").length,
               photo: "",
               needDiscard: true,
            })
         );
      }
      modal.showModal(<CreateImagePost />);
   };

   // handle clear image
   const handleClearImage = () => {
      setClearImage(true);
      dispatch(
         createPostModalWriteStateCommand({
            text: textContent,
            rows: textContent.split("\n").length <= 5 ? 5 : textContent.split("\n").length,
            photo: "",
            needDiscard: textContent ? true : false,
         })
      );
   };

   return (
      <div data-name="create-post-modal" className="text-slate-700 dark:text-slate-200">
         {/* header */}
         <div
            data-name="create-post-modal-header"
            className="flex flex-row items-center gap-2 pb-4 pr-4 border-b dark:border-slate-700"
         >
            <span className="text-base">ایجاد کردن یک پست</span>
         </div>
         {/* container */}
         <div data-name="create-post-modal-container" className="">
            {/* body */}
            <div data-name="create-post-modal-body" className="max-h-96 overflow-hidden overflow-y-auto">
               <div data-name="create-post-modal-text-content" className="p-4 pb-0">
                  {/* create-post-modal-user */}
                  <div data-name="create-post-modal-user" className="flex flex-row gap-3 w-11/12">
                     <img
                        src={process.env.REACT_APP_USER_IMG_URL}
                        className="object-cover rounded-full w-12 h-12 bg-slate-200 dark:bg-slate-600 text-xs text-slate-400"
                        alt="post-user-img"
                     />
                     <div className="relative text-xs w-10/12">
                        <p className="text-sm text-slate-700 dark:text-slate-100 text-ellipsis whitespace-nowrap overflow-hidden">
                           مهران جمالی
                        </p>
                        {/* selected Permission item */}
                        <button
                           className="py-1 px-3 mt-1 -mr-1 w-24 text-slate-500 dark:text-slate-300 border border-slate-400 
                                       rounded-full flex justify-between items-center gap-1.5"
                           onClick={() => handleShowPermissonDD()}
                        >
                           <FontAwesomeIcon icon={permissionItem.icon} />
                           <span className="pt-0.5">{permissionItem.name}</span>
                           <FontAwesomeIcon
                              icon={faAngleLeft}
                              className={`${showPermissionDD ? "-rotate-90" : "rotate-0"} transition-01`}
                           />
                        </button>
                        <div
                           className={`absolute right-0 w-36 h-32 overflow-hidden -mr-1 pt-1 z-130 ${
                              !showPermissionDD && "hidden"
                           }`}
                        >
                           {/* dd items box */}
                           <div
                              className="bg-white dark:bg-slate-800 shadow-xl py-2 px-3 border border-slate-200 dark:border-slate-700 
                                          rounded-md flex flex-col justify-center items-start text-slate-500 dark:text-slate-300"
                           >
                              {/* dd item anyone */}
                              <button
                                 className={`flex justify-start items-center gap-2 py-1 cursor-pointer hover:text-sky-400 transition-03 w-full 
                                             hover:gap-3 hover:pr-2 hover:bg-slate-200 dark:hover:bg-slate-700 hover:rounded-md 
                                             ${checkSelectedItem(0)}`}
                                 onClick={() => handlePermissionItem(initianlPermissionItem)}
                              >
                                 <FontAwesomeIcon icon={faAngleLeft} />
                                 <FontAwesomeIcon icon={faEarth} />
                                 <span>همه</span>
                              </button>

                              {/* dd item Friends */}
                              <button
                                 className={`flex justify-start items-center gap-2 py-1 cursor-pointer hover:text-sky-400 transition-03 w-full 
                                 hover:gap-3 hover:pr-2 hover:bg-slate-200 dark:hover:bg-slate-700 hover:rounded-md
                                 ${checkSelectedItem(1)}`}
                                 onClick={() => handlePermissionItem({ id: 1, name: "دوستان", icon: faPeopleGroup })}
                              >
                                 <FontAwesomeIcon icon={faAngleLeft} />
                                 <FontAwesomeIcon icon={faPeopleGroup} />
                                 <span>دوستان</span>
                              </button>

                              {/* dd item Person */}
                              <button
                                 className={`flex justify-start items-center gap-2 py-1 cursor-pointer hover:text-sky-400 transition-03 w-full 
                                 hover:gap-3 hover:pr-2 hover:bg-slate-200 dark:hover:bg-slate-700 hover:rounded-md 
                                 ${checkSelectedItem(2)}`}
                                 onClick={() => handlePermissionItem({ id: 2, name: "یک نفر", icon: faPerson })}
                              >
                                 <FontAwesomeIcon icon={faAngleLeft} />
                                 <FontAwesomeIcon icon={faPerson} />
                                 <span>یک نفر</span>
                              </button>

                              {/* dd item Private */}
                              <button
                                 className={`flex justify-start items-center gap-2 py-1 cursor-pointer hover:text-sky-400 transition-03 w-full 
                                 hover:gap-3 hover:pr-2 hover:bg-slate-200 dark:hover:bg-slate-700 hover:rounded-md 
                                 ${checkSelectedItem(3)}`}
                                 onClick={() => handlePermissionItem({ id: 3, name: "شخصی", icon: faLock })}
                              >
                                 <FontAwesomeIcon icon={faAngleLeft} />
                                 <FontAwesomeIcon icon={faLock} />
                                 <span>شخصی</span>
                              </button>
                           </div>
                           {/* end of ---> dd items box */}
                        </div>
                     </div>
                  </div>
                  {/* end of ---> create-post-modal-user */}

                  {/* create-post-modal-write-content */}
                  <div
                     data-name="create-post-modal-write-content"
                     className="create-post-modal-write-content pt-4 h-full"
                  >
                     <textarea
                        ref={textarea}
                        name=""
                        id=""
                        value={textContent}
                        placeholder="در مورد چه چیزی میخواهی بنویسی ؟"
                        className="w-full h-full text-sm resize-none outline-none overflow-hidden focus:px-3
                        bg-white dark:bg-slate-800 transition-03"
                        onChange={(e) => handleTextareaGrow(e)}
                        rows={uiState?.rows ? uiState?.rows : 5}
                     ></textarea>
                     {/* textarea focus border right */}
                     <div className="right-border-textarea flex justify-center items-center">
                        <div className="bg-slate-300 dark:bg-slate-600"></div>
                     </div>
                  </div>
                  {/* end of ---> create-post-modal-write-content */}
               </div>
               <div data-name="create-post-modal-image-content" className="pb-4">
                  <div
                     data-name="image-box"
                     className={`relative h-full w-full flex justify-center items-center p-4 pb-0 rounded-md ${
                        clearImage ? "hidden" : !photo && "hidden"
                     }`}
                  >
                     <button
                        onClick={() => handleClearImage()}
                        className="absolute top-5 left-5 bg-slate-700 px-2.5 pt-1.5 rounded-full text-center text-white hover:bg-slate-900 transition-03"
                     >
                        <FontAwesomeIcon icon={faXmark} />
                     </button>
                     <img src={photo} alt="" className={`w-full h-full object-cover rounded-md`} />
                  </div>
               </div>
            </div>
            {/* footer */}
            <CreatePostModalFooter
               permissionItem={permissionItem}
               onSubmit={handleSubmitPost}
               haveText={textContent ? true : false}
               havePhoto={clearImage ? false : photo ? true : false}
               onChangeModal={handleChangeModal}
            />
            {/* end of ---> footer */}
         </div>
      </div>
   );
}

export default CreatePostModal;
