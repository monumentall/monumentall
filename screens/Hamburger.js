import React from "react";
import { View } from "react-native";
import HamburgerIcon from "./HamburgerIcon.js";
import Menu from "./Menu.js";
import { specificStyles } from "../styles";

export default class Hamburger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hamburgerActive: false,
      showMenu: false
    };
  }

  toggleHamburgerActive = () => {
    this.setState({ hamburgerActive: !this.state.hamburgerActive });
  };

  toggleShowMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  };

  render() {
    return (
      <View style={specificStyles.hamburger}>
        <HamburgerIcon
          active={this.state.hamburgerActive}
          onPress={() => {
            this.toggleHamburgerActive();
            this.toggleShowMenu();
          }}
        />
        <Menu
          visible={this.state.showMenu}
          setScreen={this.props.setScreen}
          toggleShowMenu={this.toggleShowMenu}
        />
      </View>
    );
  }
}
