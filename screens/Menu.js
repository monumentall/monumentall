import React from "react";
import { View, Text, Linking } from "react-native";
import { specificStyles } from "../styles";
import screenNames from "../constants/ScreenNames";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  changeLocationSettings = async () => {
    //Opens up settings so user can toggle their location on or off
      const supported = await Linking.canOpenURL("app-settings:")
        if (!supported) {
            alert("Cannot open app settings - please open settings manually to toggle location.");
          } else {
            Linking.openURL("app-settings:");
          }
    //closes the menu before going to Settings
      this.props.toggleShowMenu();
  };

  render() {
    return (
      <View>
        {this.props.visible && (
          <View style={specificStyles.menuContainer}>
            <View style={specificStyles.menu}>
              <Text onPress={this.changeLocationSettings}>
                Toggle Location Settings
              </Text>
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
