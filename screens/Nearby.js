import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { reusableStyles, specificStyles } from "../styles";
import { selectLandmarkAction } from "../store/selectedLandmark";
import { setRegionAction, getNearbyMapRegion } from "../store/region";
import { convertDistance, getDistance, orderByDistance } from "geolib";
import { roundToOneDecimalPlace } from "../util/index";
import Constants from "../constants/Constants";
import * as Location from "expo-location";

class Nearby extends React.Component {
  componentWillMount = async () => {
    try {
      if (this.props.locationPermissions === Constants.granted) {
        return (locationWatch = await Location.watchPositionAsync(
          {
            // only provide an update, when the user's location changes by
            // at least a mile
            distanceInterval: 1610
          },
          async () => {
            await this.props.getNearbyMapRegion();
          }
        ));
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidUpdate = async prevProps => {
    // if the user changes their permission settings
    // after this is already mounted, adjust the nearby region
    if (this.props.locationPermissions !== prevProps.locationPermissions) {
      await this.props.getNearbyMapRegion();
    }
  };

  setRegionAndSelectLandmark = landmark => {
    this.props.selectLandmark(landmark);
    this.props.setRegion({
      latitude: landmark.coordinate.latitude,
      longitude: landmark.coordinate.longitude,
      longitudeDelta: Constants.latLongDelta,
      latitudeDelta: Constants.latLongDelta
    });
  };

  reformatLandmarkData = landmarks => {
    const { nearbyRegion } = this.props;

    return landmarks.map(landmark => {
      let distance = getDistance(
        {
          latitude: nearbyRegion.latitude,
          longitude: nearbyRegion.longitude
        },
        {
          latitude: landmark.coordinate.latitude,
          longitude: landmark.coordinate.longitude
        }
      );
      distance = convertDistance(distance, "mi");
      return {
        ...landmark,
        latitude: landmark.coordinate.latitude,
        longitude: landmark.coordinate.longitude,
        distance: roundToOneDecimalPlace(distance)
      };
    });
  };

  sortLandmarks = landmarks => {
    let orderedLandmarks = orderByDistance(
      this.props.nearbyRegion,
      landmarks
    ).slice(0, 7);

    //prevents the user from seeng the landmark they've selected
    //as the first nearby landmark
    orderedLandmarks =
      orderedLandmarks[0].distance == 0
        ? orderedLandmarks.slice(1, 7)
        : orderedLandmarks.slice(0, 6);

    return orderedLandmarks;
  };

  render() {
    const { landmarks, nearbyRegion } = this.props;
    const haveRegion = !!nearbyRegion.latitude;

    if (haveRegion && landmarks.length) {
      const improvedLandmarks = this.reformatLandmarkData(landmarks);
      const orderedLandmarks = this.sortLandmarks(improvedLandmarks);

      return (
        <ScrollView
          style={reusableStyles.scrollblock}
          contentContainerStyle={reusableStyles.scrollblockcontent}
          showsVerticalScrollIndicator={false}
        >
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
                <Text style={reusableStyles.text1}>
                  {landmark.distance === 1
                    ? `${landmark.distance} mile`
                    : `${landmark.distance} miles`}
                </Text>
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
  nearbyRegion: state.region.nearbyRegion || {
    latitude: 40.673868,
    longitude: -73.970089
  }
});

const mapDispatchToProps = dispatch => ({
  getNearbyMapRegion: () => dispatch(getNearbyMapRegion()),
  selectLandmark: landmark => dispatch(selectLandmarkAction(landmark)),
  setRegion: region => dispatch(setRegionAction(region))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nearby);
