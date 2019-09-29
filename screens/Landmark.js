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

  fetchLandmarkDetails(name) {
    const formattedName = this.formatLandmarkName(name);
    return fetch(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${formattedName}&inputtype=textquery&key=AIzaSyCGZcelQLr9xZhYzuGFWLOdb5-yiOcEo3A`
    )
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(data);
      })
      .then(placeId => {
        return fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,formatted_phone_number&key=AIzaSyCGZcelQLr9xZhYzuGFWLOdb5-yiOcEo3A`
        );
      })
      .then(resDetails => {
        return resDetails.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log("ERROR!");
        console.error(error);
      });
  }

  formatLandmarkName(name) {
    let words = name.split(" ");
    return words.join("%20");
  }

  render() {
    const { landmarkDetails } = this.props;

    let description = landmarkDetails.description;
    let descriptionMaxWordLength = 500;
    let shortDescriptionMaxWordLength = 100;

    if (description.length > descriptionMaxWordLength) {
      description = description.slice(0, descriptionMaxWordLength) + "...";
    }

    console.log(this.fetchLandmarkDetails("Fort Greene Park"));
    return (
      <View>
        <View style={reusableStyles.block}>
          <View style={specificStyles.insetPic} />
          <Text style={reusableStyles.header1}>{landmarkDetails.name}</Text>
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
          <Text style={reusableStyles.text1}>{landmarkDetails.location}</Text>
        </View>
      </View>
    );
  }
}
