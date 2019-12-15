import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import landmarks from './landmarks'
import selectedLandmark from './selectedLandmark'
import directions from './directions'
import mapDetails from './mapDetails'

const reducer = combineReducers({landmarks, mapDetails, selectedLandmark, directions});

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware)
);

export default store;
