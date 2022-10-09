// redux
import { createSlice, createSelector } from "@reduxjs/toolkit";

// toast
import showToast from "../../utiles/toast";

// type
import { stateType, actionType } from "../types/type";

// service
import {
   getMainPostsListLocal,
   mainPostType,
} from "./../../pages/home/components/middle/components/mainPosts/mainPostsService";

// library
import moment from "moment";

//  type
type reasonType = {
   id: number;
   reason: string;
   desc?: string;
};

type reportPostReasonsListType = {
   id: number;
   title: string;
   reasons: reasonType[];
};

type HideReportPostType = {
   postId: number;
   reason: reasonType;
};

// Main Post Slice
const mainPostSlice = createSlice({
   name: "mainPost",
   initialState: { loading: false, lastFetch: null, error: "", data: [] } as stateType<mainPostType[]>,
   reducers: {
      mainPostRequested: (state: stateType<mainPostType[]>, action: actionType<string>) => {
         console.log(action);
         state.loading = true;
         state.error = "";
      },
      mainPostReceived: (state: stateType<mainPostType[]>, action: actionType<mainPostType[]>) => {
         state.loading = false;
         state.lastFetch = Date.now();
         state.error = "";
         state.data = action.payload;
      },
      mainPostSaved: (
         state: stateType<mainPostType[]>,
         action: actionType<{ needAuthorization: boolean; data: number }>
      ) => {
         const index = state.data.findIndex((x) => x.id === action.payload.data);
         if (index > -1) {
            state.data[index].saved = !state.data[index].saved;
            state.data[index].saved
               ? showToast("پست ذخیره شد.", "success")
               : showToast("پست از لیست حذف شد.", "success");
         } else {
            showToast("مشکلی رخ داده است", "error");
         }
      },
      mainPostLiked: (state: stateType<mainPostType[]>, action: actionType<{ id: number; like: boolean }>) => {
         const index = state.data.findIndex((x) => x.id === action.payload.id);
         // check index is valid
         if (index > -1) {
            // check action payload like status
            // like
            if (action.payload.like) {
               if (!state.data[index].liked) {
                  state.data[index].numberOfLike = state.data[index].numberOfLike + 1;
                  state.data[index].liked = true;
               }
            }
            // check action payload like status
            // unlike
            else {
               if (state.data[index].liked) {
                  state.data[index].numberOfLike = state.data[index].numberOfLike - 1;
                  state.data[index].liked = false;
               }
            }
         }
      },
      mainPostHideed: (
         state: stateType<mainPostType[]>,
         action: actionType<{ needAuthorization: boolean; data: HideReportPostType }>
      ) => {
         showToast(`پست مخفی شد به علت اینکه : ${action.payload.data.reason.reason}`, "success", 3000);
      },
      mainPostReported: (
         state: stateType<mainPostType[]>,
         action: actionType<{ needAuthorization: boolean; data: HideReportPostType }>
      ) => {
         showToast(`پست گزارش شد به علت اینکه : ${action.payload.data.reason.reason} `, "success", 3000);
      },
      mainPostAdded: (
         state: stateType<mainPostType[]>,
         action: actionType<{ needAuthorization: boolean; data: mainPostType }>
      ) => {
         state.data.unshift(action.payload.data);
      },
   },
});

// Commands
// fetch
const fetchMainPostsCommand = () => (dispatch: any, getState: any) => {
   // caching
   const { lastFetch } = getState().entities.mainPosts;
   const timeDiff = moment().diff(lastFetch, "minutes");
   if (timeDiff < 3) {
      // showToast("شما نمی توانید کمتر از 3 دقیقه درخواست دریافت دوباره اطلاعات را بدهید", "info", 2000);
      //   console.log("you can't send a new request less then 3 minutes");
      return;
   }
   dispatch(mainPostSlice.actions.mainPostRequested("requested"));
   return dispatch(mainPostSlice.actions.mainPostReceived(getMainPostsListLocal()));
};

// save
const saveMainPostCommand = (id: number) => {
   return mainPostSlice.actions.mainPostSaved({ needAuthorization: true, data: id });
};

// like
const likeMainPostCommand = (id: number, like: boolean) => {
   return mainPostSlice.actions.mainPostLiked({ id: id, like: like });
};

// hide
const hideMainPostCommand =
   ({ postId, reason }: HideReportPostType) =>
   (dispatch: any) => {
      // dispatch(mainPostSlice.actions.mainPostSaved(postId));
      return dispatch(mainPostSlice.actions.mainPostHideed({ needAuthorization: true, data: { postId, reason } }));
   };

// report
const reportMainPostCommand =
   ({ postId, reason }: HideReportPostType) =>
   (dispatch: any) => {
      // dispatch(mainPostSlice.actions.mainPostSaved(postId));
      return dispatch(mainPostSlice.actions.mainPostReported({ needAuthorization: true, data: { postId, reason } }));
   };

const addMainPostCommand = (mainPost: any) => (dispatch: any) => {
   let mainPostObj: mainPostType = {
      id: Date.now(),
      creatorId: 1234,
      description: "توسعه دهنده Frontend React (Redux)",
      userImageUrl: process.env.REACT_APP_USER_IMG_URL ? process.env.REACT_APP_USER_IMG_URL : "",
      isOnline: true,
      liked: false,
      name: "مهران جمالی",
      numberOfComments: 0,
      numberOfLike: 0,
      postTime: "دقایقی پیش",
      saved: false,
      postContent: {
         text: mainPost.text,
         imgUrl: mainPost.imgUrl,
         tags: [
            { tagName: "react", link: "hashtag/react" },
            { tagName: "frontend", link: "hashtag/frontend" },
            { tagName: "js", link: "hashtag/js" },
            { tagName: "ts", link: "hashtag/ts" },
            { tagName: "برنامه نویسی", link: "hashtag/برنامه نویسی" },
         ],
      },
   };

   dispatch(mainPostSlice.actions.mainPostAdded({ needAuthorization: true, data: mainPostObj }));
};

// end of --> Commands

// Selectors
const getMainPostsSelector = createSelector(
   (state: any) => state.entities.mainPosts,
   (mainPosts: any) => mainPosts
);

const getSavedPostsSelector = createSelector(
   (state: any) => state.entities.mainPosts,
   (mainPosts: any) => {
      return { ...mainPosts, data: mainPosts.data.filter((x: mainPostType) => x.saved) };
   }
);

const getMainPostsByUserIdSelector = createSelector(
   (state: any) => state.entities.mainPosts,
   (mainPosts: any) => {
      return { ...mainPosts, data: mainPosts.data.filter((x: mainPostType) => x.creatorId === 1234) };
   }
);
// end of --> Selectors

// exports
// type
export type { HideReportPostType, mainPostType, reasonType, reportPostReasonsListType };

// commands
export {
   fetchMainPostsCommand,
   saveMainPostCommand,
   hideMainPostCommand,
   reportMainPostCommand,
   likeMainPostCommand,
   addMainPostCommand,
};

// selector
export { getMainPostsSelector, getSavedPostsSelector, getMainPostsByUserIdSelector };
// reducer
export default mainPostSlice.reducer;
