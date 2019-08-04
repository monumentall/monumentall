import React from "react";
import { MapView, Location, Permissions } from "expo";
import Hamburger from "./Hamburger.js";
import { database } from "../db.js";
import layout from "../constants/Layout";

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
    this.db = database.ref();
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount = async () => {
    this._listenForUpdatesToDatabase(this.db);
    await this._getLocationAsync();
  };

  _listenForUpdatesToDatabase = db => {
    db.on("value", snap => {
      const data = [];
      snap.forEach(child => {
        const childObj = child.toJSON();
        data.push({ ...childObj });
      });
      this.setState({ markers: data });
    });
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
        style={{ height: layout.window.height, width: layout.window.width }}
        showsUserLocation={true}
        onRegionChange={event => this.regionChange(event)}
        initialRegion={this.state.initialRegion}
        region={this.state.mapRegion}
      >
        <Hamburger setScreen={this.props.setScreen} />
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
