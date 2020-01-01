import React from "react";
import { connect } from "react-redux";
import {
  Text,
  AsyncStorage,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { reusableStyles, specificStyles } from "../styles";
import {
  getDirectionsAction,
  clearDirectionsAction
} from "../store/directions";
import { clearLandmarkAction } from "../store/selectedLandmark";

class LandmarkScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seeMoreSelected: false
    };
  }
  componentWillUnmount = () => {
    this.props.clearLandmark();
  };

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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.landmarkDetails.name !== prevProps.landmarkDetails.name) {
      this.setState({ seeMoreSelected: false });
    }
  }

  getDirectionsToLandmark = landmarkCoordinates => {
    this.props.getDirections(landmarkCoordinates);
    this.props.closeDrawer();
  };

  getDescription = type => {
    const { landmarkDetails } = this.props;
    let description = landmarkDetails.description;
    let descriptionMaxWordLength = 500;
    let shortDescriptionMaxWordLength = 100;

    if (type === "teaser") {
      description = description.slice(0, shortDescriptionMaxWordLength);
    } else if (
      description.length > descriptionMaxWordLength &&
      !this.state.seeMoreSelected
    ) {
      description = description.slice(0, descriptionMaxWordLength) + "...";
    }
    return description;
  };

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

    return (
      <ScrollView
        style={specificStyles.landmarkContainer}
        contentContainerStyle={reusableStyles.scrollblockcontent}
        showsVerticalScrollIndicator={false}
      >
        <View style={reusableStyles.block}>
          <View style={reusableStyles.flexrow}>
            <View style={specificStyles.insetPic} />
            <TouchableOpacity onPress={() => this.props.clearDirections()}>
              <Text style={reusableStyles.header1}> X </Text>
            </TouchableOpacity>
          </View>
          <Text style={reusableStyles.header1}>{name}</Text>
          <Text style={reusableStyles.text1}>
            {this.getDescription("teaser")}
          </Text>
          <View style={reusableStyles.flexrow}>
            <TouchableOpacity
              style={reusableStyles.button}
              onPress={() =>
                this.getDirectionsToLandmark(landmarkDetails.coordinate)
              }
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
          <Text style={reusableStyles.text1}>{this.getDescription()}</Text>
          {this.state.seeMoreSelected ? (
            <TouchableOpacity
              onPress={() => this.setState({ seeMoreSelected: false })}
            >
              <Text style={reusableStyles.header2}>See Less</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => this.setState({ seeMoreSelected: true })}
            >
              <Text style={reusableStyles.header2}>See More</Text>
            </TouchableOpacity>
          )}
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
            <ScrollView>
              <Text style={reusableStyles.header2}>Open Hours</Text>
              {opening_hours.weekday_text.map(weekday => {
                return (
                  <Text style={reusableStyles.text1} key={weekday}>
                    {weekday}
                  </Text>
                );
              })}
            </ScrollView>
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getDirections: coordinate => dispatch(getDirectionsAction(coordinate)),
  clearDirections: () => dispatch(clearDirectionsAction()),
  clearLandmark: () => dispatch(clearLandmarkAction())
});

export default connect(
  null,
  mapDispatchToProps
)(LandmarkScreen);
