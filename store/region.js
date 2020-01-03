import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import Constants from "../constants/Constants";

//Action Constants
const SET_REGION = "SET_REGION";
const SET_LOCATION_PERMISSIONS = "SET_LOCATION_PERMISSIONS";
const SET_NEARBY_REGION = "SET_NEARBY_REGION"

//Action Creators
export const setRegionAction = region => ({ type: SET_REGION, region });
export const setLocationPermissions = locationPermissions => ({
  type: SET_LOCATION_PERMISSIONS,
  locationPermissions
});
export const setNearbyRegionAction = region => ({ type: SET_NEARBY_REGION, region });

//Thunks
export const getLocationPermissionsAsync = () => async dispatch => {
  try {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    dispatch(setLocationPermissions(status));
  } catch (error) {
      console.log(error);
      dispatch(threwError(error));
  };
};

export const getUserLocationAsync = () => async () => {
  try {
    const location = await Location.getCurrentPositionAsync({});
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      longitudeDelta: Constants.latLongDelta,
      latitudeDelta: Constants.latLongDelta
    }
    return region;
  } catch (error) {
      console.log(error);
  };
};


//Sub-Reducer
const initialState = {
  locationPermissions: Constants.denied,
  region: {},
  nearbyRegion: {}
};

const region = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION_PERMISSIONS:
      return { ...state, locationPermissions: action.locationPermissions};
    case SET_REGION:
      return { ...state, region: action.region};
    case SET_NEARBY_REGION:
      return { ...state, nearbyRegion: action.region};
    default:
      return state;
  }
};

export default region;
