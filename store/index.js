import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import landmarks from "./landmarks";
import selectedLandmark from "./selectedLandmark";
import directions from "./directions";
import region from "./region";

const reducer = combineReducers({
  landmarks,
  selectedLandmark,
  directions,
  region
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger));

export default store;
