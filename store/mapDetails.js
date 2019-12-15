import * as Location from "expo-location";
import Constants from "expo-constants";

const initialState = {
    initialRegion: {},
    region: {},
};

//Action constants
const SET_MAP_REGION = "SET_MAP_REGION";

//Action creators
export const setMapRegion = coordinates => ({
    type: SET_MAP_REGION,
    coordinates
});

//Sub-reducer
const mapDetails = (state = initialState, action) => {
    switch (action.type) {
        case SET_MAP_REGION:
            return {...state, region: action.coordinates};
        default:
            return state;
    }
};

export default mapDetails;
