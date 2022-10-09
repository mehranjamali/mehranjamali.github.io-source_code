import { combineReducers } from "redux";
import authUserReducer from "../slices/user";
// reducers about user

export default combineReducers({
   auth: authUserReducer,
});
