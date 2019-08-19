import React from "react";
import { ScrollView, Text, Button, AsyncStorage } from "react-native";
import { reusableStyles } from "../styles";

export default class LandmarkScreen extends React.Component {
  async saveLandmark(landmarkToSave) {
    //grab the current saved landmarks from async storage
    try {
      let currentSaves = await AsyncStorage.getItem("savedLandmarks");
      currentSaves = JSON.parse(currentSaves);
      let newList;
      //check that we aren't trying to add a landmark that we've
      //already saved
      if (currentSaves && currentSaves.length) {
        const duplicate = currentSaves.filter(
          savedLandmark => savedLandmark.name === landmarkToSave.name
        );
        //if there are no dupes, we can just add the new landmark
        if (!duplicate.length) {
          newList = [...currentSaves, landmarkToSave];
          await AsyncStorage.setItem("savedLandmarks", JSON.stringify(newList));
        }
      } else {
        newList = [landmarkToSave];
        await AsyncStorage.setItem("savedLandmarks", JSON.stringify(newList));
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { landmarkDetails } = this.props;
    return (
      <ScrollView>
        <Text style={reusableStyles.headline}>Landmark Details Page</Text>

        <Text>Name: {landmarkDetails.name}</Text>

        <Text>Location: {landmarkDetails.location}</Text>

        <Text>Description: {landmarkDetails.description}</Text>

        <Button onPress={() => this.saveLandmark(landmarkDetails)} title="save">
          Save
        </Button>
      </ScrollView>
    );
  }
}
