import React, { useState, useEffect } from "react";
import { reasonType, reportPostReasonsListType } from "../../../../../../../store/slices/fakePost";
import { useModal } from "../../../../../../../context/globalModal/globalModalContext";

// FontAwesome icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag, faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

import ReportPostSubContainer from "./ReportPostSubContainer";

type ReportPostReasonContainerPropsType = {
   post: any;
   reportPostReasonsList: reportPostReasonsListType[];
   hideModal: any;
   submitReportPostReason: (reason: reasonType) => void;
   showHPRCAndHideReportModal: () => void;
};

const ReportPostReasonContainer = ({
   post,
   hideModal,
   reportPostReasonsList,
   submitReportPostReason,
   showHPRCAndHideReportModal,
}: ReportPostReasonContainerPropsType) => {
   const modal = useModal();
   // use state
   const [reason, setReason] = useState<reportPostReasonsListType | null>(null);
   const [showSubContainer, setShowSubContainer] = useState(false);

   const handleShowSubContainer = (item: reportPostReasonsListType) => {
      setShowSubContainer(true);
      setReason(item);
   };

   const handleHideSubContainer = () => {
      setShowSubContainer(false);
      setReason(null);
   };

   // use effect
   useEffect(() => {
      if (modal.isHideGlobalModal) {
         setReason(null);
         setShowSubContainer(false);
      }
   }, [modal.isHideGlobalModal]);

   return (
      <div data-name="report-post-box" className="w-full text-slate-700 dark:text-slate-200 px-4">
         <div
            data-name="report-post-header"
            className="flex flex-row items-center gap-2 pb-4 pl-6  border-b dark:border-slate-700"
         >
            <FontAwesomeIcon icon={faFlag} />
            <span>ریپورت کردن</span>
         </div>
         <div data-name="report-post-container" className={`${showSubContainer && "hidden"}`}>
            <div data-name="report-post-body" className="mt-4">
               <div>
                  <p className="text-sm pb-1">چرا میخواهید این پست را ریپورت کنید ؟</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                     بازخورد شما به ما کمک می کند تا تجربه شما را بهبود ببخشیم
                  </p>
               </div>
               <div
                  className={`flex flex-col justify-center text-sm gap-0.5 py-4 pb-3 text-slate-500 dark:text-slate-300`}
               >
                  {reportPostReasonsList.map((item: reportPostReasonsListType, index: number) => {
                     return (
                        <div
                           key={index}
                           className="w-full flex flex-row items-center justify-between py-1 px-4 transition-03 cursor-pointer rounded-l-md hover:bg-gray-200
                         dark:hover:bg-slate-700 border-r-2 border-white dark:border-slate-800 dark:hover:border-blue-600 hover:border-blue-600"
                           onClick={() => {
                              handleShowSubContainer(item);
                           }}
                        >
                           <span>{item.title}</span>
                           <FontAwesomeIcon icon={faArrowLeftLong} />
                        </div>
                     );
                  })}
               </div>
               {/* <br />
            <button onClick={() => hideModal()}>close</button>
            <br />
            <button onClick={() => showHPRCAndHideReportModal()}>show HPRC</button> */}
            </div>
            <div data-name="report-post-footer" className="border-t dark:border-slate-700 pt-2">
               <div
                  className="flex flex-row justify-between items-center hover:bg-gray-200
                         dark:hover:bg-slate-700 px-3 py-1 cursor-pointer rounded-md"
                  onClick={() => showHPRCAndHideReportModal()}
               >
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300">
                     مایل به ریپورت نیستم فقط میخواهم نمایش داده نشود
                  </p>
                  <FontAwesomeIcon icon={faArrowLeftLong} />
               </div>
            </div>
         </div>
         <ReportPostSubContainer
            showReportPostSubContainer={showSubContainer}
            submitReportPostReason={submitReportPostReason}
            reason={reason}
            onHideSubContainer={handleHideSubContainer}
            setReason={setReason}
            post={post}
         />
      </div>
   );
};

export default ReportPostReasonContainer;
