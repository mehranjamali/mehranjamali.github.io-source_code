type SubmitButtonPropsType = {
   extraClassName?: string;
   children?: any;
};

function SubmitButton({ extraClassName, children }: SubmitButtonPropsType) {
   return (
      <button
         className={`relative flex justify-center items-center gap-2 bg-blue-700 rounded-full 
                                py-2 text-xs text-white hover:bg-blue-900 transition-03 ${extraClassName}`}
         type="submit"
      >
         {children}
      </button>
   );
}

export default SubmitButton;
