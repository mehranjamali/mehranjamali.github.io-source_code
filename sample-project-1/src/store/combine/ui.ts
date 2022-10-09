import { combineReducers } from "redux";
import uiControllerReducer from "../slices/uiController";

// i will add search and router reducers in here

// reducers about 'DOM', 'ui stuff', ....
export default combineReducers({
   controller: uiControllerReducer,
});
