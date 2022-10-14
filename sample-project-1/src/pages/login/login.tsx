import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

// google login
import { useGoogleLogin } from "react-google-login";

// gapi
import { gapi } from "gapi-script";

// redux
import { useDispatchHook, useSelectorHook, RootState } from "../../store/hooks/useHooks";
import {
   userAuthLoginCommand,
   loginFormInputType,
   userAuthReadStateSelector,
   userAuthType,
} from "../../store/slices/user";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { faCircleDot, faAngleLeft, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

// components
import InputLoginRegister from "../../components/input/inputLoginRegister";
import Spinner from "../../components/spinner/spinner";

// spinner size
const spinnerSize = {
   layer1: { width: "w-5", height: "h-5" },
   layer2: { width: "w-3", height: "h-3" },
   layer3: { width: "w-1", height: "h-1" },
};

// Component
function LoginPage() {
   // state
   const [showSpinner, setShowSpinner] = useState<boolean>(false);
   // dispatch
   const dispatch = useDispatchHook();
   // selector
   const userAuthState: userAuthType = useSelectorHook((state: RootState) => userAuthReadStateSelector(state));
   // useEffect
   useEffect(() => {
      const initClient = () => {
         gapi.client.init({
            clientId: "984590594091-u3nvnj8pa6r7vibv6d1eurar6jabmp2n.apps.googleusercontent.com",
            scope: "",
         });
      };
      gapi.load("client:auth2", initClient);
   });

   // react-hook-form
   const {
      register,
      watch,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm<loginFormInputType>();

   // onSubmit
   const onSubmit = (data: loginFormInputType) => {
      setShowSpinner(true);
      setTimeout(() => {
         dispatch(userAuthLoginCommand(data));
         setShowSpinner(false);
      }, 800);
   };

   // response google
   const handleResponseGoogle = (response: any) => {
      if (response?.profileObj?.email) {
         dispatch(userAuthLoginCommand({ userNameForLogin: response.profileObj.email, passwordForLogin: "" }));
         setValue("userNameForLogin", response.profileObj.email);
      }
   };

   // google login hook
   const { signIn } = useGoogleLogin({
      clientId: "984590594091-u3nvnj8pa6r7vibv6d1eurar6jabmp2n.apps.googleusercontent.com",
      onSuccess: handleResponseGoogle,
      onFailure: handleResponseGoogle,
      cookiePolicy: "http://localhost:8888",
   });

   // check errors
   const checkErrors = () => {
      return errors.userNameForLogin || errors.passwordForLogin;
   };

   // return
   return (
      <div data-name="login-container" className="h-full w-full flex flex-col justify-center items-center">
         {/* absolute login-header */}
         <div data-name="login-header" className="absolute top-10 right-10">
            <Link to={"/"} className="text-xl">
               Website Logo
            </Link>
         </div>
         {/* static login-body */}
         <div data-name="login-body" className="w-full h-full flex flex-col justify-center items-center gap-7">
            <div
               data-name="login-form-container"
               className="w-full xs:w-80 bg-white dark:bg-slate-800 shadow-xl py-4 px-5 rounded-md flex flex-col gap-1"
            >
               <div
                  data-name="login-form-container-header"
                  className="pb-6 flex flex-row justify-between items-center gap-1"
               >
                  <div>
                     <p className="text-base text-slate-900 dark:text-white">ورود به حساب کاربری</p>
                     <p className="text-xs text-slate-400">در دنیای حرفه ای خود با ما به روز باشید</p>
                  </div>
                  <div className={`${!checkErrors() && !userAuthState.error && "hidden"}`}>
                     <FontAwesomeIcon className="text-red-600" icon={faCircleXmark} />
                  </div>
               </div>
               <div data-name="login-form-container-form" className="">
                  <form
                     onSubmit={handleSubmit(onSubmit)}
                     className="flex flex-col justify-center items-start gap-2 w-full"
                  >
                     {/* Input Component username */}
                     <InputLoginRegister
                        label="نام کاربری، ایمیل یا شماره موبایل "
                        id="userNameForLogin"
                        isEmpty={watch("userNameForLogin") ? false : true}
                        error={errors.userNameForLogin}
                        other={{ ...register("userNameForLogin", { required: true, minLength: 4 }) }}
                     />
                     {/* Input Component password */}
                     <InputLoginRegister
                        label="رمز عبور"
                        id="passwordForLogin"
                        type="password"
                        isEmpty={watch("passwordForLogin") ? false : true}
                        error={errors.passwordForLogin}
                        other={{ ...register("passwordForLogin", { required: true, minLength: 4 }) }}
                     />
                     {/* forgot password link */}
                     <Link className="w-full text-xs" to={"/forgot-password"}>
                        <p
                           className="text-blue-700 dark:text-blue-500 hover:bg-blue-100 dark:hover:bg-slate-700 
                                        w-fit py-1 px-1 rounded-xl transition-02"
                        >
                           رمز عبور خود را فراموش کرده ام؟
                        </p>
                     </Link>
                     {/* error */}
                     <div
                        data-name="login-form-error"
                        className={`text-xs text-red-600 bg-red-50 w-full dark:bg-slate-700 rounded-md p-1 items-center gap-2 ${
                           userAuthState.error ? "flex" : "hidden"
                        }`}
                     >
                        <FontAwesomeIcon icon={faCircleDot} className="text-2xs w-2.5 h-2.5" />
                        <p className="-mb-0.5">{userAuthState.error}</p>
                     </div>
                     {/* error */}
                     <div
                        data-name="login-form-error"
                        className={`text-xs text-red-600 bg-red-50 w-full dark:bg-slate-700 rounded-md p-1 items-center gap-2 
                        ${checkErrors() ? "flex" : "hidden"}`}
                     >
                        <FontAwesomeIcon icon={faCircleDot} className="text-2xs w-2.5 h-2.5" />
                        <p className="-mb-0.5">لطفا فرم را پر کنید. </p>
                     </div>
                     {/* error */}
                     <div
                        data-name="login-form-error"
                        className={`text-xs text-red-600 bg-red-50 w-full dark:bg-slate-700 rounded-md p-1 items-center gap-2 
                        ${errors.passwordForLogin?.type === "minLength" ? "flex" : "hidden"}`}
                     >
                        <FontAwesomeIcon icon={faCircleDot} className="text-2xs w-2.5 h-2.5" />
                        <p className="-mb-0.5">طول رمز عبور حداقل باید 4 کاراکتر باشد.</p>
                     </div>
                     {/* error */}
                     <div
                        data-name="login-form-error"
                        className={`text-xs text-red-600 bg-red-50 w-full dark:bg-slate-700 rounded-md p-1 items-center gap-2 
                        ${errors.userNameForLogin?.type === "minLength" ? "flex" : "hidden"}`}
                     >
                        <FontAwesomeIcon icon={faCircleDot} className="text-2xs w-2.5 h-2.5" />
                        <p className="-mb-0.5">طول نام کاربری حداقل باید 4 کاراکتر باشد.</p>
                     </div>
                     <button
                        className="relative flex justify-center items-center gap-2 w-full bg-blue-700 rounded-full 
                                py-2 text-xs text-white hover:bg-blue-900 transition-03 h-8"
                        type="submit"
                     >
                        <FontAwesomeIcon
                           icon={faAngleLeft}
                           className={`absolute top-2.5 right-3 transition-02 ${
                              showSpinner ? "visible opacity-100" : "visibility-hidden opacity-0"
                           }`}
                        />
                        <span>ورود به حساب کاربری</span>
                        {/* Spinner */}
                        <span className="absolute left-3 top-1.5">
                           <Spinner spin={showSpinner} size={spinnerSize} color={"border-white"} />
                        </span>
                     </button>
                  </form>
               </div>
               <div
                  data-name="login-form-container-or"
                  className="flex flex-row items-center justify-center gap-5 w-full"
               >
                  <p className="pt-0.25 bg-slate-200 dark:bg-slate-500 flex-1"></p>
                  <p className="text-sm text-slate-400">or</p>
                  <p className="pt-0.25 bg-slate-200 dark:bg-slate-500 flex-1"></p>
               </div>
               <div data-name="login-form-container-with" className="flex flex-col justify-center items-center gap-3">
                  {/* google login button */}
                  <button
                     className="flex justify-center items-center gap-2 w-full border border-slate-400 rounded-full py-1.5 text-xs
                     text-slate-500 dark:text-slate-400  hover:bg-slate-200 dark:hover:bg-slate-700  transition-03"
                     onClick={signIn}
                  >
                     <span>ورود با حساب گوگل</span>
                  </button>
                  {/* github login button */}
                  <button
                     className="flex justify-center items-center gap-2 w-full border border-slate-400 rounded-full py-1.5 text-xs
                      text-slate-500 dark:text-slate-400  hover:bg-slate-200 dark:hover:bg-slate-700  transition-03"
                  >
                     <span>ورود با حساب گیت هاب</span>
                  </button>
               </div>
            </div>
            <div data-name="go-register">
               <Link to={"/register"} className="text-xs text-slate-600 dark:text-slate-200">
                  عضو نیستید؟ <span className="text-blue-600 dark:text-blue-500 font-semibold"> ثبت نام </span> کنید
               </Link>
            </div>
         </div>
         {/* absolute login-footer */}
         <div data-name="login-footer" className="absolute bottom-0 left-0 right-0 w-full text-sm pb-2">
            <ul className="hidden md:flex flex-row justify-center items-center gap-2">
               <li className="text-xs text-slate-500 dark:text-slate-400 flex justify-center items-center gap-1">
                  <FontAwesomeIcon icon={faCopyright} className="-mt-0.5" />
                  <p> کلیه حقوق برای این سایت محفوظ است. </p>
               </li>
            </ul>
         </div>
      </div>
   );
}

export default LoginPage;
