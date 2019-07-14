import React from "react";
import { View } from "react-native";
import Hamburger from "react-native-hamburger";
import Menu from "./Menu.js";
import styles from "../styles";

export default class HamburgerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hamburgerActive: false
    };
  }

  render() {
    return (
      <View style={styles.hamburger}>
        <Hamburger
          active={this.state.hamburgerActive}
          type="cross"
          onPress={() =>
            this.setState({ hamburgerActive: !this.state.hamburgerActive })
          }
        />
        <Menu visible={this.state.hamburgerActive} />
      </View>
    );
  }
}
