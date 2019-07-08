import React from 'react';
import {View} from 'react-native';
import Map from './Map';
import Drawer from './Drawer';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Map/>
        <Drawer/>
      </View>
    );
  }
}
