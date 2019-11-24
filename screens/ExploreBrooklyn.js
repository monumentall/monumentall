import React from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import { reusableStyles, specificStyles } from "../styles";
import NearMe from "./NearMe";
import List from "./List";
import Landmark from "./Landmark";

class ExploreBrooklyn extends React.Component {
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

    return (
      <View>
        <View style={specificStyles.drawerButtonsBlock}>
          <TouchableOpacity onPress={this.showNearMeView}>
            <Text style={specificStyles.drawerButtons}>Near Me</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.showSavedListView}>
            <Text style={specificStyles.drawerButtons}>Saved</Text>
          </TouchableOpacity>
        </View>

        {showLandmarkDetails && (
          <Landmark landmarkDetails={this.props.landmarkDetails} />
        )}

        {this.state.showSavedList && <List />}

        {this.state.showNearMe && <NearMe landmarks={this.props.landmarks} />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  landmarks: state.landmarks.data || [],
  landmarkDetails: state.selectedLandmark || {}
});

export default connect(mapStateToProps)(ExploreBrooklyn);
