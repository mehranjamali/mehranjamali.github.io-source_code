import moment from "jalali-moment";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import Spinner from "../../../spinner/spinner";
import { getNotifications } from "./notificationService";
import showToast from "../../../../utiles/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

type propsNotification = {
   showPanel: boolean;
};

// generate date
const generateDate = (d: number) => {
   const date = new Date();
   date.setDate(date.getDate() - d);
   return moment(date).locale("fa").format("YYYY/MM/DD");
};

// generate notification id
const generateNotificationId = (dayId: number, notificationId: number) => {
   return `notification-${dayId}${notificationId}`;
};

function Notification({ showPanel }: propsNotification) {
   const [notifications, setNotifications]: any = useState([]);
   const [loading, setLoading] = useState(false);
   // CDM
   useEffect(() => {
      setNotifications(getNotifications());
   }, []);
   // CDU
   useEffect(() => {
      // i write this just for testing loading spinner
      if (showPanel) setLoading(true);
      setTimeout(() => {
         setLoading(false);
      }, 1200);
   }, [showPanel]);
   useEffect(() => {
      // console.log("Notification Component re-rendered");
   });

   // handle delete notification
   // server request --> deleteNotification(dayId, notificationId);
   // local proccess
   // step 1 : find and save "day index"
   // step 2 : check "day index" if not then return false
   // step 3 : find and save "notification index"
   // step 4 : check "notification index" if not then return false
   // step 5 : splice "notification" from list
   const handleDeleteNotification = (dayId: number, notificationId: number) => {
      let dayIndex = notifications.findIndex((day: any) => day.id === dayId);
      if (dayIndex > -1) {
         let notificationIndex = notifications[dayIndex].list.findIndex(
            (notification: any) => notification.id === notificationId
         );
         if (notificationIndex > -1) {
            let copiedList = [...notifications];
            copiedList[dayIndex].list.splice(notificationIndex, 1);
            // remove day if list in empty
            // checking notification list per day, if it's empty then splice current day
            if (!copiedList[dayIndex].list.length) {
               copiedList.splice(dayIndex, 1);
            }

            // animation
            const notificationInDOM = document.getElementById(generateNotificationId(dayId, notificationId));
            notificationInDOM?.classList.add("scale-75", "transition-03");
            setTimeout(() => {
               notificationInDOM?.classList.add("-translate-x-full");
            }, 300);
            setTimeout(() => {
               notificationInDOM?.classList.remove("-translate-x-full", "scale-75", "transition-03");
               setNotifications(copiedList);
            }, 600);
            // end of animation

            // showToast("عملیات با موفقیت انجام شد", "success");
            return true;
         } // if (notificationIndex > -1)
         showToast("مشکلی رخ داده است", "error");
         return false;
      } // if (dayIndex > -1)
      showToast("مشکلی رخ داده است", "error");
      return false;
   };

   return (
      <div
         data-name="notification"
         className={`absolute left-0 from-top z-50 
                    flex flex-col justify-between items-start
                    shadow-2xl w-64 sm:w-80 h-screen pb-16
                    bg-white dark:bg-slate-800 
                    dark:text-slate-300 
                    border-t border-r dark:border-slate-700
                    transition-05 ${showPanel ? "" : "-translate-x-full"}`}
      >
         <div data-name="notification-main" className="w-full overflow-y-auto overflow-x-hidden">
            {loading ? (
               <div className="flex justify-center items-center h-20">
                  <Spinner spin={loading} />
               </div>
            ) : !notifications.length ? (
               <div className="text-center mt-4 text-base">هیچ اعلانی برای شما وجود ندارد</div>
            ) : (
               notifications.map((notificationDay: any, dayIndex: number) => {
                  return (
                     <div key={notificationDay.id} className="notification-list">
                        {!notificationDay.list.length ? (
                           ""
                        ) : (
                           <div
                              className="bg-slate-200 dark:bg-slate-700 dark:border-slate-500 text-sky-600 z-50 
                        w-full p-1 font-semibold text-base font-bYekan sticky top-0 border-b border-t border-slate-300 transition-03"
                           >
                              {generateDate(notificationDay.day)}
                           </div>
                        )}
                        {notificationDay.list.map((notification: any, notificationIndex: number) => {
                           return (
                              <div
                                 data-name="animated-notification"
                                 key={notificationIndex}
                                 className="animated-notification flex flex-col gap-2 justify-start items-start p-3 overflow-x-hidden border-t 
                                     dark:border-slate-700"
                                 id={generateNotificationId(notificationDay.id, notification.id)}
                              >
                                 <div className="flex flex-col sm:flex-row flex-wrap items-center justify-start gap-2 w-full transition-05">
                                    <img
                                       src={notification.img}
                                       className="bg-sky-500 rounded-full flex-grow-0"
                                       width="40px"
                                       height="40px"
                                       alt="img"
                                    />
                                    <h2 className="text-sm h-full flex-1">
                                       <span>{notification.title}</span>
                                    </h2>
                                 </div>
                                 <div>
                                    <p className="text-sm text-slate-500">{notification.desc}</p>
                                 </div>
                                 <div className="w-full flex justify-center sm:justify-end items-center z-30">
                                    <button
                                       onClick={() => {
                                          handleDeleteNotification(notificationDay.id, notification.id);
                                       }}
                                    >
                                       <FontAwesomeIcon
                                          className="text-slate-400 dark:text-slate-300 transition-05 hover:text-sky-500"
                                          icon={faTrashCan}
                                       />
                                    </button>
                                 </div>
                              </div>
                           );
                        })}
                     </div>
                  );
               })
            )}
         </div>
         <div
            data-name="notification-today"
            className="flex flex-row justify-between w-11/12 text-xs bg-slate-200 
                     dark:bg-slate-700 p-2 mx-auto text-sky-600 mt-3 font-bold"
         >
            <span>امروز</span>
            <span className="font-bYekan">{generateDate(0)}</span>
         </div>
      </div>
   );
}

export default React.memo(Notification);
