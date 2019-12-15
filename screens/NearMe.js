import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { reusableStyles, specificStyles } from "../styles";
import { selectLandmarkAction } from "../store/selectedLandmark";
import { getDistance } from "geolib";
import { sortByDistance } from "../util/index"

class NearMe extends React.Component {
  render() {
    const landmarks = this.props.landmarks;
    sortByDistance(landmarks)
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
  selectLandmark: landmark => dispatch(selectLandmarkAction(landmark))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NearMe);
