import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// redux
import { useDispatchHook, useSelectorHook, RootState } from "./store/hooks/useHooks";
import {
   createPostModalReadStateSelector,
   createPostModalClearStateCommand,
   uiStateType,
} from "./store/slices/uiController";
import { userAuthCheckTokenCommand } from "./store/slices/user";

// Routes
import Pages from "./pages/pages";

// components
import Navbar from "./components/navbar/navbar";
import { Slide, ToastContainer } from "react-toastify";
import GlobalModal from "./components/globalModal/globalModal";
import DiscardModal from "./components/discardModal/discardModal";

// context
import { GlobalModalContext } from "./context/globalModalContext";

// need body beacuse of modal
const body = document.body;

function App() {
   // modal state
   const [isHideGlobalModal, setIsHideGlobalModal] = useState<boolean>(true);
   const [isHideDiscardModal, setIsHideDiscardModal] = useState<boolean>(true);
   const [globalModalContent, setGlobalModalContent] = useState<any>(null);
   // selector
   const uiState: uiStateType["createPostModal"] = useSelectorHook((state: RootState) =>
      createPostModalReadStateSelector(state)
   );

   // dispatch
   const dispatch = useDispatchHook();

   // useEffect
   useEffect(() => {
      dispatch(userAuthCheckTokenCommand());
   }, [dispatch]);

   useEffect(() => {
      // console.log("App component re-rendered");
   });

   // do show Global Modal
   const doShowGlobalModal = (content: any) => {
      setIsHideGlobalModal(false);
      setGlobalModalContent(content);
      body.classList.add("overflow-y-hidden");
   };

   // hide Global Modal Handler
   const hideGlobalModalHandler = (highLevel: boolean = false) => {
      if (!uiState?.needDiscard || highLevel) return doHideGlobalModal();
      doShowDiscardModal();
   };

   // do hide Global Modal
   const doHideGlobalModal = () => {
      setIsHideGlobalModal(true);
      setGlobalModalContent(null);
      body.classList.remove("overflow-y-hidden");
      dispatch(createPostModalClearStateCommand());
   };

   // do show Discard Modal
   const doShowDiscardModal = () => {
      setIsHideDiscardModal(false);
   };

   return (
      <div
         className="flex flex-col justify-between items-center relative min-h-screen 
                    text-white w-full scrollbar"
      >
         <Router>
            <Navbar />
            {/* global-modal content */}
            <GlobalModalContext.Provider
               value={{
                  showModal: (content: any, needDiscard: boolean) => doShowGlobalModal(content),
                  hideModal: (highLevel: boolean) => hideGlobalModalHandler(highLevel),
                  isHideGlobalModal: isHideGlobalModal,
               }}
            >
               <Pages />
               {/* Global Modal */}
               <GlobalModal onClose={hideGlobalModalHandler} isHideGlobalModal={isHideGlobalModal}>
                  {globalModalContent}
               </GlobalModal>
               {/* Discard Modal */}
               <DiscardModal
                  doHideGlobalModal={doHideGlobalModal}
                  isHideDiscardModal={isHideDiscardModal}
                  setIsHideDiscardModal={setIsHideDiscardModal}
               />
            </GlobalModalContext.Provider>
            {/* Toaster */}
            <ToastContainer
               position="bottom-right"
               autoClose={1000}
               hideProgressBar={true}
               newestOnTop={false}
               closeOnClick
               rtl={true}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               transition={Slide}
               limit={4}
               bodyClassName={() =>
                  "text-sm text-right flex flex-row items-center font-white font-med p-3" +
                  "font-shabnam w-full text-slate-600 dark:text-slate-300 font-shabnam"
               }
            />
         </Router>
      </div>
   );
}

export default App;
