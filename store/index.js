import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import landmarks from './landmarks'
import selectedLandmark from './selectedLandmark'
import directions from './directions'

const reducer = combineReducers({landmarks, selectedLandmark, directions});

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware)
);

export default store;
