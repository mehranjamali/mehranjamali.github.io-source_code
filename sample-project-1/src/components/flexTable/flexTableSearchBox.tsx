import Input from "../input/inputDefault";

type FlexTableSearchBoxPropsType = {
   onSearch: (query: string) => void;
};

function FlexTableSearchBox({ onSearch }: FlexTableSearchBoxPropsType) {
   const handleInputChange = (e: any) => {
      onSearch(e.target.value);
   };
   return (
      <div>
         <Input
            other={{ placeholder: "جستجو در لیست", onChange: (e: any) => handleInputChange(e) }}
            addClassNameInput=" h-10 py-1 pt-1.5 px-2 "
         />
      </div>
   );
}

export default FlexTableSearchBox;
