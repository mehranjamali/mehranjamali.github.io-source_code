import { combineReducers } from "redux";
import postsReducer from "../slices/posts";

// reducers about app slices
export default combineReducers({
   posts: postsReducer,
});
