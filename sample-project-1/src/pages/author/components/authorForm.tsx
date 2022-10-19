/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";

// Components
import Input from "../../../components/input/inputDefault";
import SubmitButton from "../../../components/button/submitButton";

// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot, faAngleLeft, faAngleRight, faFileCirclePlus, faXmark } from "@fortawesome/free-solid-svg-icons";

// redux
// -- custom hooks
import { useDispatchHook } from "../../../store/hooks/useHooks";
// -- slice
import { authorType, updateAuthorsCommand } from "../../../store/slices/author";

type AuthorFormPropsType = {
   state: { author: authorType | null; authorBlockId: number } | null;
};

const initialState: authorType = { born: "", died: "", id: 0, country: "", image: "", name: "" };

function AuthorForm({ state }: AuthorFormPropsType) {
   // dispatch
   const dispatch = useDispatchHook();
   // state
   const [photo, setPhoto] = useState<any>(state?.author?.image);
   // ref
   const selectPhotoInput = useRef<any>(null);

   // react-hook-form
   const {
      register,
      handleSubmit,
      setValue,
      setError,
      watch,
      formState: { errors },
   } = useForm<authorType>();

   // clear form
   const setDefaultForm = () => {
      let item: any;
      for (item in initialState) {
         setValue(item, _.get(initialState, item));
      }
      handleClearImage();
   };

   // set form data
   useEffect(() => {
      if (state?.author?.id) {
         let item: any;
         for (item in state.author) {
            setValue(item, _.get(state.author, item));
         }
         setPhoto(state.author.image);
      } else {
         setDefaultForm();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [state, setValue]);

   // check year
   const checkYearIsDiedMoreThenBorn = () => {
      if (!watch("died")) return true;
      if (watch("died") > watch("born")) return true;
      setError("died", { type: "lessThenBorn", message: "" });
      return false;
   };

   // on submit
   const onSubmit = (data: authorType) => {
      if (checkYearIsDiedMoreThenBorn()) {
         const objToSendServer: authorType = {
            ...data,
            image: photo ? photo : data.image,
         };
         dispatch(updateAuthorsCommand(objToSendServer, state?.authorBlockId || 0));
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

   return (
      <div data-name="author-form" className="">
         <div data-name="author-form-image-container" className=" mb-3 ">
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
                     data-name="author-form-image-box"
                     className={`w-full h-60 md:h-80 rounded-md ${!photo && "hidden"}`}
                  >
                     <div className={`relative h-full w-full `}>
                        <button
                           onClick={() => handleClearImage()}
                           className="absolute top-2 right-2 bg-slate-700 px-3 pt-1.5 rounded-full text-center 
                                    text-white hover:bg-slate-900 transition-03"
                        >
                           <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <img
                           src={photo}
                           alt="author-img"
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
         <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 items-start ">
            <Input
               addClassNameInput=" h-10 py-1 pt-1.5 px-2 pl-16 "
               addClassNameLabel=" text-sm text-slate-500 dark:text-slate-400"
               label="Name"
               id="AuthorName"
               required={true}
               other={{ ...register("name", { required: true }) }}
            />
            <Input
               addClassNameInput=" h-10 py-1 pt-1.5 px-2 pl-18 "
               addClassNameLabel=" text-sm text-slate-500 dark:text-slate-400"
               label="Born in"
               type="number"
               id="AuthorBorn"
               required={true}
               other={{
                  ...register("born", {
                     required: true,
                     maxLength: 4,
                     max: 2010,
                     valueAsNumber: true,
                  }),
               }}
            />
            <Input
               addClassNameInput=" h-10 py-1 pt-1.5 px-2 pl-17 "
               addClassNameLabel=" text-sm text-slate-500 dark:text-slate-400"
               label="Died in"
               type="number"
               id="AuthorDied"
               other={{ ...register("died", { required: false, maxLength: 4, max: 2022, valueAsNumber: true }) }}
            />
            <Input
               addClassNameInput=" h-10 py-1 pt-1.5 px-2 pl-19 "
               addClassNameLabel=" text-sm text-slate-500 dark:text-slate-400"
               label="Country"
               id="AuthorCountry"
               required={true}
               other={{ ...register("country", { required: true }) }}
            />

            {/* errors */}
            {/* -- form */}
            <div
               dir="rtl"
               data-name="author-form-error"
               className={`text-xs text-red-600 bg-red-50 w-full dark:bg-slate-700 rounded-md p-1 items-center gap-2 
                        ${!_.isEmpty(errors) ? "flex" : "hidden"}`}
            >
               <FontAwesomeIcon icon={faCircleDot} className="text-2xs w-2.5 h-2.5" />
               <p className="">لطفا فرم را به درستی پر کنید. </p>
            </div>
            {/* -- year born less then 2010 */}
            <div
               dir="rtl"
               className={` text-xs text-red-600 bg-red-50 w-full dark:bg-slate-700 rounded-md p-1 ${
                  errors.born?.type === "max" ? "flex items-center gap-2" : "hidden"
               }`}
            >
               <FontAwesomeIcon icon={faCircleDot} className="text-2xs w-2.5 h-2.5" />
               <p>تاریخ تولد باید کوچک تر 2010 باشد </p>
            </div>
            {/* -- year died less then 2020 */}
            <div
               dir="rtl"
               className={` text-xs text-red-600 bg-red-50 w-full dark:bg-slate-700 rounded-md p-1 ${
                  errors.died?.type === "max" ? "flex items-center gap-2" : "hidden"
               }`}
            >
               <FontAwesomeIcon icon={faCircleDot} className="text-2xs w-2.5 h-2.5" />
               <p>تاریخ فوت باید کوچک تر 2020 باشد </p>
            </div>
            {/* -- year died must more then born  */}
            {errors.died?.type === "lessThenBorn" && (
               <div
                  dir="rtl"
                  className={` text-xs text-red-600 bg-red-50 w-full dark:bg-slate-700 rounded-md p-1 
                     flex items-center gap-2
                  `}
               >
                  <FontAwesomeIcon icon={faCircleDot} className="text-2xs w-2.5 h-2.5" />
                  <p>تاریخ فوت باید بزرگتر از تاریخ تولد باشد.</p>
               </div>
            )}
            <div className="w-full flex items-center justify-end">
               <SubmitButton extraClassName="w-16 flex justify-center gap-2">Done</SubmitButton>
            </div>
         </form>
      </div>
   );
}

export default AuthorForm;
