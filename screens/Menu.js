import React from "react";
import PropTypes from 'prop-types';
import { View, Text, Linking, Platform } from "react-native";
import { specificStyles } from "../styles";
import * as IntentLauncher from "expo-intent-launcher";
import Constants from "../constants/Constants";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  changeLocationSettings = async () => {
    if (Platform.OS === Constants.ios) {
      //Opens up settings so user can toggle their location on or off
      const supported = await Linking.canOpenURL(Constants.appSettings);
      if (!supported) {
        alert(
          "Cannot open app settings - please open settings manually to toggle location."
        );
      } else {
        Linking.openURL(Constants.appSettings);
      }
    } else {
      await IntentLauncher.startActivityAsync(
        IntentLauncher.ACTION_MANAGE_APPLICATIONS_SETTINGS
      );
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
            </View>
          </View>
        )}
      </View>
    );
  }
}

Menu.propTypes = {
  toggleShowMenu: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};
