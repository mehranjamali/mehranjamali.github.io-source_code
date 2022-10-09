import { useEffect, useState } from "react";

import { reasonType, reportPostReasonsListType } from "../../../../../../../store/slices/fakePost";

import RadioInput from "../../../../../../../components/input/radioInput";

type ReportPostSubContainerPropsType = {
   showReportPostSubContainer: boolean;
   reason?: reportPostReasonsListType | null;
   submitReportPostReason: (reason: reasonType) => void;
   onHideSubContainer: () => void;
   setReason: React.Dispatch<React.SetStateAction<reportPostReasonsListType | null>>;
   post: any;
};

function ReportPostSubContainer({
   reason,
   showReportPostSubContainer,
   submitReportPostReason,
   onHideSubContainer,
   setReason,
   post,
}: ReportPostSubContainerPropsType) {
   // use state
   const [subReason, setSubReason] = useState<reasonType | null>(null);
   // use effect
   useEffect(() => {
      if (!showReportPostSubContainer) {
         setSubReason(null);
      }
      if (!reason?.id) {
         onHideSubContainer();
      }
   }, [showReportPostSubContainer, reason?.id, onHideSubContainer]);

   //    handle submit
   const handleSubReasonSubmit = () => {
      if (subReason) {
         submitReportPostReason(subReason);
         onHideSubContainer();
         setSubReason(null);
      }
   };

   return (
      <div data-name="report-post-sub-container" className={`${!showReportPostSubContainer && "hidden"}`}>
         <div data-name="report-post-sub-container-body" className="mt-4">
            <div className="py-2">
               <p className="text-sm">{reason?.title}</p>
            </div>
            <div className="flex flex-col justify-center text-sm gap-0.5 py-4 pb-3 text-slate-500 dark:text-slate-300">
               {reason?.reasons.map((item: reasonType, index: number) => {
                  return (
                     <RadioInput
                        key={index}
                        id={`reportPostReason${item.id}-post${post.id}`}
                        checked={subReason?.id === item.id}
                        value={item.id}
                        handleChange={() => {
                           setSubReason({ id: item.id, reason: item.reason, desc: item.desc });
                        }}
                        customClassName="w-4 h-4"
                     >
                        {item.reason}
                     </RadioInput>
                  );
               })}
            </div>
         </div>
         <div data-name="report-post-sub-container-footer" className="border-t dark:border-slate-700 pt-2">
            <div className="flex flex-row-reverse gap-3 text-sm">
               <button
                  disabled={!subReason?.id}
                  className="disabled:cursor-not-allowed disabled:bg-gray-200 dark:disabled:bg-slate-600 dark:disabled:text-slate-400 
                  disabled:text-slate-400 disabled:shadow-none text-sm pt-0.5 px-3 shadow-md rounded-full bg-blue-600 text-white"
                  onClick={() => {
                     handleSubReasonSubmit();
                  }}
               >
                  ارسال
               </button>
               <button
                  className="text-sm border-2 border-blue-500 px-3 pt-1 rounded-full text-blue-500 hover:bg-blue-100 dark:hover:bg-slate-700 transition-03"
                  onClick={() => {
                     onHideSubContainer();
                     setSubReason(null);
                  }}
               >
                  بازگشت
               </button>
            </div>
         </div>
      </div>
   );
}

export default ReportPostSubContainer;
