import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import landmarks from "./landmarks";
import selectedLandmark from "./selectedLandmark";
import directions from "./directions";
import mapDetails from './mapDetails'
import region from "./region";

const reducer = combineReducers({
  landmarks,
  selectedLandmark,
  directions,
  mapDetails,
  region
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;
