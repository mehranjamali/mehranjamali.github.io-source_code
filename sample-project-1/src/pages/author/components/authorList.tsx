// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faEye, faStar, faUser, faCircle } from "@fortawesome/free-solid-svg-icons";

// type
import { authorBlockObjType, bookType, genreType, authorType } from "../../../store/slices/author";

// components
import FlexTable from "../../../components/flexTable/flexTable";
import { columnsType, childType } from "../../../components/flexTable/flexTableType";
import FlexTableSearchBox from "../../../components/flexTable/flexTableSearchBox";
import DeleteItem from "../../../components/flexTable/deleteItem";

type propsType = {
   authors: any;
   showPanelHandler: (panelName: string, data?: authorType | bookType | null, ...rest: any) => void;
   onSearch: (query: string) => void;
   totalCount: number;
   onDeleteAuthorBlock: (item: authorBlockObjType) => void;
   onDeleteBook: (item: bookType, authorBlock: authorBlockObjType) => void;
};

function AuthorList({ authors, showPanelHandler, onSearch, totalCount, onDeleteAuthorBlock, onDeleteBook }: propsType) {
   // columns
   const authorColumns: columnsType[] = [
      {
         path: "author.image",
         extraClassName: "w-10 h-10 basis-16 md:basis-1/12 rounded-full flex items-center justify-center ml-1",
         image: {
            alt: "author",
            extraClassName: " object-cover rounded-full w-10 h-10 text-2xs ",
         },
      },
      {
         path: "author.name",
         extraClassName:
            " basis-9/12 sm:basis-5/12 md:basis-4/12 text-sm md:text-base text-slate-900 dark:text-white pl-3 ",
      },
      {
         path: "",
         extraClassName: " hidden sm:block text-xs text-slate-900 dark:text-white basis-2/12 ",
         content: (authorBlockObj: authorBlockObjType) => (
            <div>
               <div className="relative w-fit pr-3">
                  <span>books</span>
                  <span className="absolute -top-1.5 right-0">{authorBlockObj.books.length}</span>
               </div>
            </div>
         ),
      },
      {
         path: "",
         extraClassName: " hidden md:block text-xs text-slate-900 dark:text-white basis-2/12",
         content: (authorBlockObj: authorBlockObjType) => (
            <p>
               <span>{authorBlockObj.author.born}</span>
               <span className={`px-1 ${!authorBlockObj.author.died && "hidden"}`}>-</span>
               <span>{authorBlockObj.author.died || ""}</span>
            </p>
         ),
      },
      {
         path: "author.country",
         extraClassName: "text-xs text-slate-900 dark:text-white hidden sm:block basis-2/12",
      },
      {
         path: "",
         extraClassName: "text-sm basis-8",
         content: (authorBlockObj: authorBlockObjType) => (
            <button
               onClick={() => {
                  console.log(authorBlockObj);
               }}
               className="hover:text-blue-500 dark:hover:text-blue-500 transition-02
                          text-slate-500 dark:text-slate-300 cursor-not-allowed"
            >
               <FontAwesomeIcon icon={faEye} />
            </button>
         ),
      },
      {
         path: "",
         extraClassName: "text-sm basis-7",
         content: (authorBlockObj: authorBlockObjType) => (
            <button
               onClick={() => {
                  showPanelHandler("author", authorBlockObj.author, null, authorBlockObj.id);
               }}
               className="hover:text-blue-500 dark:hover:text-blue-500 transition-02 text-slate-500 dark:text-slate-300 "
            >
               <FontAwesomeIcon icon={faEdit} />
            </button>
         ),
      },
      {
         path: "",
         extraClassName: "text-sm basis-7",
         content: (authorBlockObj: authorBlockObjType) => (
            <DeleteItem
               item={authorBlockObj}
               onDelete={onDeleteAuthorBlock}
               extraClassNameToCheckBtn=" p-1.5 pb-1 mb-1 text-xs basis-1/2 "
               extraClassNameToXBtn=" p-1.5 pb-1 mb-1 text-xs basis-1/2 "
               extraClassNameTobox=" w-16 gap-1.5 "
            />
         ),
      },
   ];
   // child
   const child: childType = {
      path: "books",
      columns: [
         {
            path: "image",
            extraClassName: "w-9 h-9 basis-16 md:basis-1/12 rounded-full flex items-center justify-center",
            image: { alt: "book img", extraClassName: " object-cover rounded-full w-9 h-9 text-2xs " },
         },
         {
            path: "",
            extraClassName: " basis-9/12 sm:basis-6/12 md:basis-4/12 ",
            content: (bookObj: bookType) => (
               <div>
                  <p className="text-xs md:text-sm">{bookObj.title}</p>
                  <p className="text-xs text-slate-400">{bookObj.headline}</p>
               </div>
            ),
         },
         {
            path: "",
            extraClassName: "hidden sm:block basis-3/12",
            content: (bookObj: bookType) => (
               <p className="flex text-xs">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                  <span className="px-1">{bookObj.rateNumber}/10</span>
                  (<FontAwesomeIcon icon={faUser} className="pl-1 text-slate-500 dark:text-slate-400" />
                  <span className="px-1 text-slate-500 dark:text-slate-400">{bookObj.rateUserNumber}</span>)
               </p>
            ),
         },
         {
            path: "",
            extraClassName: "hidden md:block basis-3/12",
            content: (bookObj: bookType) => (
               <ul>
                  {bookObj?.genres.map((item: genreType, index: number) => {
                     return (
                        <li key={index} className="flex items-center text-xs text-slate-500 dark:text-slate-300">
                           <FontAwesomeIcon icon={faCircle} className="text-yellow- w-1 h-1 pr-1" />
                           <span>{item.name}</span>
                        </li>
                     );
                  })}
               </ul>
            ),
         },
         {
            path: "",
            extraClassName: "text-xs basis-4",
            content: (bookObj: bookType) => (
               <button
                  onClick={() => {
                     console.log(bookObj);
                  }}
                  className="hover:text-blue-500 dark:hover:text-blue-500 transition-02
                             text-slate-500 dark:text-slate-300 mx-2 cursor-not-allowed"
               >
                  <FontAwesomeIcon icon={faEye} />
               </button>
            ),
         },
         {
            path: "",
            extraClassName: " text-xs pr-2 basis-4",
            content: (bookObj: bookType, ...rest: any) => (
               <button
                  onClick={() => {
                     showPanelHandler("book", bookObj, rest[0]);
                  }}
                  className="hover:text-blue-500 dark:hover:text-blue-500 transition-02 text-slate-500 dark:text-slate-300 "
               >
                  <FontAwesomeIcon icon={faEdit} />
               </button>
            ),
         },
         {
            path: "",
            extraClassName: "text-xs basis-3",
            content: (bookObj: bookType, ...rest: any) => (
               <DeleteItem
                  item={bookObj}
                  onDelete={onDeleteBook}
                  parent={rest[0]}
                  extraClassNameToCheckBtn=" p-1 pb-0.5 mb-1 text-2xs basis-4 "
                  extraClassNameToXBtn=" p-1 pb-0.5 mb-1 text-2xs basis-4 "
                  extraClassNameTobox=" w-11 gap-1.5 mx-2 "
               />
            ),
         },
      ],
   };

   // return
   return (
      <div>
         {/* list header */}
         <div
            data-name="authors-with-books-list-header"
            className="flex flex-row justify-between items-center border-b border-slate-400 pb-4 "
         >
            {/* header title */}
            <div className="text-base relative pl-3">
               <span>نویسندگان</span>
               <span className="absolute top-0 left-0 text-xs">{totalCount}</span>
            </div>
            {/* header buttons */}
            <div className="flex items-center gap-4">
               <button
                  className="flex items-center justify-center text-xs gap-2 w-20 py-1 pt-1.5 shadow-xl rounded-2xl
                                        bg-blue-600 hover:bg-blue-900 transition-03 text-white border border-blue-700"
                  onClick={() => showPanelHandler("book")}
               >
                  <FontAwesomeIcon icon={faPlus} />
                  <span>کتاب</span>
               </button>
               <button
                  className="flex items-center justify-center text-xs gap-2 w-20 py-1 pt-1.5 shadow-xl rounded-2xl
                                        bg-blue-600 hover:bg-blue-900 transition-03 text-white border border-blue-700"
                  onClick={() => showPanelHandler("author")}
               >
                  <FontAwesomeIcon icon={faPlus} />
                  <span>نویسنده</span>
               </button>
            </div>
         </div>
         <div className="pt-3">
            {/* list search box */}
            {/* Component Table Search Box   */}
            <FlexTableSearchBox onSearch={onSearch} />
         </div>
         {/* list body */}
         {authors?.length ? (
            <div>
               <div
                  data-name="authors-with-books-list-body"
                  className="px-1 md:px-4 pt-1 flex flex-col gap-1 overflow-x-auto"
               >
                  <FlexTable
                     tableName="authorList"
                     columns={authorColumns}
                     data={authors}
                     showHeader={false}
                     childTableName="bookList"
                     child={child}
                  />
               </div>
            </div>
         ) : (
            // {/* 404 */}
            <div className="w-full text-center basis-2/3 text-sm p-4 pt-5 bg-white dark:bg-slate-800 transition-01">
               <p>هیچ موردی برای نمایش وجود ندارد</p>
            </div>
         )}
      </div>
   );
}

export default AuthorList;
