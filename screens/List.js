import React from "react";
import { View, Text, AsyncStorage, Button } from "react-native";
import screenNames from "../constants/ScreenNames";
import { reusableStyles, specificStyles } from "../styles";

export default class List extends React.Component {
  constructor() {
    super();
    this.state = {
      savedLandmarks: []
    };
    this.deleteList = this.deleteList.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem("savedLandmarks")
      .then(storedLandmarks => {
        let savedLandmarks = JSON.parse(storedLandmarks);
        // this if statement prevents us from setting null on state if "savedLandmarks" doesn't exist in AsyncStorage yet
        if (savedLandmarks) {
          this.setState({ savedLandmarks });
        }
      })
      .catch(err => console.error(err));
  }

  async deleteList() {
    await AsyncStorage.removeItem("savedLandmarks");
    this.setState({ savedLandmarks: [] });
  }

  deleteLandmark(selectedLandmarkName) {
    if (this.state.savedLandmarks) {
      const updatedLandmarks = this.state.savedLandmarks.filter(landmark => {
        return landmark.name !== selectedLandmarkName;
      });
      AsyncStorage.setItem("savedLandmarks", JSON.stringify(updatedLandmarks))
        .then(() => {
          this.setState({ savedLandmarks: updatedLandmarks });
        })
        .catch(err => console.error(err));
    }
  }

  render() {
    const { savedLandmarks } = this.state;

    const landmarksList = (
      <View>
        {savedLandmarks &&
          savedLandmarks.map(landmark => {
            return (
              <View key={landmark.name} style={specificStyles.listItemWithIcon}>
                <View style={reusableStyles.listIcon} />
                <View>
                  <Text style={reusableStyles.header2}>{landmark.name}</Text>
                  <Text style={reusableStyles.text1}>{landmark.location}</Text>
                </View>
                <Button
                  title="delete"
                  onPress={() => this.deleteLandmark(landmark.name)}
                />
              </View>
            );
          })}
        <Button title="Delete All" onPress={this.deleteList} />
      </View>
    );

    const noLandmarks = (
      <View>
        <Text>You haven't saved anything yet!</Text>
      </View>
    );

    const haveLandmarks = savedLandmarks && savedLandmarks.length;

    return haveLandmarks ? landmarksList : noLandmarks;
  }
}
