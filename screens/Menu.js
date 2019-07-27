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
              <Text>Settings</Text>
              <Text>My List</Text>
              <Text>Home</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}
