import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { reusableStyles, specificStyles } from "../styles";
import { selectLandmarkAction } from "../store/selectedLandmark";
import { getDistance } from "geolib";
import { convertDistance, getDistance, orderByDistance } from "geolib";
import { sortByDistance } from "../util/index"

class NearMe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMapRegion: {},
    };
  }

  componentDidMount () {
    const currentMapRegion = this.props.mapRegion ?
      this.props.mapRegion : {
        latitude: 40.673868,
        longitude: -73.970089,
      };
    this.setState({
      currentMapRegion,
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mapRegion !== this.props.mapRegion) {
      this.setState({
        currentMapRegion: this.props.mapRegion,
      });
    }
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
              onPress={() => this.props.selectLandmark(landmark)}
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
  selectLandmark: landmark => dispatch(selectLandmarkAction(landmark))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NearMe);
