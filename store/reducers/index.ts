import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {profileReducer} from "./profileReducer";
import {postsReducer} from "./postsReducer";

export const rootReducer = combineReducers({user: userReducer, profile: profileReducer, posts: postsReducer})