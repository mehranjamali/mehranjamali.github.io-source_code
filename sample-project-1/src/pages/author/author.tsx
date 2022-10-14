/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

// redux
// -- custom hooks
import { RootState, useDispatchHook, useSelectorHook } from "../../store/hooks/useHooks";
// -- slice
import {
   fetchAuthorsWithBooksCommand,
   authorsWithBooksSelector,
   authorWithBooksSearchQueryDoFilterCommand,
   deleteAuthorBlockCommand,
   deleteBookCommand,
   authorStateType,
   authorBlockObjType,
   stateType,
   authorType,
   bookType,
} from "../../store/slices/author";

// components
import Spinner from "../../components/spinner/spinner";
import AuthorForm from "./components/authorForm";
import BookForm from "./components/bookForm";
import AuthorList from "./components/authorList";
import Pagination from "../../components/pagination/pagination";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

// paginate
import { paginate } from "../../utiles/paginate";

function Author() {
   // state
   const [authorBookFormBoxIsHide, setAuthorBookFormBoxIsHide] = useState<boolean>(true);
   const [authorFormBoxIsHide, setAuthorFormBoxIsHide] = useState<boolean>(true);
   const [authorState, setAuthorState] = useState<{ author: authorType | null; authorBlockId: number } | null>(null);
   const [bookState, setBookState] = useState<{ parent: authorBlockObjType | null; book: bookType } | null>(null);
   const [searchQuery, setSearchQuery] = useState<string>("");
   const [tableCurrentPage, setTableCurrentPage] = useState<number>(1);
   const tablePageSize = 3;

   // dispatch
   const dispatch = useDispatchHook();
   // selector
   const authorsWithBooksState: stateType<authorStateType> = useSelectorHook((state: RootState) =>
      authorsWithBooksSelector(state)
   );
   // do filter
   const doFilter = authorWithBooksSearchQueryDoFilterCommand();
   // set table data
   const setTableData = () => {
      let filteredState: stateType<authorStateType> = authorsWithBooksState;
      if (searchQuery?.length > 2) filteredState = doFilter(authorsWithBooksState, searchQuery);
      let paginatedData = paginate(filteredState.data.authorBlockData, tableCurrentPage, tablePageSize);
      return { ...filteredState, data: paginatedData, totalCount: filteredState.data.authorBlockData.length };
   };

   const filteredAndPaginatedState = setTableData();

   // CDM
   useEffect(() => {
      dispatch(fetchAuthorsWithBooksCommand());
   }, [dispatch]);

   // show panel handler
   const showPanelHandler = (
      panelName: string,
      data: any = null,
      parent: authorBlockObjType | null = null,
      authorBlockId: number = 0
   ) => {
      setAuthorBookFormBoxIsHide(false);
      if (panelName === "author") {
         setAuthorFormBoxIsHide(false);
         setBookState(null);
         if (!data) setAuthorState(null);
         else setAuthorState({ author: data, authorBlockId: authorBlockId });
      } else {
         setAuthorFormBoxIsHide(true);
         setAuthorState(null);
         if (!data) setBookState(null);
         else setBookState({ parent: parent, book: data });
      }
   };

   // handle search
   const handleSearchQuery = (query: string) => {
      setSearchQuery(query);
      if (query.length > 2) setTableCurrentPage(1);
   };

   // handle delete author block
   const handleDeleteAuthorBlock = (item: authorBlockObjType, parent = {}) => {
      dispatch(deleteAuthorBlockCommand(item));
      // decrease table current page
      if ((filteredAndPaginatedState.totalCount - 1) % tablePageSize === 0) setTableCurrentPage(tableCurrentPage - 1);
   };
   // handle delete book
   const handleDeleteBook = (item: bookType, authorBlock: authorBlockObjType) => {
      dispatch(deleteBookCommand(item, authorBlock));
      if (item.id === bookState?.book.id) setBookState(null);
   };

   return (
      <div
         data-name="authors-with-books"
         className="flex flex-col justify-center lg:flex-row lg:items-start lg:justify-center gap-5"
         dir="ltr"
      >
         {/* add new or edit */}
         <div
            data-name="add-new-author-or-book-container"
            className={`flex flex-col justify-start basis-1/3 p-2 gap-1 bg-white dark:bg-slate-800 rounded-md
                        shadow-xl border border-slate-200 dark:border-slate-700 author-book-form-box-transition 
                        lg:sticky top-18
               ${
                  authorBookFormBoxIsHide && "w-0 h-0 overflow-hidden p-0 border-0 visibility-hidden opacity-0 basis-0"
               }`}
         >
            {/* add new btns box */}
            <div
               data-name="author-book-form-switch-btns"
               className="flex flex-row justify-between items-center text-xs gap-2 pb-1"
            >
               <button
                  className={`py-2 h-8 basis-1/2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-03 ${
                     !authorBookFormBoxIsHide &&
                     !authorFormBoxIsHide &&
                     authorState === null &&
                     "dark:bg-slate-700 bg-slate-200"
                  }`}
                  onClick={() => showPanelHandler("author")}
               >
                  افزودن نویسنده
               </button>
               <span className="h-8 pr-0.25 bg-slate-400"></span>
               <button
                  className={`py-2 h-8 basis-1/2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-03 ${
                     !authorBookFormBoxIsHide &&
                     authorFormBoxIsHide &&
                     bookState === null &&
                     "dark:bg-slate-700 bg-slate-200"
                  }`}
                  onClick={() => showPanelHandler("book")}
               >
                  افزودن کتاب
               </button>
            </div>
            {/* Author Form Component */}
            {/* Book Form Component */}
            {!authorBookFormBoxIsHide && (
               <div data-name="author-book-form-container" className="p-2 pt-0">
                  {authorFormBoxIsHide ? (
                     <BookForm state={bookState || null} authors={authorsWithBooksState.data.authors} />
                  ) : (
                     <AuthorForm state={authorState || null} />
                  )}
               </div>
            )}
         </div>
         {/* ------> Loading  */}
         {filteredAndPaginatedState.loading ? (
            <div className="flex justify-center items-center basis-2/3 ">
               {/* Component Spinner  */}
               <Spinner spin={filteredAndPaginatedState.loading} />
            </div>
         ) : // ------> Error
         filteredAndPaginatedState.error ? (
            <div
               className="basis-2/3 flex justify-between items-center gap-3 text-sm p-4 bg-white dark:bg-slate-800 text-red-600
                            rounded-md shadow-xl transition-03 border border-slate-200 dark:border-slate-700"
            >
               <p>{filteredAndPaginatedState.error}</p>
               <p className="flex items-center gap-1 text-base">
                  <span>خطا</span>
                  <FontAwesomeIcon icon={faTriangleExclamation} className="-mt-1" />
               </p>
            </div>
         ) : (
            // ------> Data
            <div
               data-name="authors-with-books-list-container"
               className="flex flex-col justify-start basis-2/3 p-4 gap-2 bg-white dark:bg-slate-800 
               rounded-md shadow-xl transition-03 border border-slate-200 dark:border-slate-700"
               dir="rtl"
            >
               <AuthorList
                  onSearch={handleSearchQuery}
                  onDeleteAuthorBlock={handleDeleteAuthorBlock}
                  onDeleteBook={handleDeleteBook}
                  authors={filteredAndPaginatedState.data}
                  totalCount={filteredAndPaginatedState.totalCount}
                  showPanelHandler={showPanelHandler}
               />
               {/* list pagination */}
               {/* Component Pagination  */}
               <Pagination
                  changeTablePage={setTableCurrentPage}
                  itemCount={filteredAndPaginatedState.totalCount}
                  tablePage={{ current: tableCurrentPage, size: tablePageSize }}
               />
            </div>
         )}
      </div>
   );
}

export default Author;
