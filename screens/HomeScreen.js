import React from "react";
import { View } from "react-native";
import Map from "./Map";
import Drawer from "./Drawer";
import List from "./List";
import { specificStyles } from "../styles";
import screenNames from "../constants/ScreenNames";
import { database } from "../db.js";
import Constants from "../constants/APIKeys";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      landmarks: [],
      selectedLandmark: {},
      screen: screenNames.home
    };
    this.db = database.ref();
    this.selectLandmark = this.selectLandmark.bind(this);
  }

  componentDidMount = async () => {
    this._listenForUpdatesToDatabase(this.db);
  };

  _listenForUpdatesToDatabase = db => {
    db.on("value", snap => {
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

  fetchLandmarkPlaceId(address) {
    const formattedLandmarkAddress = this.formatLandmarkText(address);

    return fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${formattedLandmarkAddress}&inputtype=textquery&key=${Constants.google.apiKey}`
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        //grab the first result that the search returns and
        //get its place id
        if (data.candidates[0]) {
          return data.candidates[0].place_id;
        } else {
          return "none";
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

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

    if (!placeId) {
      //Fail safe for if we don't have the placeId in the db
      placeId = await this.fetchLandmarkPlaceId(data.location);
    }

    //only check for placeDetails, if a placeId exists
    //and we haven't already determined there is none
    if (placeId !== "none") {
      const placeDetails = await this.fetchLandmarkDetails(placeId);
      selectedLandmark =
        placeDetails !== "none"
          ? { ...selectedLandmark, ...placeDetails }
          : selectedLandmark;
    }

    this.setState({
      selectedLandmark
    });
  }

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
          />
          <Drawer
            landmarks={this.state.landmarks}
            selectedLandmark={this.state.selectedLandmark}
          />
        </View>
      );
    }
  };

  render() {
    return <View style={specificStyles.main}>{this.selectComponent()}</View>;
  }
}
