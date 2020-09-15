import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxTunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import itemReducer from "./reducers/itemReducer";

const rootReducer = combineReducers({ userReducer, itemReducer });

const store = createStore(rootReducer, applyMiddleware(ReduxTunk));

export default store;
