import React from "react";
import { View } from "react-native";
import Map from "./Map";
import Drawer from "./Drawer";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLandmark: {}
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Map selectLandmark={this.selectLandmark} />
        <Drawer selectedLandmark={this.state.selectedLandmark} />
      </View>
    );
  }
}
