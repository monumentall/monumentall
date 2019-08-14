import React from "react";
import { View, Text, AsyncStorage } from "react-native";
import screenNames from "../constants/ScreenNames";

export default class List extends React.Component {
  constructor() {
    super();
    this.state = {
      savedLandmarks: []
    };
  }

  componentDidMount() {
    AsyncStorage.getItem("savedLandmarks")
      .then(storedLandmarks => {
        let savedLandmarks = JSON.parse(storedLandmarks);
        this.setState({ savedLandmarks });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { savedLandmarks } = this.state;

    savedLandmarks.length && (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{ fontSize: 30, fontWeight: "bold" }}
          onPress={() => this.props.setScreen(screenNames.home)}
        >
          X
        </Text>
        <Text>My Saved Landmarks:</Text>
        {savedLandmarks.map((landmark, i) => {
          <Text>
            Landmark {i + 1}: {landmark.name}
          </Text>;
        })}
      </View>
    );

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{ fontSize: 30, fontWeight: "bold" }}
          onPress={() => this.props.setScreen(screenNames.home)}
        >
          X
        </Text>
        <Text>You haven't saved anything yet!</Text>
      </View>
    );
  }
}
