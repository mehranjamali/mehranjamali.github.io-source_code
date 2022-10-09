import React, { useEffect, useState } from "react";

// Components
import RadioInput from "../../../../../../../components/input/radioInput";

// FontAwesome icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

import { reasonType } from "../../../../../../../store/slices/fakePost";

type hidePostContainerPropsType = {
   showHidePostReasonContainer: boolean;
   submitHidePostReason: (reason: reasonType) => void;
   setShowHidePostReasonContainer: React.Dispatch<React.SetStateAction<boolean>>;
   hidePostReasonsList: reasonType[];
   post: any;
};

function HidePostReasonContainer({
   showHidePostReasonContainer,
   setShowHidePostReasonContainer,
   submitHidePostReason,
   hidePostReasonsList,
   post,
}: hidePostContainerPropsType) {
   // hooks
   const [reason, setReason] = useState<reasonType | null>(null);

   useEffect(() => {
      if (!showHidePostReasonContainer) {
         setReason(null);
      }
   }, [showHidePostReasonContainer]);

   return (
      <div data-name="hide-post-container" hidden={!showHidePostReasonContainer}>
         {/* bg */}
         <div
            data-name="hide-post-container-bg"
            className="absolute inset-0 bg-white dark:bg-slate-800 rounded-md"
         ></div>

         <div data-name="hide-post-container-container" className="absolute inset-0 p-2 flex flex-col gap-1">
            {/* container */}
            {/* header */}
            <div
               data-name="hide-post-container-header"
               className="flex flex-row justify-between items-center border-b border-slate-300 dark:border-slate-600 pb-2"
            >
               <div className="text-base flex flex-row items-center gap-2">
                  <FontAwesomeIcon icon={faEyeSlash} className="w-5"></FontAwesomeIcon>
                  <p>این پست را برای من نمایش نده</p>
               </div>
               <button
                  className="pr-0.5 pl-2.5 pt-1 align-middle text-center text-base transition-03 hover:pr-2.5 hover:pl-0.5"
                  onClick={() => setShowHidePostReasonContainer(false)}
               >
                  <FontAwesomeIcon icon={faArrowLeftLong} />
               </button>
            </div>
            {/* end of => header */}

            {/* body */}
            <div data-name="hide-post-container-body" className="bg-slate- py-2 overflow-y-auto mb-10">
               <div>
                  <p className="text-sm pb-1">دلیل خود را برای ما ارسال کنید</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                     بازخورد شما به ما کمک می کند تا تجربه شما را بهبود ببخشیم
                  </p>
               </div>
               <div className="flex flex-col text-sm pt-4 text-slate-500 dark:text-slate-400">
                  {hidePostReasonsList.map((item: reasonType, index: number) => {
                     return (
                        <RadioInput
                           key={index}
                           id={`hidePostReason${item.id}-post${post.id}`}
                           checked={reason?.id === item.id}
                           value={item.id}
                           handleChange={() => {
                              setReason({ id: item.id, reason: item.reason });
                           }}
                           customClassName="w-4 h-4"
                        >
                           {item.reason}
                        </RadioInput>
                     );
                  })}
               </div>
            </div>
            {/* end of => body */}

            {/* footer */}
            <div
               data-name="hide-post-container-footer"
               className="absolute bottom-2 left-2 right-2 flex flex-row-reverse pt-2 bg-white 
               dark:bg-slate-800 border-t border-slate-300 dark:border-slate-600"
            >
               <button
                  disabled={!reason?.id}
                  onClick={() => {
                     reason?.id && submitHidePostReason(reason);
                  }}
                  className="text-sm py-1 px-3 shadow-md rounded-full bg-blue-600 text-white disabled:cursor-not-allowed disabled:bg-gray-200 
                 dark:disabled:bg-slate-600 dark:disabled:text-slate-400 disabled:text-slate-400 disabled:shadow-none"
               >
                  ارسال
               </button>
            </div>
            {/* end of => footer */}
         </div>
      </div>
   );
}

export default React.memo(HidePostReasonContainer);
