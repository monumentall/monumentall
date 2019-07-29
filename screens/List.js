import React from "react";
import { View, Text } from "react-native";
import data from "../data";

export default class List extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{ fontSize: 30, fontWeight: "bold" }}
          onPress={() => this.props.setScreen("home")}
        >
          X
        </Text>
        <Text>My Saved Landmarks:</Text>
        <Text>Landmark 1: {data[1].name}</Text>
      </View>
    );
  }
}
