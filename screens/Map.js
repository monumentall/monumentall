import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  AppState,
  Platform,
  TouchableOpacity,
  Image,
  View
} from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import MenuBtn from "./MenuBtn";
import { specificStyles } from "../styles";

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationResult: "denied",
      initialRegion: null,
      region: null,
      appState: AppState.currentState
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount = async () => {
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
      const locationOn =
        Platform.OS === "ios"
          ? permissions.location.ios.scope === "whenInUse"
          : permissions.location.android.scope === "fine";

      if (status === "denied" && locationOn) {
        //This condition is to protect against the case where a user initially denies access or opens the app with denied access from a previous session (i.e. Permission status for location will never flip from 'denied'). If both conditions are met, it prompts the user to re-allow access to their location.
        const refresh = await Permissions.askAsync(Permissions.LOCATION);
        status = refresh.status;
      }
      this.setState({ locationResult: status });
    }
    this.setState({ appState: nextAppState });
  };

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

  setRegionAndSelectLandmark = (event, marker) => {
    this.setState({
      region: {
        ...event.nativeEvent.coordinate,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }
    });

    this.props.selectLandmark(marker);
  };

  render() {
    return (
      <View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={specificStyles.mapContainer}
          showsUserLocation={
            this.state.locationResult === "denied" ? false : true
          }
          showsMyLocationButton={false}
          zoomEnabled={true}
          initialRegion={this.state.initialRegion}
          region={this.state.region}
        >
          {this.props.markers.map(marker => (
            <MapView.Marker
              key={marker.name}
              coordinate={marker.coordinate}
              title={marker.name}
              onPress={event => this.setRegionAndSelectLandmark(event, marker)}
            />
          ))}
        </MapView>
        <MenuBtn />
        {this.state.locationResult === "granted" && (
          <TouchableOpacity
            style={specificStyles.centerBtnContainer}
            onPress={() => {
              this._setMapRegionAsync("region");
            }}
          >
            <Image
              style={{ width: 50, height: 50 }}
              source={require("../assets/images/placeholder-map-icon.png")}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
