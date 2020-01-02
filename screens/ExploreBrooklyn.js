import React from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import { reusableStyles, specificStyles } from "../styles";
import Nearby from "./Nearby";
import List from "./List";
import Landmark from "./Landmark";
import BottomSheet from "reanimated-bottom-sheet";
import layout from "../constants/Layout";

class ExploreBrooklyn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSavedList: false,
      showNearby: true
    };

    this.bs = React.createRef();
  }

  showSavedListView = () => {
    this.setState({
      showNearby: false,
      showSavedList: true
    });
  };

  showNearbyView = () => {
    this.setState({
      showNearby: true,
      showSavedList: false
    });
  };

  componentDidUpdate(prevProps) {
    const propsChanged =
      prevProps.landmarkDetails !== this.props.landmarkDetails;
    const haveLandmark = !!this.props.landmarkDetails.name;

    if (propsChanged && haveLandmark) {
      this.setState({
        showNearby: false,
        showSavedList: false
      });
    }
  }

  render() {
    const { showNearby, showSavedList } = this.state;
    const showLandmarkDetails =
      this.props.landmarkDetails.name && !showNearby && !showSavedList;

    return (
      <View style={specificStyles.drawerButtonsBlock}>
        <TouchableOpacity onPress={this.showNearMeView}>
          <Text style={specificStyles.drawerButtons}>Near Me</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.showSavedListView}>
          <Text style={specificStyles.drawerButtons}>Saved</Text>
        </TouchableOpacity>
      </View>
    );
  };

  minimizeDrawer = () => {
    this.bs.current.snapTo(0);
  };

  displayContent = () => {
    const { showNearMe, showSavedList } = this.state;
    const showLandmarkDetails =
      this.props.landmarkDetails.name && !showNearMe && !showSavedList;
    return (
      <View>
        {showLandmarkDetails && (
          <Landmark
            landmarkDetails={this.props.landmarkDetails}
            closeDrawer={this.minimizeDrawer}
          />
        )}
        {showSavedList && <List />}
        {showNearMe && <NearMe landmarks={this.props.landmarks} />}
      </View>
    );
  };

  render() {
    return (
      <BottomSheet
        ref={this.bs}
        snapPoints={[-500, 0]}
        initialSnap={0}
        renderContent={this.displayContent}
        renderHeader={this.displayHeader}
        enabledContentGestureInteraction={false}
      />
    );
  }
}

const mapStateToProps = state => ({
  landmarkDetails: state.selectedLandmark || {}
});

export default connect(mapStateToProps)(ExploreBrooklyn);
