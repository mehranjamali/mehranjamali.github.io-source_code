import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import uiReducer from "./ui";
import userReducer from "./user";

// entities
// ui
// user
// ....
// combine all reducers and set it in to the store

export default combineReducers({
   entities: entitiesReducer,
   ui: uiReducer,
   user: userReducer,
});
