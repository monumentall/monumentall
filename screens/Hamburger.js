import React from "react";
import { View, Dimensions } from "react-native";
import HamburgerIcon from "./HamburgerIcon.js";
import Menu from "./Menu.js";
import { specificStyles } from "../styles";

export default class Hamburger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hamburgerActive: false
    };
  }

  render() {
    return (
      <View style={specificStyles.hamburger}>
        <HamburgerIcon
          active={this.state.hamburgerActive}
          onPress={() =>
            this.setState({ hamburgerActive: !this.state.hamburgerActive })
          }
        />
        <Menu visible={this.state.hamburgerActive} />
      </View>
    );
  }
}
