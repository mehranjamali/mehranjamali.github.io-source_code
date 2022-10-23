import { createSlice, createSelector } from "@reduxjs/toolkit";
import { stateType, actionType } from "../types/type";
import { apiCallBegan } from "../services/apiService";
import showToast from "../../utiles/toast";
import moment from "moment";

// types
type postType = {
   userId: number;
   id: number;
   title: string;
   body: string;
};

// slice
const postsSlice = createSlice({
   name: "posts",
   initialState: { data: [], lastFetch: null, error: "", loading: false } as stateType<postType[]>,
   reducers: {
      postsRequested: (postsState: stateType<postType[]>, action: actionType<string>) => {
         postsState.loading = true;
         postsState.error = "";
      },
      postsRequestFailed: (postsState: stateType<postType[]>, action: actionType<string>) => {
         postsState.loading = false;
         postsState.error = action.payload;
         postsState.data = [];
         postsState.lastFetch = null;
         showToast(action.payload);
      },
      postsReceived: (postsState: stateType<postType[]>, action: actionType<postType[]>) => {
         postsState.loading = false;
         postsState.data = action.payload;
         postsState.lastFetch = Date.now();
         postsState.error = "";
      },
   },
});

// url
const postsUrl = "/posts";

// commands
const fetchPosts = () => (dispatch: any, getState: any) => {
   // caching with time
   const { lastFetch } = getState().entities.posts;
   const timeDiff = moment().diff(lastFetch, "minutes");
   if (timeDiff < 3) {
      console.log("you can't send a new request less then 3 minutes");
      return;
   }
   return dispatch(
      apiCallBegan({
         url: postsUrl,
         method: "get",
         onStart: postsSlice.actions.postsRequested.type,
         onSuccess: postsSlice.actions.postsReceived.type,
         onError: postsSlice.actions.postsRequestFailed.type,
         needAuthorization: false,
      })
   );
};

// selectors
const selectPosts = createSelector(
   (state: any) => state.entities.posts,
   (posts: any) => posts
);

const selectPostsByUser = () =>
   createSelector(
      (state: any) => state.entities.posts,
      (_: any, userId: any) => userId,
      (posts: any, userId: any) => {
         return {
            ...posts,
            data: posts.data.filter((post: any) => post.userId === userId),
         };
      }
   );

// export type
export type { postType };
// export commands
export { fetchPosts };
// export selectors
export { selectPosts, selectPostsByUser };
// export default reducer
export default postsSlice.reducer;
