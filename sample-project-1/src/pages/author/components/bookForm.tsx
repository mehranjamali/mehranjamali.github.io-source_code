/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";

// Components
import Input from "../../../components/input/inputDefault";
import Select, { optionType } from "../../../components/input/select";
import SubmitButton from "../../../components/button/submitButton";
import Textarea from "../../../components/input/textarea";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faCircleDot,
   faAngleLeft,
   faAngleRight,
   faFileCirclePlus,
   faXmark,
   faPlus,
} from "@fortawesome/free-solid-svg-icons";

// redux
// -- custom hooks
import { useDispatchHook } from "../../../store/hooks/useHooks";
// -- slice
import { bookType, authorBlockObjType, genreType, updateBooksCommand } from "../../../store/slices/author";

// service
import { authorType, getGenresList } from "../authorService";

type BookFormPropsType = {
   state: { parent: authorBlockObjType | null; book: bookType } | null;
   authors: authorType[];
};
const initialState: bookType = {
   title: "",
   authorId: 0,
   id: 0,
   description: "",
   headline: "",
   image: "",
   rateNumber: 0,
   rateUserNumber: "0",
   publishDate: "",
   genres: [],
};

function BookForm({ state, authors }: BookFormPropsType) {
   // dispatch
   const dispatch = useDispatchHook();
   // state
   const [photo, setPhoto] = useState<any>(state?.book.image);
   const [genresOptions, setGeneresOptions] = useState<any>([]);
   const [selectedAuthors, setSelectedAuthors] = useState<any[]>([]);
   const [selectedGenres, setSelectedGenres] = useState<any[]>([]);
   // ref
   const selectPhotoInput = useRef<any>(null);

   // react-hook-form
   const {
      register,
      handleSubmit,
      setValue,
      watch,
      setError,
      formState: { errors },
   } = useForm<bookType>();

   // clear form
   const setDefaultForm = () => {
      let item: any;
      for (item in initialState) {
         setValue(item, _.get(initialState, item));
      }
      handleClearImage();
      setSelectedAuthors([]);
      setSelectedGenres([]);
   };

   // set genres options
   useEffect(() => {
      const genresOptions = getGenresList().map((genre: genreType, index: number) => {
         return {
            data: genre,
            label: (
               <div
                  key={index}
                  className="flex items-center justify-between gap-2 rounded-md hover:bg-white
                        dark:hover:bg-slate-800 px-2 text-sm py-2 cursor-pointer"
               >
                  <p className="pt-1">{genre.name}</p>
                  <FontAwesomeIcon icon={faPlus} className="text-slate-500 dark:text-slate-400" />
               </div>
            ),
         };
      });
      setGeneresOptions(genresOptions);
      setInitialSelectedAuthor();
      setInitialSelectedGenre();
   }, [state?.book]);

   // set form data
   useEffect(() => {
      if (state?.book?.id) {
         let item: any;
         for (item in state.book) {
            setValue(item, _.get(state.book, item));
         }
         setPhoto(state.book.image);
      } else {
         setDefaultForm();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [state, setValue]);

   // check errors
   const checkErrors = () => {
      if ((selectedAuthors.length === 0 || selectedGenres.length === 0) && watch("title") && watch("publishDate"))
         return true;
      return _.isEmpty(errors) ? false : true;
   };

   // check year error
   const checkYearPublichDate = () => {
      if (selectedAuthors.length) {
         if (
            Number(selectedAuthors[0].data.born) + 12 <= watch("publishDate") &&
            watch("publishDate") <= (selectedAuthors[0].data.died || 2022)
         ) {
            return true;
         } else {
            setError("publishDate", { type: "year", message: "" });
            return false;
         }
      } else return false;
   };

   // on submit
   const onSubmit = (data: bookType) => {
      if (checkYearPublichDate()) {
         const objToSendServer: bookType = {
            ...data,
            genres: selectedGenres.map((genre: any) => {
               return genre.data;
            }),
            authorId: selectedAuthors[0].data.id,
            image: photo ? photo : data.image,
         };
         dispatch(updateBooksCommand(objToSendServer, state?.parent?.id || 0));
         setDefaultForm();
      }
   };

   // handle file input change
   const handleFileInputChange = (e: any) => {
      if (e?.target.files && e?.target.files[0]) {
         // only photo url
         setPhoto(URL.createObjectURL(e.target.files[0]));
      }
   };

   // handle clear image
   const handleClearImage = () => {
      setPhoto(null);
   };

   // --> author select box
   // set initial selected author
   const setInitialSelectedAuthor = () => {
      const index = authors.findIndex((item: authorType) => item.id === state?.book.authorId);
      if (index > -1) {
         const selectedList = [
            {
               data: authors[index],
               label: (
                  <div
                     key={index}
                     className="flex items-center justify-between gap-2 rounded-md hover:bg-white 
                     dark:hover:bg-slate-800 px-2 text-sm py-2 cursor-pointer"
                  >
                     <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full">
                           <img
                              src={authors[index].image}
                              alt="author"
                              className="w-full h-full object-cover rounded-full bg-slate-200 dark:bg-slate-600 text-2xs text-slate-400"
                           />
                        </div>
                        <p className="pt-1">{authors[index].name}</p>
                     </div>
                     <div className="pt-1 text-slate-500 dark:text-slate-400">
                        <FontAwesomeIcon icon={faPlus} />
                     </div>
                  </div>
               ),
            },
         ];
         setSelectedAuthors(selectedList);
      } else setSelectedAuthors([]);
   };
   // set author options
   const authorSelectInputOptions = (): optionType[] => {
      return authors.map((author: authorType, index: number) => {
         return {
            data: author,
            label: (
               <div
                  key={index}
                  className="flex items-center justify-between gap-2 rounded-md hover:bg-white 
                           dark:hover:bg-slate-800 px-2 text-sm py-2 cursor-pointer"
               >
                  <div className="flex items-center gap-2">
                     <div className="w-8 h-8 rounded-full">
                        <img
                           src={author.image}
                           alt="author"
                           className="w-full h-full object-cover rounded-full bg-slate-200 dark:bg-slate-600 text-2xs text-slate-400"
                        />
                     </div>
                     <p className="pt-1">{author.name}</p>
                  </div>
                  <div className="pt-1 text-slate-500 dark:text-slate-400">
                     <FontAwesomeIcon icon={faPlus} />
                  </div>
               </div>
            ),
         };
      });
   };

   // generate selected author
   const generateSelectedAuthor = (author: authorType) => {
      return (
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full">
               <img
                  src={author.image}
                  alt="author"
                  className="w-full h-full object-cover rounded-full bg-slate-200 dark:bg-slate-600 text-2xs text-slate-400"
               />
            </div>
            <p className="text-xs">{author.name}</p>
         </div>
      );
   };

   // get selected authors
   const getSelectedAuthors = (list: any) => {
      setSelectedAuthors(list);
   };
   // --> end of author select box

   // --> genre select box
   // set initial selected genre
   const setInitialSelectedGenre = () => {
      const selectedList =
         state?.book.genres.map((genre: genreType, index: number) => {
            return {
               data: genre,
               label: (
                  <div
                     key={index}
                     className="flex items-center justify-between gap-2 rounded-md hover:bg-white
                     dark:hover:bg-slate-800 px-2 text-sm py-2 cursor-pointer"
                  >
                     <p className="pt-1">{genre.name}</p>
                     <FontAwesomeIcon icon={faPlus} className="text-slate-500 dark:text-slate-400" />
                  </div>
               ),
            };
         }) || [];
      setSelectedGenres(selectedList);
   };

   // generate selected genre
   const generateSelectedGenre = (genre: genreType) => {
      return (
         <div className="flex items-center gap-2">
            <p className="text-xs">{genre.name}</p>
         </div>
      );
   };

   // get selected genres
   const getSelectedGenres = (list: any) => {
      setSelectedGenres(list);
   };

   // --> end of genre select box

   return (
      <div data-name="book-form" className="">
         <div data-name="book-form-image-container" className=" mb-3 ">
            {/* select photo */}
            <div
               data-name="select-photo-box"
               className={` border-2 rounded-md border-dashed dark:border-slate-600 ${
                  photo ? " p-2 " : " py-5 px-2 "
               } `}
            >
               {/* add-image-label */}
               <label
                  htmlFor="selectPhoto"
                  className={`add-image-label relative cursor-pointer h-full flex justify-center items-center gap-3 ${
                     photo && "hidden"
                  }`}
               >
                  {/* add-image-toLeft-arrow */}
                  <FontAwesomeIcon
                     className="absolute right-0 text-2xl dark:text-slate-400 text-slate-500"
                     icon={faAngleLeft}
                  />

                  {/* add-image-toRight-arrow */}
                  <FontAwesomeIcon
                     className="absolute left-0 text-2xl dark:text-slate-400 text-slate-500"
                     icon={faAngleRight}
                  />

                  {/* add-image-text */}
                  <span className="add-image-text absolute text-xs -ml-2 dark:text-slate-400 text-slate-500">
                     انتخاب کردن تصویر
                  </span>

                  {/* add-image-icon */}
                  <FontAwesomeIcon
                     icon={faFileCirclePlus}
                     className="add-image-icon text-5xl dark:text-slate-400 text-slate-500"
                  />
               </label>
               <label htmlFor="selectPhoto" className={` cursor-pointer ${!photo && "hidden"}`}>
                  <div
                     data-name="book-form-image-box"
                     className={`w-full h-60 md:h-80 rounded-md ${!photo && "hidden"}`}
                  >
                     <div className={`relative h-full w-full`}>
                        <button
                           onClick={() => handleClearImage()}
                           className="absolute top-2 right-2 bg-slate-700 px-3 pt-1.5 rounded-full text-center 
                                    text-white hover:bg-slate-900 transition-03"
                        >
                           <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <img
                           src={photo}
                           alt="book-img"
                           className="w-full h-full object-contain lg:object-cover rounded-md 
                                    bg-slate-200 dark:bg-slate-600 text-sm text-slate-400"
                        />
                     </div>
                  </div>
               </label>
               <input
                  ref={selectPhotoInput}
                  type="file"
                  id="selectPhoto"
                  className="hidden"
                  onChange={(e) => handleFileInputChange(e)}
               />
            </div>
         </div>
         <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-start ">
            <Input
               addClassNameInput=" h-10 py-1 pt-1.5 px-2 pl-14 "
               addClassNameLabel=" text-sm text-slate-500 dark:text-slate-400"
               label="Title"
               id="BookTitle"
               required={true}
               other={{ ...register("title", { required: true }) }}
            />
            <Input
               addClassNameInput=" h-10 py-1 pt-1.5 px-2 pl-20 "
               addClassNameLabel=" text-sm text-slate-500 dark:text-slate-400"
               label="Headline"
               id="BookHeadline"
               other={{ ...register("headline", { required: false }) }}
            />
            <Select
               addClassNameInput=" h-full py-1 pt-1 "
               addClassNameLabel=" text-sm text-slate-500 dark:text-slate-400 "
               addClassNameIcon=" h-7 pr-2 text-slate-500 dark:text-slate-400"
               addClassNameSelectedValueBox=" h-full"
               label="Author"
               required={true}
               options={authorSelectInputOptions()}
               selected={selectedAuthors}
               getSelectedItems={getSelectedAuthors}
               generateSelectedItem={generateSelectedAuthor}
               searchPath="name"
            />
            <Select
               addClassNameInput=" h-full py-1 pt-1 "
               addClassNameLabel=" text-sm text-slate-500 dark:text-slate-400 "
               addClassNameIcon=" h-7 pr-2 text-slate-500 dark:text-slate-400"
               addClassNameSelectedValueBox=" h-full"
               label="Genre"
               required={true}
               options={genresOptions}
               selected={selectedGenres}
               getSelectedItems={getSelectedGenres}
               generateSelectedItem={generateSelectedGenre}
               searchPath="name"
            />
            <Textarea
               addClassNameInput="  py-1 pt-12 px-2 "
               addClassNameLabel=" text-sm text-slate-500 dark:text-slate-400 pl-2 py-2 pt-2.5 w-full"
               addClassNameLabelBox=" w-full border "
               id="BookDescription"
               label="Description"
               other={{ register: register, name: "description", options: { required: false, maxLength: 4 } }}
            />
            <Input
               addClassNameInput=" h-10 py-1 pt-1.5 px-2 pl-27 "
               addClassNameLabel=" text-sm text-slate-500 dark:text-slate-400"
               label="Publish Date"
               type="number"
               id="BookPublishDate"
               required={true}
               other={{ ...register("publishDate", { required: true, maxLength: 4, max: 2022 }) }}
            />

            {/* errors */}
            {/* -- form */}
            <div
               dir="rtl"
               data-name="book-form-error"
               className={`text-xs text-red-600 bg-red-50 w-full dark:bg-slate-700 rounded-md p-1 items-center gap-2
                        ${checkErrors() ? "flex" : "hidden"}`}
            >
               <FontAwesomeIcon icon={faCircleDot} className="text-2xs w-2.5 h-2.5" />
               <p className="">لطفا فرم را پر کنید. </p>
            </div>
            {/* -- year less then 2022 */}
            <div
               dir="rtl"
               data-name="book-form-error"
               className={`text-xs text-red-600 bg-red-50 w-full dark:bg-slate-700 rounded-md p-1 items-center gap-2 
                        ${errors.publishDate?.type === "max" ? "flex" : "hidden"}`}
            >
               <FontAwesomeIcon icon={faCircleDot} className="text-2xs w-2.5 h-2.5" />
               <p className=""> سال انتشار باید کوچک تر از 2022 باشد. </p>
            </div>
            {/* -- year between author born and died year */}
            {selectedAuthors.length
               ? errors.publishDate?.type === "year" && (
                    <div
                       dir="rtl"
                       data-name="book-form-error"
                       className={`text-xs text-red-600 bg-red-50 w-full dark:bg-slate-700 rounded-md p-1 flex flex-col gap-2 `}
                    >
                       <div className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faCircleDot} className="text-2xs w-2.5 h-2.5" />
                          <p className="">
                             <span>سال انتشار باید بین</span>
                             <span className="px-1">{Number(selectedAuthors[0]?.data.born) + 12}</span>
                             <span>و</span>
                             <span className="px-1">
                                {selectedAuthors[0]?.data.died ? selectedAuthors[0]?.data.died : 2022}
                             </span>
                             <span>باشد.</span>
                          </p>
                       </div>
                       <div className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faCircleDot} className="text-2xs w-2.5 h-2.5" />
                          <p className="">حداقل سن نویسندگی 12 در نظر گرفته شده است.</p>
                       </div>
                    </div>
                 )
               : ""}

            <div className="w-full flex items-center justify-end">
               <SubmitButton extraClassName="w-16 flex justify-center gap-2">Done</SubmitButton>
            </div>
         </form>
      </div>
   );
}

export default BookForm;
