import { useState } from "react";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faX } from "@fortawesome/free-solid-svg-icons";

type DeleteItemPropsType = {
   item: any;
   parent?: any;
   onDelete: (item: any, parent: any) => void;
   extraClassNameToTrashBtn?: string;
   extraClassNameTobox?: string;
   extraClassNameToXBtn?: string;
   extraClassNameToCheckBtn?: string;
};

function DeleteItem({
   item,
   parent,
   onDelete,
   extraClassNameToTrashBtn,
   extraClassNameTobox,
   extraClassNameToXBtn,
   extraClassNameToCheckBtn,
}: DeleteItemPropsType) {
   // confirm authorBlock delete box
   const [showConfirmDeleteBox, setShowConfirmDeleteBox] = useState<boolean>(false);

   // handle confirm authorBlock delete box
   const handleConfirmDeleteBox = () => {
      setShowConfirmDeleteBox(!showConfirmDeleteBox);
   };
   return (
      <div>
         {!showConfirmDeleteBox ? (
            <button
               onClick={() => {
                  handleConfirmDeleteBox();
               }}
               className={`hover:text-blue-500 dark:hover:text-blue-500 transition-02 text-slate-500 dark:text-slate-300 ${extraClassNameToTrashBtn}`}
            >
               <FontAwesomeIcon icon={faTrash} />
            </button>
         ) : (
            <div className={`flex flex-row justify-between items-center ${extraClassNameTobox}`}>
               <button
                  className={`transition-02 border border-red-600 
                           text-red-600 hover:text-white hover:bg-red-600 dark:hover:bg-red-600 rounded-2xl ${extraClassNameToXBtn}`}
                  onClick={() => {
                     handleConfirmDeleteBox();
                  }}
               >
                  <FontAwesomeIcon icon={faX} className="w-3 h-3" />
               </button>
               <button
                  className={`transition-02 border border-green-600
                           text-green-600 hover:text-white hover:bg-green-600 dark:hover:bg-green-600 rounded-2xl ${extraClassNameToCheckBtn}`}
                  onClick={() => {
                     onDelete(item, parent);
                  }}
               >
                  <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
               </button>
            </div>
         )}
      </div>
   );
}

export default DeleteItem;
