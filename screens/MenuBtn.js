import React from "react";
import { View, Text } from "react-native";
import Menu from "./Menu.js";
import { specificStyles } from "../styles";

export default class MenuBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }

  toggleShowMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    return (
      <View>
        <Text style={specificStyles.menuBtn} onPress={this.toggleShowMenu}>
          X
        </Text>
        <Menu
          visible={this.state.showMenu}
          toggleShowMenu={this.toggleShowMenu}
        />
      </View>
    );
  }
}
