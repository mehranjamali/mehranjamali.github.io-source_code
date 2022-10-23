import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

// component
import Spinner from "../../../../../../components/spinner/spinner";
import { useEffect, useState } from "react";

// redux
import { RootState, useSelectorHook } from "../../../../../../store/hooks/useHooks";
import { getMainPostsByUserIdSelector } from "../../../../../../store/slices/fakePost";
import { userAuthReadStateSelector, userAuthType } from "../../../../../../store/slices/user";

function UserInfo() {
   const userState: userAuthType = useSelectorHook((state: RootState) => userAuthReadStateSelector(state));
   const mainPostsByUserId = useSelectorHook((state: RootState) => getMainPostsByUserIdSelector(state));
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      setTimeout(() => {
         setLoading(false);
      }, 400);
   }, []);
   return (
      <div
         data-name="user"
         className={`bg-white text-slate-900 dark:bg-slate-800 dark:text-white shadow-xl 
                      sm:rounded-md transition-03 border border-slate-200 dark:border-slate-700
                      text-base w-full flex flex-col items-center justify-center gap-3 ${
                         !userState.accessToken && "hidden"
                      }`}
      >
         {loading ? (
            <div className="p-3">
               <Spinner spin={loading} />
            </div>
         ) : (
            <>
               <div data-name="user-head" className="w-full relative border-b dark:border-slate-700 border-slate-200">
                  <div
                     data-name="user-bg"
                     className="relative user-bg-img h-16 sm:rounded-t-md bg-slate-300 dark:bg-slate-600 w-full"
                  >
                     <div className="absolute inset-0 bg-slate-900/20 sm:rounded-t-md"></div>
                  </div>
                  <a href="https://www.linkedin.com/in/mehran-jamali-b2a43b239/">
                     <img
                        src={process.env.REACT_APP_USER_IMG_URL}
                        className="absolute mx-auto right-0 left-0 top-9 rounded-full h-16 w-16 border-2 border-white transition-02
                                 bg-slate-200 dark:bg-slate-600 dark:border-slate-800 text-2xs text-slate-400 pointer-events-none"
                        alt="user"
                     />
                     <div data-name="headline" className="p-3 pt-11 text-center">
                        <div className="text-base font-medium">مهران جمالی</div>
                        <div className="text-xs pt-2 text-slate-500 dark:text-slate-400">
                           توسعه دهنده Frontend React (Redux)
                        </div>
                     </div>
                  </a>
               </div>
               <div
                  data-name="user-widgets"
                  className="w-full border-b dark:border-slate-700 border-slate-200 p-5 pt-1 flex 
                        flex-col gap-3 text-slate-500 dark:text-slate-400"
               >
                  <div
                     className="flex flex-row items-center justify-between text-xs 
                          border-b dark:border-slate-700 border-slate-200 pb-3"
                  >
                     <div> تعداد بازدید امروز</div>
                     <div>70</div>
                  </div>
                  <div
                     className="flex flex-row items-center justify-between text-xs 
                          border-b dark:border-slate-700 border-slate-200 pb-3"
                  >
                     <div>تعداد اتصال ها</div>
                     <div>+500</div>
                  </div>
                  <div className="flex flex-row items-center justify-between text-xs">
                     <div>تعداد پست ها</div>
                     <div>{mainPostsByUserId.data.length}</div>
                  </div>
               </div>
               <div
                  data-name="user-saved-items"
                  className="w-full p-3 pt-1 flex flex-col gap-3 text-slate-700 dark:text-slate-200 "
               >
                  <Link to="/saved-posts/" className="flex flex-row justify-start items-center gap-3 text-sm">
                     <FontAwesomeIcon icon={faBookmark} />
                     <p>پست های ذخیره شده</p>
                  </Link>
               </div>
            </>
         )}
      </div>
   );
}

export default UserInfo;
