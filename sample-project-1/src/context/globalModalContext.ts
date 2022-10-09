import React from "react";

type GlobalModalContextType = {
   showModal: any;
   hideModal: any;
   isHideGlobalModal: boolean;
};

export const GlobalModalContext = React.createContext<GlobalModalContextType>({} as GlobalModalContextType);
