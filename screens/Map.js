import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser, MapView, Marker } from 'expo';
import data from '../data/data.js'

export default class Map extends React.Component {
  state = {
    markers = []
  };

  static navigationOptions = {
    header: null,
  };

  componentDidMount = () => {
    this.setState({markers: data})
  };

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {this.state.markers.map(marker => (
          <MapView.Marker 
            coordinate={marker.coordinates}
            title={marker.title}
          />
        ))}
      </MapView>
    );
  }
}