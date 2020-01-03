//Action Constants
const SET_REGION = "SET_REGION";
const SET_NEARBY_REGION = "SET_NEARBY_REGION"

//Action Creators
export const setRegionAction = region => ({ type: SET_REGION, region });
export const setNearbyRegionAction = region => ({ type: SET_NEARBY_REGION, region });

//Sub-Reducer
const initialState = {
  region: {},
  nearbyRegion: {}
};

const region = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGION:
      return { ...state, region: action.region};
    case SET_NEARBY_REGION:
      return { ...state, nearbyRegion: action.region};
    default:
      return state;
  }
};

export default region;
