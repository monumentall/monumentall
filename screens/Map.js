import React from "react";
import { connect } from "react-redux";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
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
import { selectLandmarkAction } from "../store/selectedLandmark";
import { setRegionAction, setNearbyRegionAction } from "../store/region";
import Constants from "../constants/Constants";

const MapMarkers = ({ markers, setRegionAndSelectLandmark }) => {
  if (markers)
    return markers.map(marker => (
      <Marker
        key={marker.name}
        coordinate={marker.coordinate}
        title={marker.name}
        onPress={event => setRegionAndSelectLandmark(event, marker)}
      />
    ));
  return null;
};

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationPermissions: Constants.denied,
      appState: AppState.currentState
    };
    this.setRegionAndSelectLandmark = this.setRegionAndSelectLandmark.bind(
      this
    );
    this.changeNearbyMapRegion = this.changeNearbyMapRegion.bind(
      this
    );
  }

  componentDidMount = async () => {
    AppState.addEventListener(Constants.change, this._handleAppStateChange);
    await this.centerMapOnUserAsync();
  };

  componentWillUnmount() {
    AppState.removeEventListener(Constants.change, this._handleAppStateChange);
  }

  _handleAppStateChange = async nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === Constants.active
    ) {
      console.log("App has come to the foreground!");
      let { permissions, status } = await Permissions.getAsync(
        Permissions.LOCATION
      );
      const locationOn =
        Platform.OS === Constants.ios
          ? permissions.location.ios.scope === Constants.whenInUse
          : permissions.location.android.scope === Constants.fine;

      if (status === Constants.denied && locationOn) {
        //This condition is to protect against the case where a user initially denies access or opens the app with denied access from a previous session (i.e. Permission status for location will never flip from 'denied'). If both conditions are met, it prompts the user to re-allow access to their location.
        const refresh = await Permissions.askAsync(Permissions.LOCATION);
        status = refresh.status;
      }
      this.setState({ locationPermissions: status });
    }
    this.setState({ appState: nextAppState });
  };

  centerMapOnUserAsync = async () => {
    let status = await this.getLocationPermissionsAsync();
    let region = {
      latitude: 40.673868,
      longitude: -73.970089,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };
    if (status === Constants.granted) {
      let location = await Location.getCurrentPositionAsync({});
      region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        longitudeDelta: Constants.latLongDelta,
        latitudeDelta: Constants.latLongDelta
      };
    }
    this.props.setRegion(region);
  };

  getLocationPermissionsAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    this.setState({ locationPermissions: status });
    return status;
  };

  changeNearbyMapRegion (event) {
    const { latitude, longitude } = event;
    const region = {
      latitude,
      longitude,
      latitudeDelta: Constants.latLongDelta,
      longitudeDelta: Constants.latLongDelta
    };

    this.props.setNearbyRegion(region)
  }

  setRegionAndSelectLandmark = (event, marker) => {
    const region = {
      ...event.nativeEvent.coordinate,
      latitudeDelta: Constants.latLongDelta,
      longitudeDelta: Constants.latLongDelta
    }
    this.props.setRegion(region);
    this.changeNearbyMapRegion(region);
    this.props.selectLandmark(marker);
  };

  render() {
    const haveRegion = !!this.props.region.latitude;
    return (
      haveRegion && (
        <View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={specificStyles.mapContainer}
            showsUserLocation={
              this.state.locationPermissions === Constants.denied ? false : true
            }
            showsMyLocationButton={false}
            zoomEnabled={true}
            initialRegion={this.props.region}
            region={this.props.region}
            onRegionChangeComplete={this.changeNearbyMapRegion}
          >
            <MapMarkers
              markers={this.props.markers || []}
              setRegionAndSelectLandmark={this.setRegionAndSelectLandmark}
            />
            {this.props.polyline.show && (
              <Polyline
                coordinates={this.props.polyline.coordinates}
                strokeWidth={4}
              />
            )}
          </MapView>
          <MenuBtn />
          {this.state.locationPermissions === Constants.granted && (
            <TouchableOpacity
              style={specificStyles.centerBtnContainer}
              onPress={() => {
                this.centerMapOnUserAsync(Constants.granted);
              }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                source={require("../assets/images/placeholder-map-icon.png")}
              />
            </TouchableOpacity>
          )}
        </View>
      )
    );
  }
}

const mapStateToProps = state => ({
  polyline: state.directions,
  markers: state.landmarks.data || [],
  region: state.region.region
});

const mapDispatchToProps = dispatch => ({
  selectLandmark: landmark => dispatch(selectLandmarkAction(landmark)),
  setRegion: region => dispatch(setRegionAction(region)),
  setNearbyRegion: region => dispatch(setNearbyRegionAction(region))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
