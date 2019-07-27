import React from "react";
import { View, Text, Dimensions } from "react-native";
import BottomDrawer from "rn-bottom-drawer";
import Landmark from "./Landmark";
import styles from "../styles";

const screenHeight = Math.round(Dimensions.get("window").height);

export default class Drawer extends React.Component {
  renderContent = () => {
    if (this.props.selectedLandmark.name) {
      return (
        <View>
          <Landmark details={this.props.selectedLandmark} />
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.headline}>Explore Brooklyn</Text>
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
