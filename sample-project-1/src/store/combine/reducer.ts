import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import uiReducer from "./ui";
import userReducer from "./user";

export default combineReducers({
   entities: entitiesReducer,
   ui: uiReducer,
   user: userReducer,
});
