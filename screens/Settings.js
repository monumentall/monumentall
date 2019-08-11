import React from "react";
import { Text, View } from "react-native";
import layout from "../constants/Layout";
import screenNames from "../constants/ScreenNames";

export default class Settings extends React.Component {
  render() {
    return (
      <View
        style={{
          height: layout.window.height,
          width: layout.window.width,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{ fontSize: 30, fontWeight: "bold" }}
          onPress={() => this.props.setScreen(screenNames.home)}
        >
          X
        </Text>
        <Text>Toggle Location Preferences</Text>
      </View>
    );
  }
}
