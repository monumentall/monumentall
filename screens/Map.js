import React from 'react';
import {
  MapView,
  Location,
  Permissions,
} from 'expo';

import data from '../data.js'

export default class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      markers: [],
      mapRegion: {
        latitude: 40.673868,
        longitude: -73.970089,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      locationResult: "",
      initialRegion: null
    };
  };

  static navigationOptions = {
    header: null,
  };

  componentDidMount = async () => {
    this.setState({
      markers: data
    });
    await this._getLocationAsync();
  };

  _getLocationAsync = async () => {
    let {
      status
    } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location,
      });
    }

    let location = await Location.getCurrentPositionAsync({});
 
    this.setState({
      initialRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        longitudeDelta: 0.005,
        latitudeDelta: 0.005,
      }
    });
  };

  handlePress = (marker) => {
    console.log('Placeholder for onPress triggered', marker)
  };

  regionChange = (event) => {
    this.setState({
      mapRegion: event.nativeEvent
    });
  };

  render() {
        return (
            <MapView
                style={{ flex: 1 }}
                showsUserLocation={true}
                onRegionChange={(event) => this.regionChange(event)}
                initialRegion={this.state.initialRegion}
                region={this.state.mapRegion}

            >
                {this.state.markers.map(marker => (
                    <MapView.Marker
                        key={marker.name}
                        coordinate={marker.coordinate}
                        title={marker.name}
                        onPress={() => this.handlePress(marker)}
                    />
                ))}
            </MapView>
        ) 
    }
}