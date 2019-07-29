import React from "react";
import { Text, View, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default class Settings extends React.Component {
  render() {
    return (
      <View
        style={{
          height: screenHeight,
          width: screenWidth,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{ fontSize: 30, fontWeight: "bold" }}
          onPress={() => this.props.setScreen("home")}
        >
          X
        </Text>
        <Text>Toggle Location Preferences</Text>
      </View>
    );
  }
}
