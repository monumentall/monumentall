import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import { specificStyles } from "../styles";
import Nearby from "./Nearby";
import Saved from "./Saved";
import Landmark from "./Landmark";
import BottomSheet from "reanimated-bottom-sheet";

class Explore extends React.Component {
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

  componentDidUpdate = prevProps => {
    const propsChanged =
      prevProps.landmarkDetails !== this.props.landmarkDetails;
    const haveLandmark = !!this.props.landmarkDetails.name;

    if (propsChanged && haveLandmark) {
      this.setState({
        showNearby: false,
        showSavedList: false
      });
    }
  };

  displayHeader = () => {
    return (
      <View style={specificStyles.drawerButtonsBlock}>
        <TouchableOpacity onPress={this.showNearbyView}>
          <Text style={specificStyles.drawerButtons}>Nearby</Text>
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
    const { showNearby, showSavedList } = this.state;
    const showLandmarkDetails =
      this.props.landmarkDetails.name && !showNearby && !showSavedList;
    return (
      <View>
        {showLandmarkDetails && (
          <Landmark
            landmarkDetails={this.props.landmarkDetails}
            closeDrawer={this.minimizeDrawer}
          />
        )}
        {showSavedList && <Saved />}
        {showNearby && <Nearby landmarks={this.props.landmarks} />}
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

Explore.propTypes = {
  landmarkDetails: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Explore);
