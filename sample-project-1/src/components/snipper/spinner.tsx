type props = {
   spin: boolean;
};

function Spinner({ spin }: props) {
   return (
      <div
         className={`flex justify-center items-center animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-sky-500 ${
            spin ? "" : "hidden"
         }`}
      >
         <div className="flex justify-center items-center animate-spin rounded-full h-8 w-8 border-t-2 border-sky-500">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-t-2 border-sky-500"></div>
         </div>
      </div>
   );
}

export default Spinner;
