import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import uiReducer from "./ui";
import meReducer from "./me";

// entities
// query
// user
// ....
// combine all reducers and set it in to the store

export default combineReducers({
   entities: entitiesReducer,
   // me: meReducer,
   // ui: uiReducer,
});
