import React from "react";
import { View, ScrollView, Text } from "react-native";
import { reusableStyles, specificStyles } from "../styles";

export default class NearMe extends React.Component {
  render() {
    const landmarks = this.props.landmarks;
    if (landmarks.length) {
      return (
        <ScrollView style={reusableStyles.block}>
          {landmarks.map(landmark => (
            <View key={landmark.name} style={specificStyles.listItemWithIcon}>
              <View style={reusableStyles.listIcon} />
              <View>
                <Text style={reusableStyles.header2}>{landmark.name}</Text>
                <Text style={reusableStyles.text1}>{landmark.location}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      );
    } else {
      return (
        <View>
          <Text>Fetching landmarks</Text>
        </View>
      );
    }
  }
}
