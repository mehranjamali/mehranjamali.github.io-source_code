import moment from "jalali-moment";
import { useEffect, useState } from "react";
import Spinner from "../../snipper/spinner";
import { getNotifications, deleteNotification } from "./notificationService";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

// generate date
const generateDate = (d: number) => {
   const date = new Date();
   date.setDate(date.getDate() - d);
   return moment(date).locale("fa").format("YYYY/MM/DD");
};

type props = {
   showPanel: boolean;
};

function Notification({ showPanel }: props) {
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

   // handle delete notification
   const handleDeleteNotification = (dayId: number, notificationId: number) => {
      const theme = window.localStorage.getItem("theme");
      // step 1 : find and save "day index"
      // step 2 : check "day index" if not then return false
      // step 3 : find and save "notification index"
      // step 4 : check "notification index" if not then return false
      // step 5 : splice "notification" from list and return notification obj
      let dayIndex = notifications.findIndex((day: any) => day.id === dayId);
      if (dayIndex > -1) {
         let notificationIndex = notifications[dayIndex].list.findIndex(
            (notification: any) => notification.id === notificationId
         );
         if (notificationIndex > -1) {
            let copiedList = [...notifications];
            copiedList[dayIndex].list.splice(notificationIndex, 1);
            setNotifications(copiedList);
            console.log(copiedList);
            if (theme === "dark") toast.dark("عملیات با موفقیت انجام شد");
            else toast.success("عملیات با موفقیت انجام شد");
            return true;
         }
         if (theme === "dark") toast.dark("مشکلی رخ داده است");
         else toast.error("مشکلی رخ داده است");
         return false;
      }
      if (theme === "dark") toast.dark("مشکلی رخ داده است");
      else toast.error("مشکلی رخ داده است");
      return false;
   };

   return (
      <div
         className={`absolute left-0 from-top z-50 
                    flex flex-col justify-between items-start
                    shadow-2xl w-56 sm:w-80 h-screen pb-16
                    bg-white dark:bg-slate-800 
                    dark:text-slate-300 
                    border-t border-r dark:border-slate-600
                    transition-05 ${showPanel ? "" : "-translate-x-full"}`}
      >
         <div className="w-full overflow-y-auto">
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
                              className="bg-slate-200 dark:bg-slate-700 dark:border-slate-500 text-sky-600 
                        w-full p-1 font-semibold text-base font-bYekan sticky top-0 border-b border-t border-slate-300"
                           >
                              {generateDate(notificationDay.day)}
                              <ToastContainer
                                 position="bottom-right"
                                 autoClose={5000}
                                 hideProgressBar={false}
                                 newestOnTop={false}
                                 closeOnClick
                                 rtl={false}
                                 pauseOnFocusLoss
                                 draggable
                                 pauseOnHover
                                 bodyClassName={() =>
                                    "text-sm font-white font-med flex justify-between items-center p-3 font-shabnam"
                                 }
                              />{" "}
                           </div>
                        )}
                        {notificationDay.list.map(
                           (notification: any, notificationIndex: number) => {
                              return (
                                 <div
                                    key={notificationIndex}
                                    className="flex flex-col gap-2 justify-start items-start p-3 overflow-x-hidden border-t dark:border-slate-700"
                                 >
                                    <div className="flex flex-row flex-wrap items-center justify-start gap-2">
                                       <img
                                          src={notification.img}
                                          className="bg-sky-500 rounded-full flex-grow-0"
                                          width="40px"
                                          height="40px"
                                          alt="img"
                                       />
                                       <h2 className="text-base h-full flex-1">
                                          <span>{notification.title}</span>
                                       </h2>
                                    </div>
                                    <div>
                                       <p className="text-sm text-slate-500">{notification.desc}</p>
                                    </div>
                                    <div className="w-full flex justify-end items-center">
                                       <button
                                          onClick={() => {
                                             handleDeleteNotification(
                                                notificationDay.id,
                                                notification.id
                                             );
                                          }}
                                       >
                                          <FontAwesomeIcon
                                             className="text-slate-400 dark:text-slate-300 transition-03"
                                             icon={faTrashCan}
                                          />
                                       </button>
                                    </div>
                                 </div>
                              );
                           }
                        )}
                     </div>
                  );
               })
            )}
         </div>
         <div
            className="flex flex-row justify-between w-11/12 text-xs bg-slate-200 
                     dark:bg-slate-700 p-2 mx-auto text-sky-600 mt-3 font-bold"
         >
            <span>امروز</span>
            <span className="font-bYekan">{generateDate(0)}</span>
         </div>
      </div>
   );
}

export default Notification;
