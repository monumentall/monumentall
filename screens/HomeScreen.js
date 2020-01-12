import React from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import Map from "./Map";
import Explore from "./Explore";
import { specificStyles } from "../styles";
import { database } from "../db.js";
import { getLandmarksAction } from "../store/landmarks";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.db = database.ref();
  }

  componentDidMount = async () => {
    await this.props.getLandmarks(this.db);
  };

  render() {
    return !this.props.err ? (
      <View style={specificStyles.main}>
        <View>
          <Explore />
          <Map />
        </View>
      </View>
    ) : (
      <View style={specificStyles.main}>
        <Text>There was a problem loading the landmarks.</Text>
        <TouchableOpacity onClick={() => this.props.getLandmarks(this.db)}>
          <Text>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  landmarks: state.landmarks.data || [],
  err: state.landmarks.err
});

const mapDispatchToProps = dispatch => ({
  getLandmarks: db => dispatch(getLandmarksAction(db))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
