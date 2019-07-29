import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import data from '../data';

export default class List extends React.Component {
  static navigationOptions = {
    title: 'List',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
           <Text>My Saved Landmarks:</Text>
           <Text>Landmark 1: {data[1].name}</Text>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});