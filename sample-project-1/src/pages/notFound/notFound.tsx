import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
   const navigate = useNavigate();
   const handleNavigateToHome = () => {
      navigate("/home");
   };
   return (
      <div className="flex flex-col md:flex-row justify-between items-start p-4 gap-7 h-full" dir="ltr">
         <div className="flex flex-col justify-between lg:h-72 w-full">
            <div className="h-full">
               <img
                  className="shadow-lg h-full w-full object-cover pointer-events-none"
                  src="https://aioseo.com/wp-content/uploads/2021/04/how-to-find-and-fix-404-errors-in-wordpress.png"
                  alt=""
               />
            </div>
         </div>
         <div className="flex flex-col justify-between lg:h-72 w-full " dir="rtl">
            <div className="flex flex-col gap-4">
               <h3 className="text-xl">صفحه مورد نظر یافت نشد !</h3>
               <p className="text-base text-slate-600 dark:text-slate-300">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها
                  و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
                  کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
               </p>
            </div>

            <div className="mt-4">
               <button
                  className="flex flex-row items-center gap-4 text-sm transition-03 hover:gap-8 
                           hover:text-sky-500 dark:hover:text-sky-500"
                  onClick={() => handleNavigateToHome()}
               >
                  <span>بازگشت به صفحه اصلی</span>
                  <FontAwesomeIcon icon={faArrowLeft} />
               </button>
            </div>
         </div>
      </div>
   );
}

export default NotFoundPage;
