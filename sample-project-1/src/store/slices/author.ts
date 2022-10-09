import { getAuthorsList } from "./../../pages/author/authorService";
import { RootState } from "./../hooks/useHooks";
import { createSlice, createSelector } from "@reduxjs/toolkit";
import {
   authorBlockObjType,
   getAuthorsWithBooksList,
   bookType,
   authorType,
   genreType,
} from "../../pages/author/authorService";
import { actionType, stateType, apiBodyType } from "../types/type";

import showToast from "../../utiles/toast";
import moment from "moment";

type authorStateType = {
   authorBlockData: authorBlockObjType[];
   authors: authorType[];
};

// initial state
const initialState: stateType<authorStateType> = {
   error: "",
   data: { authorBlockData: [], authors: [] },
   lastFetch: null,
   loading: false,
};

// Slice
const authorsWithBooksSlice = createSlice({
   name: "authorsWithBooks",
   initialState: initialState,
   reducers: {
      authorsWithBooksRequested: (state: stateType<authorStateType>) => {
         state.loading = true;
         state.error = "";
      },
      authorsWithBooksReceived: (state: stateType<authorStateType>, action: actionType<authorStateType>) => {
         state.loading = false;
         state.error = "";
         state.data.authorBlockData = action.payload.authorBlockData;
         state.data.authors = action.payload.authors;
         state.lastFetch = Date.now();
      },
      authorsWithBooksFailed: (state: stateType<authorStateType>, action: actionType<string>) => {
         state.error = action.payload;
         state.loading = false;
         state.data = initialState.data;
         showToast(action.payload, "error", 2000);
      },
      authorBlockDeleted: (state: stateType<authorStateType>, action: actionType<authorBlockObjType>) => {
         showToast(`نویسنده "${action.payload.author.name}" حذف شد.`, "success", 2000);
         state.data.authorBlockData = state.data.authorBlockData.filter(
            (item: authorBlockObjType) => item.id !== action.payload.id
         );
      },
      authorAdded: (state: stateType<authorStateType>, action: actionType<authorType>) => {
         state.data.authorBlockData.push({
            id: Number(Date.now()),
            author: { ...action.payload, id: Number(Date.now()) },
            books: [],
         });
         state.data.authors.push({ ...action.payload, id: Number(Date.now()) });
      },
      authorEdited: (
         state: stateType<authorStateType>,
         action: actionType<{ author: authorType; authorBlockId: number }>
      ) => {
         // edit in author block list
         const indexInBlockList = state.data.authorBlockData.findIndex(
            (item: authorBlockObjType) => item.id === action.payload.authorBlockId
         );
         state.data.authorBlockData[indexInBlockList].author = action.payload.author;
         // edit in author list
         const indexInAuthorList = state.data.authors.findIndex(
            (item: authorType) => item.id === action.payload.author.id
         );
         state.data.authors[indexInAuthorList] = action.payload.author;
      },
      bookAdded: (state: stateType<authorStateType>, action: actionType<bookType>) => {
         const index = state.data.authorBlockData.findIndex(
            (item: authorBlockObjType) => item.author.id === action.payload.authorId
         );
         state.data.authorBlockData[index].books.push({ ...action.payload, id: Number(Date.now()) });
      },
      bookEdited: (
         state: stateType<authorStateType>,
         action: actionType<{ book: bookType; authorBlockId: number }>
      ) => {
         const currentAuthorBlockIndex = state.data.authorBlockData.findIndex(
            (item: authorBlockObjType) => item.id === action.payload.authorBlockId
         );
         const bookIndex = state.data.authorBlockData[currentAuthorBlockIndex].books.findIndex(
            (book: bookType) => book.id === action.payload.book.id
         );
         // same author
         if (action.payload.book.authorId === state.data.authorBlockData[currentAuthorBlockIndex].author.id) {
            state.data.authorBlockData[currentAuthorBlockIndex].books[bookIndex] = action.payload.book;
         } else {
            state.data.authorBlockData[currentAuthorBlockIndex].books.splice(bookIndex, 1);
            // diffrent author
            const newAuthorBlockIndex = state.data.authorBlockData.findIndex(
               (item: authorBlockObjType) => item.author.id === action.payload.book.authorId
            );
            state.data.authorBlockData[newAuthorBlockIndex].books.push(action.payload.book);
         }
      },
      bookDeleted: (
         state: stateType<authorStateType>,
         action: actionType<{ book: bookType; authorBlock: authorBlockObjType }>
      ) => {
         showToast(`نویسنده "${action.payload.book.title}" حذف شد.`, "success", 2000);
         const index = state.data.authorBlockData.findIndex(
            (x: authorBlockObjType) => x.id === action.payload.authorBlock.id
         );
         state.data.authorBlockData[index] = {
            ...state.data.authorBlockData[index],
            books: state.data.authorBlockData[index].books.filter(
               (item: bookType) => item.id !== action.payload.book.id
            ),
         };
      },
   },
});

// Commands
// -- fetch Authors with books
const fetchAuthorsWithBooksCommand = () => (dispatch: any, getState: any) => {
   const { lastFetch } = getState().entities.authorsWithBooks;
   const timeDiff = moment().diff(lastFetch, "minutes");
   if (timeDiff < 3) return console.log("you can't send a new request less then 3 minutes");
   dispatch(authorsWithBooksSlice.actions.authorsWithBooksRequested());
   setTimeout(() => {
      return dispatch(
         authorsWithBooksSlice.actions.authorsWithBooksReceived({
            authors: getAuthorsList(),
            authorBlockData: getAuthorsWithBooksList(),
         })
      );
   }, 800);
};

// -- do filter on authors
const authorWithBooksSearchQueryDoFilterCommand = () => {
   return createSelector(
      (state: stateType<authorStateType>) => state,
      (_: any, query: string) => query,
      (state: stateType<authorStateType>, query: string) => {
         return {
            ...state,
            data: {
               ...state.data,
               authorBlockData: state.data.authorBlockData.filter((item: authorBlockObjType) =>
                  item.author.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
               ),
            },
         };
      }
   );
};

// -- delete author block
const deleteAuthorBlockCommand = (block: authorBlockObjType) => {
   return authorsWithBooksSlice.actions.authorBlockDeleted(block);
};
// -- delete book
const deleteBookCommand = (book: bookType, authorBlock: authorBlockObjType) => {
   return authorsWithBooksSlice.actions.bookDeleted({ book: book, authorBlock: authorBlock });
};
// -- update authors
const updateAuthorsCommand = (author: authorType, authorBlockId: number) => {
   if (authorBlockId === 0) return authorsWithBooksSlice.actions.authorAdded(author);
   return authorsWithBooksSlice.actions.authorEdited({ author: author, authorBlockId: authorBlockId });
};
// --  update Books
const updateBooksCommand = (book: bookType, authorBlockId: number) => {
   if (authorBlockId === 0) return authorsWithBooksSlice.actions.bookAdded(book);
   return authorsWithBooksSlice.actions.bookEdited({ book: book, authorBlockId: authorBlockId });
};

// end of Commands
// Selectors
const authorsWithBooksSelector = createSelector(
   (state: RootState) => state.entities.authorsWithBooks,
   (authorsWithBooks: stateType<authorStateType>) => authorsWithBooks
);

// exports
// -- type
export type { authorStateType, authorBlockObjType, stateType, bookType, authorType, genreType };

// -- command
export {
   fetchAuthorsWithBooksCommand,
   authorWithBooksSearchQueryDoFilterCommand,
   deleteAuthorBlockCommand,
   deleteBookCommand,
   updateAuthorsCommand,
   updateBooksCommand,
};

// -- selector
export { authorsWithBooksSelector };

// -- reducer
export default authorsWithBooksSlice.reducer;
