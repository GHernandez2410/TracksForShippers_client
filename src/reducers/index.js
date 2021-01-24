import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import shipments from "./shipments";

export default combineReducers({
  auth,
  message,
  shipments,
});
