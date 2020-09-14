import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxTunk from "redux-thunk";

import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({ userReducer });

const store = createStore(rootReducer, applyMiddleware(ReduxTunk));

export default store;
