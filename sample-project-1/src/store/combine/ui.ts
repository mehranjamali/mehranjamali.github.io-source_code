import { combineReducers } from "redux";
import uiControllerReducer from "../slices/uiController";


// reducers about 'DOM', 'ui stuff', ....
export default combineReducers({
   controller: uiControllerReducer,
});
