import React from "react";
import { View } from "react-native";
import Map from "./Map";
import Drawer from "./Drawer";
import Settings from "./Settings";
import List from "./List";
import { specificStyles } from "../styles";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLandmark: {},
      screen: "home"
    };
    this.selectLandmark = this.selectLandmark.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  selectLandmark = data => {
    this.setState({
      selectedLandmark: data
    });
  };

  setScreen = screen => {
    this.setState({
      screen
    });
  };

  selectComponent = () => {
    if (this.state.screen === "settings") {
      return <Settings setScreen={this.setScreen} />;
    } else if (this.state.screen === "list") {
      return <List setScreen={this.setScreen} />;
    } else {
      return (
        <View>
          <Map
            selectLandmark={this.selectLandmark}
            setScreen={this.setScreen}
          />
          <Drawer selectedLandmark={this.state.selectedLandmark} />
        </View>
      );
    }
  };

  render() {
    return <View style={specificStyles.main}>{this.selectComponent()}</View>;
  }
}
