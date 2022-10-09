import { useState } from "react";

type TextareaPropsType = {
   addClassNameInput?: string;
   addClassNameLabel?: string;
   addClassNameLabelBox?: string;
   type?: string;
   label?: string;
   id?: string;
   isEmpty?: boolean;
   error?: any;
   value?: string;
   required?: boolean;
   other: { register: any; name: string; options?: any } | any;
};

function Textarea({
   label,
   id,
   addClassNameInput,
   addClassNameLabel,
   addClassNameLabelBox,
   required,
   other,
}: TextareaPropsType) {
   const { register, name, options } = other;

   const handleTextareaGrow = (e: any) => {
      e.target.rows = e.target.value.split("\n").length <= 8 ? 8 : e.target.value.split("\n").length;
   };

   return (
      <div className="relative w-full h-fit -mb-2">
         <textarea
            autoComplete="off"
            id={id}
            rows={8}
            className={`text-sm border dark:border-slate-600 dark:bg-slate-800 rounded-md w-full peer outline-none resize-none
                        focus:border-1 focus:border-slate-500 dark:focus:border-slate-300 ${addClassNameInput}`}
            {...register(name, { options, onChange: (e: any) => handleTextareaGrow(e) })}
         />
         <div
            className={`absolute top-0 left-0 bottom-auto w-full z-30 min-h-fit dark:border-slate-600 peer-focus:border-slate-500 
                        flex flex-row items-center justify-start dark:peer-focus:border-slate-300 bg-white
                        dark:bg-slate-800 rounded-tl-md rounded-tr-md ${addClassNameLabelBox}`}
         >
            <label htmlFor={id} className={`z-60 ${!label && "hidden"} ${addClassNameLabel}`}>
               <div className="relative w-fit pr-2">
                  {label} <span className={`absolute right-0 top-0 -mt-2 ${!required && "hidden"}`}>*</span>
               </div>
            </label>
         </div>
      </div>
   );
}

export default Textarea;
