import React from "react";
import BottomDrawer from "rn-bottom-drawer";
import layout from "../constants/Layout";
import ExploreBrooklyn from "./ExploreBrooklyn";

const screenHeight = layout.window.height;

export default class Drawer extends React.Component {
  renderContent = () => {
    return (
      <ExploreBrooklyn
        landmarks={this.props.landmarks}
        landmarkDetails={this.props.selectedLandmark}
        getDirections={this.props.getDirections}
      />
    );
  };

  render() {
    return (
      <BottomDrawer
        containerHeight={screenHeight - 25}
        startUp={false}
        roundedEdges={true}
        shadow={true}
        downDisplay={screenHeight - screenHeight / 2.65}
        backgroundColor={"transparent"}
      >
        {this.renderContent()}
      </BottomDrawer>
    );
  }
}
