import React from "react";
import { connect } from "react-redux";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { reusableStyles, specificStyles } from "../styles";
import { setLandmark } from "../store/selectedLandmark";
import { getDistance } from "geolib";
import { sortByDistance } from "../util/index"

class NearMe extends React.Component {
  render() {
    console.log(getDistance(
      { latitude: 51.5103, longitude: 7.49347 },
      { latitude: "51° 31' N", longitude: "7° 28' E" }
    ))

    console.log('region', this.props.mapRegion)
    const landmarks = this.props.landmarks;
    sortByDistance(landmarks)
    if (landmarks.length) {
      return (
        <ScrollView style={reusableStyles.block}>
          {landmarks.map(landmark => (
            <TouchableOpacity
              key={landmark.name}
              style={specificStyles.listItemWithIcon}
              onPress={() => this.props.selectLandmark(landmark)}
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
  landmarkDetails: state.selectedLandmark || {},
  mapRegion: state.mapDetails.region || {}
});

const mapDispatchToProps = dispatch => ({
  selectLandmark: landmark => dispatch(setLandmark(landmark)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NearMe);
