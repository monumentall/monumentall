
//Action Constants
const GOT_LANDMARKS = "GOT_LANDMARKS"

//Action Creators
const gotLandmarks = landmarks => ({type: GOT_LANDMARKS, landmarks})

//Thunks
export const fetchLandmarks = (db) => async dispatch => {
  try {
      db.once("value", snap => {
        const data = [];
        snap.forEach(child => {
          const childObj = child.toJSON();
          data.push({ ...childObj });
        });
        dispatch(gotLandmarks(data))
      });
  } catch (error) {
    console.log("Error fetching from database.")
  }
}


//Sub-Reducer
const initialState = []

const landmarks = (state = initialState, action) => {
  switch(action.type) {
    case GOT_LANDMARKS: return action.landmarks;
    default: return state;
  }
}

export default landmarks;
