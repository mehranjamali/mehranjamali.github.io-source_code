import { combineReducers } from "redux";
import postsReducer from "../slices/posts";
import mainPostsReducer from "../slices/fakePost";
import authorsWithBooksReducer from "../slices/author";

// reducers about app slices
export default combineReducers({
   posts: postsReducer,
   mainPosts: mainPostsReducer,
   authorsWithBooks: authorsWithBooksReducer,
});
