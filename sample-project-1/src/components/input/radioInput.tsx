import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

type radioInputPropsType = {
   checked: any;
   value: any;
   handleChange: any;
   customClassName?: string;
   id?: any;
   children: JSX.Element | string;
};

function RadioInput({ checked, customClassName, handleChange, value, id, children }: radioInputPropsType) {
   return (
      <div>
         <input
            type="radio"
            checked={checked}
            onChange={handleChange}
            value={value}
            className={`${customClassName} hidden peer`}
            id={id}
         />
         <label
            htmlFor={id}
            className="flex flex-row items-center gap-2 hover:cursor-pointer rounded-tr-md peer-checked:text-blue-500 peer-checked:border-l-2 
            peer-checked:border-blue-500 rounded-br-md hover:border-l-2 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-300 
            dark:border-slate-500 py-1 px-2 hover:text-slate-900 dark:hover:text-slate-200"
         >
            <FontAwesomeIcon icon={faAngleLeft} />
            <span>{children}</span>
         </label>
      </div>
   );
}

export default RadioInput;
