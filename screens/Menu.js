import React from "react";
import { View, Text } from "react-native";
import { specificStyles } from "../styles";

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
              <Text onPress={() => this.props.setScreen("settings")}>
                Settings
              </Text>
              <Text onPress={() => this.props.setScreen("list")}>My List</Text>
              <Text
                onPress={() => {
                  this.props.setScreen("home");
                  this.props.toggleShowMenu();
                }}
              >
                Home
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}
