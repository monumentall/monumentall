import React from "react";
import { View, Text } from "react-native";
import { specificStyles } from "../styles";
import screenNames from "../constants/ScreenNames";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        {this.props.visible && (
          <View style={specificStyles.menuContainer}>
            <View style={specificStyles.menu}>
              <Text>Toggle Location Settings</Text>
              <Text onPress={() => this.props.setScreen(screenNames.list)}>
                Go To My List
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}
