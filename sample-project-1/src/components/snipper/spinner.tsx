type props = {
   spin: boolean;
   size?: any;
};

const initialSize = {
   layer1: { width: "w-10", height: "h-10" },
   layer2: { width: "w-8", height: "h-8" },
   layer3: { width: "w-6", height: "h-6" },
};

function Spinner({ spin, size = initialSize }: props) {
   const generateLayers = (w: string, h: string) => {
      return `flex justify-center items-center animate-spin rounded-full border-t-2 
               border-b-2 border-sky-500 ${w} ${h} ${spin ? "" : "hidden"}`;
   };
   return (
      <div className={generateLayers(size.layer1.width, size.layer1.height)}>
         <div className={generateLayers(size.layer2.width, size.layer2.height)}>
            <div className={generateLayers(size.layer3.width, size.layer3.height)}></div>
         </div>
      </div>
   );
}

export default Spinner;
