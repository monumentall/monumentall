import * as Location from "expo-location";
import Constants from "expo-constants";
import { decode } from "../util";

//Action constants
const SET_DIRECTIONS = "SET_DIRECTIONS";
const CLEAR_DIRECTIONS = "CLEAR_DIRECTIONS";

//Action creators
const setDirections = directions => ({ type: SET_DIRECTIONS, directions });
export const clearDirectionsAction = () => ({ type: CLEAR_DIRECTIONS });

//Thunks
export const getDirectionsAction = landmarkCoordinates => async dispatch => {
  const location = await Location.getCurrentPositionAsync({});
  const {
    coords: { latitude: initialLat, longitude: initialLong }
  } = location;
  const { latitude: finalLat, longitude: finalLong } = landmarkCoordinates;

  let response = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?origin=${initialLat},${initialLong}&destination=${finalLat},${finalLong}&mode=walking&key=${Constants.manifest.extra.googleApiKey}`
  );
  let data = await response.json();
  if (data.routes.length) {
    const coordinates = decode(data.routes[0].overview_polyline.points);
    dispatch(setDirections({ show: true, coordinates }));
  }
  // TODO: need some kind of error handling if no directions are available
  // TODO: close drawer when get directions (reset drawer height?)
};

//Sub-reducer
const initialState = {};

const directions = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIRECTIONS:
      return action.directions;
    case CLEAR_DIRECTIONS:
      return {};
    default:
      return state;
  }
};

export default directions;
