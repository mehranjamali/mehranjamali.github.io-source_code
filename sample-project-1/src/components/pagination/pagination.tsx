import _ from "lodash";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

type PaginationPropsType = {
   itemCount: number;
   tablePage: { size: number; current: number };
   changeTablePage: React.Dispatch<React.SetStateAction<number>>;
};

function Pagination({ changeTablePage, itemCount, tablePage }: PaginationPropsType) {
   const pageCount = Math.ceil(itemCount / tablePage.size);
   if (pageCount <= 1) return null;
   const pages: number[] = _.range(1, pageCount + 1);

   const nextPage = () => {
      if (tablePage.current === pages.length) return;
      changeTablePage(tablePage.current + 1);
   };
   const prevPage = () => {
      if (tablePage.current === 1) return;
      changeTablePage(tablePage.current - 1);
   };

   return (
      <div data-name="authors-with-books-list-footer" className="border-t border-slate-400 pt-4">
         <ul className="flex flex-row gap-1 items-center justify-center" dir="ltr">
            {/* left angle */}
            <li className="text-sm -mb-1 px-1 rounded-md cursor-pointer " onClick={() => prevPage()}>
               <FontAwesomeIcon icon={faAngleLeft} />
            </li>
            {pages.map((page: number) => (
               <li
                  key={page}
                  className={`flex items-center justify-center border border-slate-200 dark:border-slate-600 rounded-md 
                              cursor-pointer transition-02 w-6 h-6 pt-0.5 text-xs ${
                                 tablePage.current === page && "bg-blue-600 text-white"
                              }`}
                  onClick={() => changeTablePage(page)}
               >
                  {page}
               </li>
            ))}
            {/* right angle */}
            <li className="text-sm -mb-1 px-1 rounded-md cursor-pointer " onClick={() => nextPage()}>
               <FontAwesomeIcon icon={faAngleRight} />
            </li>
         </ul>
      </div>
   );
}

export default Pagination;
