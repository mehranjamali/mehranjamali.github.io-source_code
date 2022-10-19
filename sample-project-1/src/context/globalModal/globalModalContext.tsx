import React, { useContext, useState } from "react";

// redux
// -- hooks
import { useDispatchHook, useSelectorHook, RootState } from "../../store/hooks/useHooks";
// -- slice ui controller
import {
   createPostModalReadStateSelector,
   createPostModalClearStateCommand,
   uiStateType,
} from "../../store/slices/uiController";

// modals
import GlobalModal from "../../components/globalModal/globalModal";
import DiscardModal from "../../components/globalModal/discardModal";

// context
// -- type
type GlobalModalContextType = {
   showModal: any;
   hideModal: any;
   isHideGlobalModal: boolean;
};
// -- context obj
const GlobalModalContext = React.createContext<GlobalModalContextType>({} as GlobalModalContextType);

// type
type GlobalModalContextComponentPropsType = {
   value?: any;
   children: any;
};

// need body beacuse of modal
const body = document.body;

// Global Modal Context Component
export default function GlobalModalProvider({ children, value }: GlobalModalContextComponentPropsType) {
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
      <GlobalModalContext.Provider
         value={{
            showModal: (content: any, needDiscard: boolean) => doShowGlobalModal(content),
            hideModal: (highLevel: boolean) => hideGlobalModalHandler(highLevel),
            isHideGlobalModal: isHideGlobalModal,
            ...value,
         }}
      >
         {children}
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
   );
}

// custom hook
export const useModal = () => useContext(GlobalModalContext);
