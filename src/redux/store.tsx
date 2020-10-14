import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxTunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import itemReducer from "./reducers/itemReducer";
import battleReducer from "./reducers/battleReducer";
import leagueReducer from "./reducers/leagueReducer";

const rootReducer = combineReducers({
  userReducer,
  itemReducer,
  battleReducer,
  leagueReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxTunk));

export default store;
