type TextInputPropsType = {
   addClassNameInput?: string;
   addClassNameLabel?: string;
   type?: string;
   label?: string;
   id?: string;
   other?: any;
   isEmpty?: boolean;
   error?: any;
};

// Component
function InputLoginRegister({
   addClassNameInput,
   addClassNameLabel,
   type = "text",
   label,
   id = "",
   other,
   isEmpty = true,
   error,
}: TextInputPropsType) {
   // switch show hide password
   const switchShowHidePassword = (e: any) => {
      const passwordInput: any = document.getElementById(id);
      passwordInput.type = passwordInput.type === "password" ? "text" : "password";
      e.target.innerText = passwordInput.type === "password" ? "مشاهده " : "مخفی ";
   };
   // return
   return (
      <div className="relative w-full h-fit">
         <input
            type={type}
            id={id}
            {...other}
            className={`text-sm border dark:border-slate-500 dark:bg-slate-800 rounded-md min-h-11 max-h-12 h-12 pt-6 pb-0.5 px-2 
             w-full peer outline-none focus:border-2 focus:border-slate-400 dark:focus:border-slate-400 ${addClassNameInput}`}
         />
         <label
            htmlFor={id}
            className={`absolute right-2 transition-02 peer-focus:text-xs peer-focus:top-1.5 
                      peer-focus:text-slate-600 dark:peer-focus:text-slate-300 cursor-text
                      ${
                         isEmpty
                            ? " top-3.5 text-sm text-slate-400 dark:text-slate-500 "
                            : " top-1.5 text-xs text-slate-600 dark:text-slate-300 "
                      } ${addClassNameLabel}`}
         >
            {label}
         </label>
         {/* switch show hide password */}
         <button
            type="button"
            onClick={(e: any) => switchShowHidePassword(e)}
            className={`
            ${
               type !== "password" && "hidden"
            } absolute left-1 top-3.5 text-2xs font-medium text-blue-700 dark:text-blue-500 py-1 px-1.5 
            hover:bg-blue-100 dark:hover:bg-slate-700 transition-01 rounded-xl`}
         >
            مشاهده
         </button>
      </div>
   );
}

export default InputLoginRegister;
