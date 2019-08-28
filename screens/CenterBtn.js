import React from "react";
import { View, Text } from "react-native";
import { specificStyles } from "../styles";

//Button to center user on map. Useful if they toggle their location back and forth, as map does not automatically re-center
const CenterBtn = ({ locationAccess, setMapRegion }) => {
  const buttonAction =
    locationAccess === "granted"
      ? () => setMapRegion("mapRegion")
      : () =>
          alert("Turn on location services to center map on your location.");
  return (
    <View>
      <Text style={specificStyles.centerBtn} onPress={buttonAction}>
        C
      </Text>
    </View>
  );
};

export default CenterBtn;
