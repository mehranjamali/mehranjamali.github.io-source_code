type TextInputPropsType = {
   addClassNameInput?: string;
   addClassNameLabel?: string;
   type?: string;
   label?: string;
   id?: string;
   other?: any;
   isEmpty?: boolean;
   error?: any;
   value?: string;
   required?: boolean;
   placeholder?: string;
   opstions?: any;
};

function Input({
   addClassNameInput,
   addClassNameLabel,
   type = "text",
   label,
   id = "",
   other,
   error,
   value,
   required,
   placeholder,
   opstions,
}: TextInputPropsType) {
   return (
      <div className="relative w-full h-fit">
         <label htmlFor={id} className={`absolute top-3 left-2 pr-2 ${!label && "hidden"} ${addClassNameLabel}`}>
            {label} :<span className={`absolute right-0 top-0 -mt-2 ${!required && "hidden"}`}>*</span>
         </label>
         <input
            placeholder={placeholder}
            autoComplete="off"
            type={type}
            id={id}
            value={value}
            className={`text-sm border dark:border-slate-600 dark:bg-slate-800 rounded-md w-full peer outline-none 
            focus:border-1 focus:border-slate-500 dark:focus:border-slate-300 ${addClassNameInput}`}
            {...other}
            {...opstions}
         />
      </div>
   );
}

export default Input;
