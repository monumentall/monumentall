import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import {
  AppState,
  Platform,
  View
} from "react-native";
import * as Permissions from "expo-permissions";
import MenuBtn from "./MenuBtn";
import { MapMarkers, RecenterButton } from "../components";
import { specificStyles } from "../styles";
import { selectLandmarkAction } from "../store/selectedLandmark";
import {
  setLocationPermissions,
  setRegionAction,
  setNearbyRegionAction,
  getLocationPermissionsAsync,
  getUserLocationAsync
} from "../store/region";
import Constants from "../constants/Constants";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState
    };
  }

  componentDidMount = async () => {
    AppState.addEventListener(Constants.change, this.handleAppStateChange);
    await this.centerMapOnUserAsync();
  };

  componentWillUnmount = () => {
    AppState.removeEventListener(Constants.change, this.handleAppStateChange);
  };

  handleAppStateChange = async nextAppState => {
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
      this.setLocationPermissions(status);
    }
    this.setState({ appState: nextAppState });
  };

  centerMapOnUserAsync = async () => {
    await this.props.getLocationPermissionsAsync();
    let region = {
      latitude: 40.673868,
      longitude: -73.970089,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };
    if (this.props.locationPermissions === Constants.granted) {
      region = await this.props.getUserLocationAsync();
    }
    this.props.setRegion(region);
  };

  changeNearbyMapRegion = event => {
    const { locationPermissions, setNearbyRegion } = this.props;
    const { latitude, longitude } = event;

    if (locationPermissions === Constants.denied) {
      setNearbyRegion({
        latitude,
        longitude,
        latitudeDelta: Constants.latLongDelta,
        longitudeDelta: Constants.latLongDelta
      });
    }
  };

  setRegionAndSelectLandmark = (event, marker) => {
    const region = {
      ...event.nativeEvent.coordinate,
      latitudeDelta: Constants.latLongDelta,
      longitudeDelta: Constants.latLongDelta
    };
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
              this.props.locationPermissions === Constants.denied ? false : true
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
          <RecenterButton
            enabled={this.props.locationPermissions === Constants.granted}
            centerMap={this.centerMapOnUserAsync}
          />
        </View>
      )
    );
  }
}

const mapStateToProps = state => ({
  polyline: state.directions,
  markers: state.landmarks.data || [],
  region: state.region.region,
  locationPermissions: state.region.locationPermissions
});

const mapDispatchToProps = dispatch => ({
  selectLandmark: landmark => dispatch(selectLandmarkAction(landmark)),
  setLocationPermissions: status => dispatch(setLocationPermissions(status)),
  setRegion: region => dispatch(setRegionAction(region)),
  setNearbyRegion: region => dispatch(setNearbyRegionAction(region)),
  getLocationPermissionsAsync: () => dispatch(getLocationPermissionsAsync()),
  getUserLocationAsync: () => dispatch(getUserLocationAsync())
});

Map.propTypes = {
  getLocationPermissionsAsync: PropTypes.func.isRequired,
  getUserLocationAsync: PropTypes.func.isRequired,
  locationPermissions: PropTypes.string.isRequired,
  markers: PropTypes.arrayOf(
    PropTypes.shape({
      coordinates: PropTypes.objectOf(
        PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          latitudeDelta: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
          longitudeDelta: PropTypes.number.isRequired
        })
      ),
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  polyline: PropTypes.object,
  region: PropTypes.object,
  selectLandmark: PropTypes.func.isRequired,
  setLocationPermissions: PropTypes.func.isRequired,
  setRegion: PropTypes.func.isRequired,
  setNearbyRegion: PropTypes.func.isRequired,
  landmarkDetails: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
