import React from "react";
import { connect } from 'react-redux'
import { View } from "react-native";
import Map from "./Map";
import Drawer from "./Drawer";
import { specificStyles } from "../styles";
import { database } from "../db.js";
import Constants from "../constants/APIKeys";
import * as Location from "expo-location";
import { decode } from '../util'
import {fetchLandmarks} from '../store/landmarks'
// import screenNames from "../constants/ScreenNames";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLandmark: {},
      polyline: {
        show: false,
        coordinates: []
      }
      // screen: screenNames.home,
    };
    this.db = database.ref();
    this.selectLandmark = this.selectLandmark.bind(this);
  }

  componentDidMount = async () => {
    await this.props.getLandmarks(this.db)
  };

  //What is this for?
  // static navigationOptions = {
  //   header: null
  // };

  fetchLandmarkDetails(googlePlaceId) {
    return fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${googlePlaceId}&fields=opening_hours,formatted_phone_number,formatted_address&key=${Constants.google.apiKey}`
    )
      .then(responseDetails => {
        return responseDetails.json();
      })
      .then(placeDetails => {
        return placeDetails.result;
      })
      .catch(error => {
        console.error(error);
      });
  }

  async selectLandmark(data) {
    let placeId = data.placeId;
    let selectedLandmark = { ...data };

    //only check for placeDetails, if a placeId exists
    //and we haven't already determined there is none
    if (placeId) {
      const placeDetails = await this.fetchLandmarkDetails(placeId);
      selectedLandmark = placeDetails
        ? { ...selectedLandmark, ...placeDetails }
        : selectedLandmark;
    }

    this.setState({
      selectedLandmark
    });
  }

  getDirections = async landmarkCoordinates => {
    const location = await Location.getCurrentPositionAsync({});

    const {
      coords: { latitude: initialLat, longitude: initialLong }
    } = location;
    const { latitude: finalLat, longitude: finalLong } = landmarkCoordinates;

    let response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${initialLat},${initialLong}&destination=${finalLat},${finalLong}&mode=walking&key=${Constants.google.apiKey}`
    );
    let data = await response.json();
    if (data.routes.length) {
      const coordinates = decode(data.routes[0].overview_polyline.points);
      this.setState({
        polyline: {
          show: true,
          coordinates
        }
      });
    }
    // TODO: need some kind of error handling if no directions are available
    // TODO: close drawer when get directions (reset drawer height?)
  };

  render() {
    return (
    <View style={specificStyles.main}>
      <View>
          <Map
            markers={this.props.landmarks}
            selectLandmark={this.selectLandmark}
            polyline={this.state.polyline}
          />
          <Drawer
            landmarks={this.props.landmarks}
            selectedLandmark={this.state.selectedLandmark}
            getDirections={this.getDirections}
          />
        </View>
    </View>
    )
  }
}


const mapStateToProps = state => ({
  landmarks: state.landmarks || [],
})

const mapDispatchToProps = dispatch => ({
  getLandmarks: (db) => dispatch(fetchLandmarks(db))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
