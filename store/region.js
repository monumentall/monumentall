//Action Constants
const SET_REGION = "SET_REGION";

//Action Creators
export const setRegionAction = region => ({ type: SET_REGION, region });

//Sub-Reducer
const initialState = {};

const region = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGION:
      return action.region;
    default:
      return state;
  }
};

export default region;
