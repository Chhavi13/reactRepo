import { combineReducers } from "redux";
import { loadingReducer } from "../LoadingReducer";
import { authReducer, logoutReducer } from "./../authReducer";
import { approvalsReducer } from "../approvalsReducer";
import { getOfferReducer } from "../getOfferReducer";
import { addressReducer } from "../addressReducer";
import {manageStoreReducer} from "../manageStoreReducer"
/* ------------- Assemble The Reducers ------------- */
const rootReducer = combineReducers({
  loadingReducer,
  authReducer,
  logoutReducer,
  approvalsReducer,
  getOfferReducer,
  addressReducer,
  manageStoreReducer
  
});
export default rootReducer;
