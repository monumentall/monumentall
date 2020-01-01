import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { reusableStyles, specificStyles } from "../styles";
import { selectLandmarkAction } from "../store/selectedLandmark";
import { setRegionAction } from "../store/region";
import Constants from "../constants/Constants";

class NearMe extends React.Component {
  setRegionAndSelectLandmark(landmark) {
    this.props.selectLandmark(landmark);
    this.props.setRegion({
      latitude: landmark.coordinate.latitude,
      longitude: landmark.coordinate.longitude,
      longitudeDelta: Constants.latLongDelta,
      latitudeDelta: Constants.latLongDelta
    });
  }

  render() {
    const landmarks = this.props.landmarks;
    if (landmarks.length) {
      return (
        <ScrollView
          style={reusableStyles.scrollblock}
          contentContainerStyle={reusableStyles.scrollblockcontent}
          showsVerticalScrollIndicator={false}
        >
          {landmarks.map(landmark => (
            <TouchableOpacity
              key={landmark.name}
              style={specificStyles.listItemWithIcon}
              onPress={() => this.setRegionAndSelectLandmark(landmark)}
            >
              <View style={reusableStyles.listIcon} />
              <View>
                <Text style={reusableStyles.header2}>{landmark.name}</Text>
                <Text style={reusableStyles.text1}>{landmark.location}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      );
    } else {
      return (
        <View>
          <Text>Fetching landmarks</Text>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  landmarks: state.landmarks.data || [],
  landmarkDetails: state.selectedLandmark || {}
});

const mapDispatchToProps = dispatch => ({
  selectLandmark: landmark => dispatch(selectLandmarkAction(landmark)),
  setRegion: region => dispatch(setRegionAction(region))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NearMe);
