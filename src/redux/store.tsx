import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxTunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import itemReducer from "./reducers/itemReducer";
import arenaReducer from "./reducers/arenaReducer";

const rootReducer = combineReducers({ userReducer, itemReducer, arenaReducer });

const store = createStore(rootReducer, applyMiddleware(ReduxTunk));

export default store;
