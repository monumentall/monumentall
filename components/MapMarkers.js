import PropTypes from "prop-types";
import React from "react";
import { Marker } from "react-native-maps";

const MapMarkers = ({ markers, setRegionAndSelectLandmark }) => {
  if (markers) {
    return markers.map(marker => (
      <Marker
        key={marker.name}
        coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
        title={marker.name}
        onPress={event => setRegionAndSelectLandmark(event, marker)}
      />
    ));
  } else return null;
};

MapMarkers.propTypes = {
  markers: PropTypes.array,
  setRegionAndSelectLandmark: PropTypes.func
};

export default MapMarkers;
