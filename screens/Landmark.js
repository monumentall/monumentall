import React from 'react';
import { ScrollView, Text } from 'react-native';

export default class LandmarkScreen extends React.Component {
  static navigationOptions = {
    title: 'Landmark Details',
  };

  render() {
    return (
      <ScrollView>
           <Text>Landmark Details Page</Text>
      </ScrollView>
    );
  }
}