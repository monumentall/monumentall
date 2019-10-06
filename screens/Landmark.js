import React from "react";
import {
  Text,
  AsyncStorage,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { reusableStyles, specificStyles } from "../styles";

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
    const {
      formatted_address,
      formatted_phone_number,
      location,
      name,
      opening_hours
    } = landmarkDetails;

    const address = formatted_address || location;

    let description = landmarkDetails.description;
    let descriptionMaxWordLength = 500;
    let shortDescriptionMaxWordLength = 100;

    if (description.length > descriptionMaxWordLength) {
      description = description.slice(0, descriptionMaxWordLength) + "...";
    }

    return (
      <View>
        <View style={reusableStyles.block}>
          <View style={specificStyles.insetPic} />
          <Text style={reusableStyles.header1}>{name}</Text>
          <Text style={reusableStyles.text1}>
            {description.slice(0, shortDescriptionMaxWordLength)}
          </Text>
          <View style={reusableStyles.flexrow}>
            <TouchableOpacity
              style={reusableStyles.button}
              onPress={() => console.log("pressed directions")}
            >
              <Text style={reusableStyles.header2}>DIRECTIONS</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={reusableStyles.button}
              onPress={() => this.saveLandmark(landmarkDetails)}
            >
              <Text style={reusableStyles.header2}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={reusableStyles.block}>
          <Text style={reusableStyles.header2}>Her Story</Text>
          <Text style={reusableStyles.text1}>{description}</Text>
          <TouchableOpacity onPress={() => console.log("pressed see more")}>
            <Text style={reusableStyles.header2}>See More</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={reusableStyles.block}>
          <Text style={reusableStyles.header2}>Contact Details</Text>
          <Text style={reusableStyles.text1}>Address: {address}</Text>

          {formatted_phone_number && (
            <Text style={reusableStyles.text1}>
              Phone Number: {formatted_phone_number}
            </Text>
          )}

          {opening_hours && (
            <View>
              <Text style={reusableStyles.header2}>Open Hours</Text>
              {opening_hours.weekday_text.map(weekday => {
                return <Text style={reusableStyles.text1}>{weekday}</Text>;
              })}
            </View>
          )}
        </View>
      </View>
    );
  }
}
