import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { reusableStyles, specificStyles } from "../styles";
import { selectLandmarkAction } from "../store/selectedLandmark";
import { setRegionAction, getLocationPermissionsAsync, getUserLocationAsync } from "../store/region";
import Constants from "../constants/Constants";
import { convertDistance, getDistance, orderByDistance } from "geolib";
import { roundToOneDecimalPlace } from "../util/index"

class Nearby extends React.Component {

  setRegionAndSelectLandmark(landmark) {
    this.props.selectLandmark(landmark);
    this.props.setRegion({
      latitude: landmark.coordinate.latitude,
      longitude: landmark.coordinate.longitude,
      longitudeDelta: Constants.latLongDelta,
      latitudeDelta: Constants.latLongDelta
    });
  }

  getMapRegion = async () => {
    let region = this.props.mapRegion;
    if (this.props.locationPermissions === Constants.granted) {
      region = await getUserLocationAsync()
    };
    return region;
  };

  reformatLandmarkData ( landmarks ) {
    const mapRegion = this.getMapRegion();

    return landmarks.map(landmark => {
      let distance = getDistance({
        latitude: mapRegion.latitude,
        longitude: mapRegion.longitude
      }, {
        latitude: landmark.coordinate.latitude,
        longitude: landmark.coordinate.longitude
      });
      distance = convertDistance(distance, 'mi')
      return {
        ...landmark,
        latitude: landmark.coordinate.latitude,
        longitude: landmark.coordinate.longitude,
        distance: roundToOneDecimalPlace( distance ),
      };
    });
  }

  sortLandmarks (landmarks) {
    let orderedLandmarks = (orderByDistance(this.props.mapRegion, landmarks)).slice(0, 7);

    //prevents the user from seeng the landmark they've selected
    //as the first nearby landmark
    orderedLandmarks = orderedLandmarks[0].distance == 0 ? orderedLandmarks.slice(1, 7) : orderedLandmarks.slice(0, 6);

    return orderedLandmarks;
  }

  render() {
    const { landmarks } = this.props;
    const haveRegion = !!this.props.region.latitude;

    if (haveRegion) {
      const improvedLandmarks = this.reformatLandmarkData(landmarks);
      const orderedLandmarks = this.sortLandmarks( improvedLandmarks );

      return (
        <ScrollView style={reusableStyles.block}>
          {orderedLandmarks.map(landmark => (
            <TouchableOpacity
              key={landmark.name}
              style={specificStyles.listItemWithIcon}
              onPress={() => this.setRegionAndSelectLandmark(landmark)}
            >
              <View style={reusableStyles.listIcon} />
              <View>
                <Text style={reusableStyles.header2}>{landmark.name}</Text>
                <Text style={reusableStyles.text1}>{landmark.location}</Text>
                <Text style={reusableStyles.text1}>{landmark.distance === 1 ? `${landmark.distance} mile` : `${landmark.distance} miles`}</Text>
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
  locationPermissions: state.region.locationPermissions,
  mapRegion: state.region.region || {
    latitude: 40.673868,
    longitude: -73.970089,
  },
});

const mapDispatchToProps = dispatch => ({
  selectLandmark: landmark => dispatch(selectLandmarkAction(landmark)),
  setRegion: region => dispatch(setRegionAction(region)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Nearby);
