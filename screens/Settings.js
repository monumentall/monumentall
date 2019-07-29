import React from 'react';
import { Text } from 'react-native';


export default class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    return <Text>Toggle Location Preferences</Text>;
  }
}
