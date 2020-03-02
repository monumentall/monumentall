import React from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { View, Text, AsyncStorage, TouchableOpacity } from "react-native";
import { reusableStyles, specificStyles } from "../styles";
import { selectLandmarkAction } from "../store/selectedLandmark";
import { setRegionAction } from "../store/region";
import Constants from "../constants/Constants";

class Saved extends React.Component {
  constructor() {
    super();
    this.state = {
      savedLandmarks: []
    };
    this.deleteList = this.deleteList.bind(this);
  }

  componentDidMount = () => {
    AsyncStorage.getItem("savedLandmarks")
      .then(storedLandmarks => {
        let savedLandmarks = JSON.parse(storedLandmarks);
        // this if statement prevents us from setting null on state if "savedLandmarks" doesn't exist in AsyncStorage yet
        if (savedLandmarks) {
          this.setState({ savedLandmarks });
        }
      })
      .catch(err => console.error(err));
  };

  deleteList = async () => {
    await AsyncStorage.removeItem("savedLandmarks");
    this.setState({ savedLandmarks: [] });
  };

  deleteLandmark = selectedLandmarkName => {
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
  };

  setRegionAndSelectLandmark = landmark => {
    this.props.selectLandmark(landmark);
    this.props.setRegion({
      latitude: landmark.latitude,
      longitude: landmark.longitude,
      longitudeDelta: Constants.latLongDelta,
      latitudeDelta: Constants.latLongDelta
    });
  };

  render() {
    const { savedLandmarks } = this.state;

    const landmarksList = (
      <View>
        {savedLandmarks &&
          savedLandmarks.map(landmark => {
            return (
              <View style={reusableStyles.block} key={landmark.name}>
                <View
                  key={landmark.name}
                  style={specificStyles.listItemWithIcon}
                >
                  <View style={reusableStyles.listIcon} />
                  <TouchableOpacity
                    style={reusableStyles.block}
                    onPress={() => this.setRegionAndSelectLandmark(landmark)}
                  >
                    <Text style={reusableStyles.header2}>{landmark.name}</Text>
                    <Text style={reusableStyles.text1}>
                      {landmark.location}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.deleteLandmark(landmark.name)}
                    style={reusableStyles.button}
                  >
                    <Text style={reusableStyles.header2}>X</Text>
                  </TouchableOpacity>
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

const mapDispatchToProps = dispatch => ({
  selectLandmark: landmark => dispatch(selectLandmarkAction(landmark)),
  setRegion: region => dispatch(setRegionAction(region))
});

Saved.propTypes = {
  selectLandmark: PropTypes.func.isRequired,
  setRegion: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps
)(Saved);
