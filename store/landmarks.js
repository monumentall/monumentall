//Action Constants
const GOT_LANDMARKS = "GOT_LANDMARKS";
const THREW_ERROR = "THREW_ERROR";

//Action Creators
const gotLandmarks = landmarks => ({ type: GOT_LANDMARKS, landmarks });
const threwError = err => ({ type: ERROR_GETTING_LANDMARKS, err });

//Thunks
export const fetchLandmarks = db => async dispatch => {
  try {
    db.once("value", snap => {
      const data = [];
      snap.forEach(child => {
        const childObj = child.toJSON();
        data.push({ ...childObj });
      });
      dispatch(gotLandmarks(data));
    });
  } catch (error) {
    console.log(error);
    dispatch(threwError(error));
  }
};

//Sub-Reducer
const initialState = {
  data: {},
  err: false
};

const landmarks = (state = initialState, action) => {
  switch (action.type) {
    case GOT_LANDMARKS:
      return { ...state, data: action.landmarks, err: false };
    case THREW_ERROR:
      return { ...state, err: true };
    default:
      return state;
  }
};

export default landmarks;
