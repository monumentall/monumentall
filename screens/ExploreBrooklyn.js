import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { reusableStyles, specificStyles } from "../styles";
import NearMe from "./NearMe";
import List from "./List";

export default class ExploreBrooklyn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSavedList: false
    };
  }

  showSavedListView = () => {
    this.setState({ showSavedList: true });
  };

  showNearMeView = () => {
    this.setState({ showSavedList: false });
  };

  render() {
    return (
      <View style={reusableStyles.block}>
        <View style={reusableStyles.flexrow}>
          <TouchableOpacity onPress={this.showNearMeView}>
            <Text style={reusableStyles.header1}>Near Me</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.showSavedListView}>
            <Text style={reusableStyles.header1}>Saved</Text>
          </TouchableOpacity>
        </View>
        <View>
          {this.state.showSavedList ? (
            <List />
          ) : (
            <NearMe landmarks={this.props.landmarks} />
          )}
        </View>
      </View>
    );
  }
}
