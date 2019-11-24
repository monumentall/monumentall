
//Action Constants
const SET_LANDMARK = "SET_LANDMARK"

//Action Creators
export const setLandmark = (landmark) => ({type: SET_LANDMARK, landmark})

//Thunks
export const selectLandmark = (data) => async dispatch => {
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
 dispatch(setLandmark(selectedLandmark))
}

const fetchLandmarkDetails = (googlePlaceId) => {
  return fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${googlePlaceId}&fields=opening_hours,formatted_phone_number,formatted_address&key=${Constants.google.apiKey}`
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
}


//Sub-Reducer
const initialState = {}


const selectedLandmark = (state = initialState, action) => {
  switch (action.type) {
  case SET_LANDMARK: return action.landmark
  default: return state;
  }
}

export default selectedLandmark;
