import React from "react";
import { MapView, Location, Permissions } from "expo";
import { Dimensions } from "react-native";
import data from "../data.js";
import Hamburger from "./Hamburger.js";
import { database } from "../db";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      mapRegion: {
        latitude: 40.673868,
        longitude: -73.970089,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      locationResult: "",
      initialRegion: null
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount = async () => {
    var dbData = []
    var db = await database.ref().once("value")

    db.forEach(childSnapshot => {
      let name = childSnapshot.child("name")
      let location = childSnapshot.child("location")
      let _key = childSnapshot.key
      dbData.push({_key, name, location})
    })

      console.log(dbData)
    this.setState({
      markers: data
    });
    await this._getLocationAsync();
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    this.setState({
      initialRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        longitudeDelta: 0.005,
        latitudeDelta: 0.005
      }
    });
  };

  handlePress = marker => {
    this.props.selectLandmark(marker);
  };

  regionChange = event => {
    this.setState({
      mapRegion: event.nativeEvent
    });
  };

  render() {
    return (
      <MapView
        style={{ height: screenHeight, width: screenWidth }}
        showsUserLocation={true}
        onRegionChange={event => this.regionChange(event)}
        initialRegion={this.state.initialRegion}
        region={this.state.mapRegion}
      >
        <Hamburger />
        {this.state.markers.map(marker => (
          <MapView.Marker
            key={marker.name}
            coordinate={marker.coordinate}
            title={marker.name}
            onPress={() => this.handlePress(marker)}
          />
        ))}
      </MapView>
    );
  }
}
