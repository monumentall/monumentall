import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { reusableStyles } from "../styles";

export default class LandmarkScreen extends React.Component {
  static navigationOptions = {
    title: "Landmark Details"
  };

  render() {
    const { details } = this.props;
    return (
      <ScrollView>
        <Text style={reusableStyles.headline}>Landmark Details Page</Text>

        <Text>Name: {details.name}</Text>

        <Text>Location: {details.location}</Text>

        <Text>Description: {details.description}</Text>
      </ScrollView>
    );
  }
}
