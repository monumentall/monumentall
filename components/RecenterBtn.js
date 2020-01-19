import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { specificStyles } from "../styles";
import PropTypes from "prop-types";

const RecenterButton = ({ enabled, centerMap }) => {
  return enabled ? (
    <TouchableOpacity
      style={specificStyles.centerBtnContainer}
      onPress={centerMap}
    >
      <Image
        style={{ width: 50, height: 50 }}
        source={require("../assets/images/placeholder-map-icon.png")}
      />
    </TouchableOpacity>
  ) : null;
};

export default RecenterButton


RecenterButton.propTypes = {
  enabled: PropTypes.bool,
  centerMap: PropTypes.func
}
