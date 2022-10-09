/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useReducer } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import Input from "./inputDefault";
import _ from "lodash";

type optionType = { label: any; data: any };

type SelectInputPropsType = {
   addClassNameInput?: string;
   addClassNameLabel?: string;
   addClassNameIcon?: string;
   addClassNameSelectedValueBox?: string;
   label?: string;
   other?: any;
   selected?: any;
   required?: boolean;
   options: optionType[];
   getSelectedItems: any;
   generateSelectedItem: any;
   searchPath?: string;
};

// reducer
const reducer = (state: selectStateType, action: selectActionType): selectStateType => {
   switch (action.type) {
      case "itemSelected":
         return {
            ...state,
            selectedItems: [...state.selectedItems, action.payload],
            dropdownItems: state.dropdownItems.filter((item: optionType) => item.data.id !== action.payload.data.id),
         };
      case "itemUnselected":
         return {
            ...state,
            selectedItems: state.selectedItems.filter((item: optionType) => item.data.id !== action.payload.data.id),
            dropdownItems: [...state.dropdownItems, action.payload],
         };
      case "itemsFiltered":
         return {
            ...state,
            filteredItems: !action.payload.query
               ? [...state.dropdownItems]
               : state.dropdownItems.filter((item: optionType) =>
                    _.get(item.data, action.payload.searchPath)
                       .toLowerCase()
                       .includes(action.payload.query.toLowerCase())
                 ),
         };

      case "setInitial":
         return { ...action.payload };
      default:
         return state;
   }
};

type selectActionType = {
   type: string;
   payload: any;
};

type selectStateType = {
   allItems: optionType[];
   selectedItems: optionType[];
   dropdownItems: optionType[];
   filteredItems: optionType[];
};

function Select({
   label,
   addClassNameInput,
   addClassNameLabel,
   addClassNameIcon,
   addClassNameSelectedValueBox,
   required,
   options,
   other,
   selected,
   getSelectedItems,
   generateSelectedItem,
   searchPath,
}: SelectInputPropsType) {
   // set Dropdown Items
   const setDropdownItems = () => {
      return options.filter((item: optionType) => {
         let i: any;
         let doFilterOnItemFlag: boolean = false;
         for (i of selected) {
            if (i.data.id === item.data.id) doFilterOnItemFlag = true;
         }
         if (!doFilterOnItemFlag) return item;
      });
   };
   // initial State
   const initialState: selectStateType = {
      allItems: options,
      selectedItems: selected,
      dropdownItems: setDropdownItems(),
      filteredItems: setDropdownItems(),
   };
   // state
   const [dropdownIsHide, setDropdownIsHide] = useState<boolean>(true);
   const [state, dispatch] = useReducer(reducer, initialState);

   // select item
   const handleSelectItem = (item: optionType) => {
      dispatch({ type: "itemSelected", payload: item });
   };

   // unselect item
   const handleUnselectItem = (item: optionType) => {
      dispatch({ type: "itemUnselected", payload: item });
   };

   // set Initial
   useEffect(() => {
      dispatch({ type: "setInitial", payload: initialState });
   }, [selected]);

   // dropdown
   // useEffect(() => {
   //    window.addEventListener("click", () => setDropdownIsHide(true));
   //    return () => {
   //       window.removeEventListener("click", () => setDropdownIsHide(true));
   //    };
   // });

   // itemsFiltered default
   useEffect(() => {
      if (dropdownIsHide) dispatch({ type: "itemsFiltered", payload: { searchPath: searchPath, query: "" } });
   }, [dropdownIsHide]);

   // state & getSelectedItems
   useEffect(() => {
      getSelectedItems(state.selectedItems);
   }, [state.dropdownItems]);

   // dropdown handle input click
   const handleInputClick = (event: any) => {
      event.stopPropagation();
      setDropdownIsHide(!dropdownIsHide);
   };

   // handle search input
   const handleSearchInput = (event: any) => {
      dispatch({ type: "itemsFiltered", payload: { searchPath: searchPath, query: event.target.value } });
   };

   // generate input border-bottom
   const generateInputBorder = () => {
      return " pb-1 border-b dark:border-slate-600 ";
   };
   // generate Input Style After Dropdown Active
   const generateInputStyleAfterDropdownActive = () => {
      return "rounded-tl-md rounded-tr-md border-slate-500 dark:border-slate-300 ";
   };
   // generate Focus Style
   const generateFocusStyle = () => {
      return !dropdownIsHide && "border-slate-500 dark:border-slate-300";
   };

   return (
      <div data-name="select-box-container" className="relative w-full h-fit">
         {/* input container */}
         <div
            data-name="select-box-input-container"
            className={`text-sm border  dark:border-slate-600 dark:bg-slate-800 w-full peer outline-none 
                           flex flex-col items-start justify-between cursor-pointer h-fit  ${
                              !dropdownIsHide ? generateInputStyleAfterDropdownActive() : "rounded-md"
                           } ${addClassNameInput} `}
            onClick={(e: any) => handleInputClick(e)}
         >
            {/* select box input */}
            <div
               data-name="select-box-input"
               className={`flex flex-row justify-between w-full pl-1 ${
                  state.selectedItems?.length && generateInputBorder()
               } ${generateFocusStyle()} `}
               // !!!!!!!!!!!!!!!!!!?????????????????????????????
            >
               {/* label */}
               <div
                  data-name="select-box-label"
                  className={`relative mt-1.5 pl-1 pr-2  ${!label && "hidden"} ${addClassNameLabel}  `}
               >
                  {label} :<span className={`absolute right-0 top-0 -mt-2 ${!required && "hidden"}`}>*</span>
               </div>
               {/* icon angle */}
               <div
                  data-name="select-box-icon"
                  className={` flex items-center border-l dark:border-slate-600 pl-1.5  ${addClassNameIcon} `}
               >
                  <FontAwesomeIcon
                     icon={faAngleDown}
                     className={` transition-01 ${!dropdownIsHide && "rotate-180"} `}
                  />
               </div>
            </div>
            {/* selected value */}
            <div
               data-name="select-box-selected-values"
               className={` flex items-center justify-start flex-wrap gap-2 flex-1 px-2 pb-1 ${
                  !state.selectedItems?.length ? "hidden" : "pt-2"
               } ${addClassNameSelectedValueBox} `}
            >
               {state.selectedItems.map((option: optionType, index: number) => {
                  return (
                     <div
                        key={index}
                        className="flex flex-row justify-between items-center gap-2 py-1 px-1.5 rounded-md border 
                              border-slate-300 dark:border-slate-600 bg-gray-100 dark:bg-slate-700 "
                        onClick={(event: any) => {
                           event.stopPropagation();
                           handleUnselectItem(option);
                        }}
                     >
                        <div className="-mb-0.5">{generateSelectedItem(option.data)}</div>
                        <FontAwesomeIcon icon={faXmark} className="text-slate-500 dark:text-slate-400" />
                     </div>
                  );
               })}
            </div>
         </div>
         {/* dropdown menu */}
         <div className={`relative w-full ${!state.dropdownItems.length && "hidden"}`}>
            <div
               data-name="select-box-dropdown-menu"
               className={`absolute flex flex-col w-full border dark:border-slate-600 border-t-0 p-1 max-h-52 overflow-y-auto 
                           rounded-br-md rounded-bl-md bg-gray-100 dark:bg-slate-700 z-40 shadow-2xl dark:shadow-slate-900 
                           ${dropdownIsHide && "hidden"} ${generateFocusStyle()}`}
            >
               {/* search input */}
               <div className="p-1">
                  <Input
                     addClassNameInput=" px-2 py-1 text-slate-500 dark:text-slate-400 "
                     placeholder="Search"
                     other={{
                        onChange: (e: any) => handleSearchInput(e),
                     }}
                  />
               </div>

               {state.filteredItems.map((option: optionType, index: number) => {
                  return (
                     <div
                        key={index}
                        onClick={() => {
                           handleSelectItem(option);
                        }}
                     >
                        {option.label}
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
}

export type { optionType };
export default Select;
