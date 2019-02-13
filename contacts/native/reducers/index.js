import contacts from "./contactsReducer";
import user from "./userReducer";
import { combineReducers } from "redux";

const appReducer = combineReducers({
  contacts,
  user
});

export default appReducer;
