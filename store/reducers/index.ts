import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {profileReducer} from "./profileReducer";

export const rootReducer = combineReducers({user: userReducer, profile: profileReducer})