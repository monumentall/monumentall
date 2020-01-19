// import { GOOGLE_API_KEY } from 'react-native-dotenv'

//Action Constants
const SET_LANDMARK = "SET_LANDMARK";
const CLEAR_LANDMARK = "CLEAR_LANDMARK";

//Action Creators
const setLandmark = landmark => ({ type: SET_LANDMARK, landmark });
export const clearLandmarkAction = () => ({ type: CLEAR_LANDMARK });

//Thunks
export const selectLandmarkAction = data => async dispatch => {
  let placeId = data.placeId;
  let selectedLandmark = { ...data };

  //only check for placeDetails, if a placeId exists
  //and we haven't already determined there is none
  if (placeId) {
    const placeDetails = await fetchLandmarkDetails(placeId);
    selectedLandmark = placeDetails
      ? { ...selectedLandmark, ...placeDetails }
      : selectedLandmark;
  }
  dispatch(setLandmark(selectedLandmark));
};

const fetchLandmarkDetails = googlePlaceId => {
  return fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${googlePlaceId}&fields=opening_hours,formatted_phone_number,formatted_address&key=${GOOGLE_API_KEY}`
  )
    .then(responseDetails => {
      return responseDetails.json();
    })
    .then(placeDetails => {
      return placeDetails.result;
    })
    .catch(error => {
      console.error(error);
    });
};

//Sub-Reducer
const initialState = {};

const selectedLandmark = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANDMARK:
      return action.landmark;
    case CLEAR_LANDMARK:
      return {};
    default:
      return state;
  }
};

export default selectedLandmark;
