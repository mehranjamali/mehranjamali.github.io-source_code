import { createSlice, createSelector } from "@reduxjs/toolkit";
import { stateType, actionType } from "../types/type";
import { apiCallBegan } from "../services/apiService";
import showToast from "../../utiles/toast";
import { type } from "os";

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
   initialState: { data: [], error: "", loading: false } as stateType<postType[]>,
   reducers: {
      postsRequested: (postsState: stateType<postType[]>, action: actionType<string>) => {
         postsState.loading = true;
         postsState.error = "";
      },
      postsRequestFailed: (postsState: stateType<postType[]>, action: actionType<string>) => {
         postsState.loading = false;
         postsState.error = action.payload;
         showToast(action.payload);
      },
      postsReceived: (postsState: stateType<postType[]>, action: actionType<postType[]>) => {
         postsState.loading = false;
         postsState.data = action.payload;
         postsState.error = "";
      },
   },
});

// url
const postsUrl = "posts";

// commands
const fetchPosts = () => {
   return apiCallBegan({
      url: postsUrl,
      method: "get",
      onStart: postsSlice.actions.postsRequested.type,
      onSuccess: postsSlice.actions.postsReceived.type,
      onError: postsSlice.actions.postsRequestFailed.type,
      needAuthorization: true,
   });
};

// selectors
const selectPosts = (state: any) => {
   return createSelector(
      (state: any) => state.entities.posts,
      (posts: any) => posts
   )(state);
};

const selectPostsByUser = (state: any, userId: number) => {
   return createSelector(
      (state: any) => state.entities.posts,
      (posts: any) => {
         return {
            ...posts,
            data: posts.data.filter((post: any) => post.userId === userId),
         };
      }
   )(state);
};

// export type
export type { postType };
// export commands
export { fetchPosts };
// export selectors
export { selectPosts, selectPostsByUser };
// export default reducer
export default postsSlice.reducer;
