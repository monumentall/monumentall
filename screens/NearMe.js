import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { reusableStyles, specificStyles } from "../styles";
import { selectLandmarkAction } from "../store/selectedLandmark";
import { setRegionAction } from "../store/region";
import Constants from "../constants/Constants";
import { getDistance } from "geolib";
import { convertDistance, getDistance, orderByDistance } from "geolib";
import { sortByDistance } from "../util/index"

class NearMe extends React.Component {

  // componentDidUpdate(prevProps) {
  //     if (prevProps.mapRegion !== this.props.mapRegion) {
  //       this.setState({
  //         currentMapRegion: this.props.mapRegion,
  //       });
  //     }

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
    const { landmarks } = this.props
    const { currentMapRegion } = this.state

    if (landmarks.length && currentMapRegion) {
      let improvedLandmarks = landmarks.map(landmark => {
        let distance = getDistance(
          { latitude: currentMapRegion.latitude,
            longitude: currentMapRegion.longitude
          },
          { latitude: landmark.coordinate.latitude,
            longitude: landmark.coordinate.longitude
          }
        );
        distance = convertDistance(distance, 'mi')
        return {...landmark, latitude:landmark.coordinate.latitude, longitude:landmark.coordinate.longitude, distance: Math.round(distance, 2) };
      });

      let orderedLandmarks = (orderByDistance(currentMapRegion, improvedLandmarks)).slice(0, 6)

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
                <Text style={reusableStyles.text1}>{`${landmark.distance} miles away`}</Text>
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
  selectLandmark: landmark => dispatch(selectLandmarkAction(landmark)),
  setRegion: region => dispatch(setRegionAction(region))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NearMe);
