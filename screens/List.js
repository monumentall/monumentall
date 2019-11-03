import React from "react";
import {
  View,
  Text,
  AsyncStorage,
  Button,
  TouchableOpacity
} from "react-native";
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
              <View style={reusableStyles.block}>
                <View
                  key={landmark.name}
                  style={specificStyles.listItemWithIcon}
                >
                  <View style={reusableStyles.listIcon} />
                  <View style={reusableStyles.block}>
                    <Text style={reusableStyles.header2}>{landmark.name}</Text>
                    <Text style={reusableStyles.text1}>
                      {landmark.location}
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.deleteLandmark(landmark.name)}
                    >
                      <Text style={specificStyles.listButtons}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}

        <View style={reusableStyles.block}>
          <TouchableOpacity onPress={this.deleteList}>
            <Text style={specificStyles.listButtons}>Delete All</Text>
          </TouchableOpacity>
        </View>
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
