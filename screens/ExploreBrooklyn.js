import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { reusableStyles, specificStyles } from "../styles";
import NearMe from "./NearMe";
import List from "./List";
import Landmark from "./Landmark";

export default class ExploreBrooklyn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSavedList: false,
      showNearMe: true
    };
  }

  showSavedListView = () => {
    this.setState({
      showNearMe: false,
      showSavedList: true
    });
  };

  showNearMeView = () => {
    this.setState({
      showNearMe: true,
      showSavedList: false
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.landmarkDetails !== this.props.landmarkDetails) {
      this.setState({
        showNearMe: false,
        showSavedList: false
      });
    }
  }

  render() {
    const { showNearMe, showSavedList } = this.state;
    const showLandmarkDetails =
      this.props.landmarkDetails.name && !showNearMe && !showSavedList;

    const { getDirections, landmarks, nearbyLandmarks } = this.props;

    return (
      <View style={reusableStyles.block}>
        <View style={reusableStyles.flexrow}>
          <TouchableOpacity onPress={this.showNearMeView}>
            <Text style={specificStyles.drawerButtons}>Near Me</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.showSavedListView}>
            <Text style={specificStyles.drawerButtons}>Saved</Text>
          </TouchableOpacity>
        </View>

        {showLandmarkDetails && (
          <Landmark
            landmarkDetails={landmarkDetails}
            getDirections={getDirections}
          />
        )}

        {this.state.showSavedList && <List />}

        {this.state.showNearMe && <NearMe nearbyLandmarks={nearbyLandmarks} />}
      </View>
    );
  }
}
