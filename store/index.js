import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import landmarks from './landmarks'

const reducer = combineReducers({landmarks});

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware)
);

export default store;
