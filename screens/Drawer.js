import React from "react";
import { View, Text } from "react-native";
import BottomDrawer from "rn-bottom-drawer";
import Landmark from "./Landmark";
import { reusableStyles } from "../styles";
import layout from "../constants/Layout";

const screenHeight = layout.window.height;

export default class Drawer extends React.Component {
  renderContent = () => {
    if (this.props.selectedLandmark.name) {
      return (
        <View>
          <Landmark landmarkDetails={this.props.selectedLandmark} />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={reusableStyles.headline}>Explore Brooklyn</Text>
        </View>
      );
    }
  };

  render() {
    return (
      <BottomDrawer
        containerHeight={screenHeight - 25}
        startUp={false}
        roundedEdges={true}
        shadow={true}
        downDisplay={screenHeight - screenHeight / 6}
        backgroundColor={"#f2e5e5"}
      >
        {this.renderContent()}
      </BottomDrawer>
    );
  }
}
