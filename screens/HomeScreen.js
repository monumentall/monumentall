import React from "react";
import { View } from "react-native";
import Map from "./Map";
import Drawer from "./Drawer";
import List from "./List";
import { specificStyles } from "../styles";
import screenNames from "../constants/ScreenNames";
import { database } from "../db.js";
import Constants from "../constants/APIKeys";
import * as Location from "expo-location";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      landmarks: [],
      selectedLandmark: {},
      screen: screenNames.home,
      polyline: {
        show: false,
        coordinates: []
      }
    };
    this.db = database.ref();
    this.selectLandmark = this.selectLandmark.bind(this);
  }

  componentDidMount = async () => {
    this._fetchMarkersFromDatabase(this.db);
  };

  _fetchMarkersFromDatabase = db => {
    db.once("value", snap => {
      const data = [];
      snap.forEach(child => {
        const childObj = child.toJSON();
        data.push({ ...childObj });
      });
      this.setState({ landmarks: data });
    });
  };

  static navigationOptions = {
    header: null
  };

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

  formatLandmarkText(text) {
    let words = text.split(" ");
    return words.join("%20");
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

    // is there a cuter es6 way to assign these variables?
    const initialLat = location.coords.latitude;
    const initialLong = location.coords.longitude;
    const finalLat = landmarkCoordinates.latitude;
    const finalLong = landmarkCoordinates.longitude;

    let response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${initialLat},${initialLong}&destination=${finalLat},${finalLong}&mode=walking&key=${Constants.google.apiKey}`
    );
    let data = await response.json();
    if (data.routes.length) {
      const coordinates = this.decode(data.routes[0].overview_polyline.points);
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

  // oh no i am so sorry about this autoformating. we could move this into a util or something to clean up.
  decode = (t, e) => {
    for (
      var n,
        o,
        u = 0,
        l = 0,
        r = 0,
        d = [],
        h = 0,
        i = 0,
        a = null,
        c = Math.pow(10, e || 5);
      u < t.length;

    ) {
      (a = null), (h = 0), (i = 0);
      do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
      while (a >= 32);
      (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
      do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
      while (a >= 32);
      (o = 1 & i ? ~(i >> 1) : i >> 1),
        (l += n),
        (r += o),
        d.push([l / c, r / c]);
    }
    return (d = d.map(function(t) {
      return { latitude: t[0], longitude: t[1] };
    }));
  };

  setScreen = screen => {
    this.setState({
      screen
    });
  };

  selectComponent = () => {
    if (this.state.screen === screenNames.list) {
      return <List setScreen={this.setScreen} />;
    } else {
      return (
        <View>
          <Map
            markers={this.state.landmarks}
            selectLandmark={this.selectLandmark}
            setScreen={this.setScreen}
            polyline={this.state.polyline}
          />
          <Drawer
            landmarks={this.state.landmarks}
            selectedLandmark={this.state.selectedLandmark}
            getDirections={this.getDirections}
          />
        </View>
      );
    }
  };

  render() {
    return <View style={specificStyles.main}>{this.selectComponent()}</View>;
  }
}
