import React from "react";
import { View, Text } from "react-native";
import { reusableStyles, specificStyles } from "../styles";
import { setLandmark } from "../store/selectedLandmark";

class NearMe extends React.Component {
  render() {
    const landmarks = this.props.landmarks;
    if (landmarks.length) {
      return (
        <View style={reusableStyles.block}>
          {landmarks.map(landmark => (
            <TouchableOpacity
              key={landmark.name}
              style={specificStyles.listItemWithIcon}
              onPress={() => this.props.selectLandmark(landmark)}
            >
              <View style={reusableStyles.listIcon} />
              <View>
                <Text style={reusableStyles.header2}>{landmark.name}</Text>
                <Text style={reusableStyles.text1}>{landmark.location}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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

const mapStateToProps = state => ({
  landmarks: state.landmarks.data || [],
  landmarkDetails: state.selectedLandmark || {}
});

const mapDispatchToProps = dispatch => ({
  selectLandmark: landmark => dispatch(setLandmark(landmark))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NearMe);
