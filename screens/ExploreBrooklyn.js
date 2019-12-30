import React from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import { reusableStyles, specificStyles } from "../styles";
import Nearby from "./Nearby";
import List from "./List";
import Landmark from "./Landmark";

class ExploreBrooklyn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSavedList: false,
      showNearby: true
    };
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
    if (prevProps.landmarkDetails !== this.props.landmarkDetails) {
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
      <View>
        <View style={specificStyles.drawerButtonsBlock}>
          <TouchableOpacity onPress={this.showNearbyView}>
            <Text style={specificStyles.drawerButtons}>Nearby</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.showSavedListView}>
            <Text style={specificStyles.drawerButtons}>Saved</Text>
          </TouchableOpacity>
        </View>

        {showLandmarkDetails && (
          <Landmark landmarkDetails={this.props.landmarkDetails} />
        )}

        {this.state.showSavedList && <List />}

        {this.state.showNearby && <Nearby />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  landmarkDetails: state.selectedLandmark || {}
});

export default connect(mapStateToProps)(ExploreBrooklyn);
