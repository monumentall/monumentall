import React from "react";
import { View } from "react-native";
import Map from "./Map";
import Drawer from "./Drawer";
import List from "./List";
import { specificStyles } from "../styles";
import screenNames from "../constants/ScreenNames";
import { database } from "../db.js";


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

  selectLandmark = data => {
    this.setState({
      selectedLandmark: data
    });
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
