import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import { AppState, View } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
<<<<<<< HEAD
import MenuBtn from "./MenuBtn";
import CenterBtn from "./CenterBtn";
=======
import { database } from "../db.js";
>>>>>>> REFACTOR: snapshot from db
import layout from "../constants/Layout";
import MenuBtn from "./MenuBtn";
import CenterBtn from "./CenterBtn";

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationResult: "denied",
      initialRegion: null,
      appState: AppState.currentState
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount = async () => {
<<<<<<< HEAD
=======
    this._getMarkersFromDatabase(this.db);
>>>>>>> REFACTOR: snapshot from db
    AppState.addEventListener("change", this._handleAppStateChange);
    await this._getLocationAsync();
  };

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = async nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
      let { permissions, status } = await Permissions.getAsync(
        Permissions.LOCATION
      );
      const locationOn = permissions.location.ios.scope === "whenInUse";

      if (status === "denied" && locationOn) {
        //This condition is to protect against the case where a user initially denies access or opens the app with denied access from a previous session (i.e. Permission status for location will never flip from 'denied'). If both conditions are met, it prompts the user to re-allow access to their location.
        const refresh = await Permissions.askAsync(Permissions.LOCATION);
        status = refresh.status;
      }
      this.setState({ locationResult: status });
    }
    this.setState({ appState: nextAppState });
  };

<<<<<<< HEAD
=======
  _getMarkersFromDatabase = db => {
    db.once("value", snap => {
      const data = [];
      snap.forEach(child => {
        const childObj = child.toJSON();
        data.push({ ...childObj });
      });
      this.setState({ markers: data });
    });
  };

>>>>>>> REFACTOR: snapshot from db
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      this._setMapRegionAsync("initialRegion");
    } else {
      this.setState({
        initialRegion: {
          latitude: 40.673868,
          longitude: -73.970089,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
      });
    }
    this.setState({ locationResult: status });
  };

  //Sets the map region to user's location. Used for both initializing the map and the "center" button.
  _setMapRegionAsync = async regionType => {
    let location = await Location.getCurrentPositionAsync({});

    this.setState({
      [regionType]: {
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

  render() {
    return (
      <>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ height: layout.window.height, width: layout.window.width }}
        showsUserLocation={
          this.state.locationResult === "denied" ? false : true
        }
        showsMyLocationButton={true}
        zoomEnabled={true}
        initialRegion={this.state.initialRegion}
      >
<<<<<<< HEAD
        {/* @TODO: refactor menu so list screen doesn't unmount the map and therefore reset initialRegion */}
        <MenuBtn setScreen={this.props.setScreen} />
        {/* @TODO: refactor C Button because it doesn't recenter on user's location anymore. Possibly use built in showsMyLocationButton */}
        <CenterBtn
          locationAccess={this.state.locationResult}
          setMapRegion={this._setMapRegionAsync}
        />
        {this.props.markers.map(marker => (
=======
        {this.state.markers.map(marker => (
>>>>>>> REFACTOR: snapshot from db
          <MapView.Marker
            key={marker.name}
            coordinate={marker.coordinate}
            title={marker.name}
            onPress={() => this.handlePress(marker)}
          />
        ))}
      </MapView>
       {/* @TODO: refactor menu so list screen doesn't unmount the map and therefore reset initialRegion */}
       <MenuBtn setScreen={this.setScreen} />

       {/* @TODO: refactor C Button because it doesn't recenter on user's location anymore. Possibly use built in showsMyLocationButton */}
       <CenterBtn
         locationAccess={this.state.locationResult}
         setMapRegion={this._setMapRegionAsync}
       />
       </>
    )
  }
}
