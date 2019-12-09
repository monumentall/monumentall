import React from "react";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import Map from "./Map";
import ExploreBrooklyn from "./ExploreBrooklyn"
import { specificStyles } from "../styles";
import { database } from "../db.js";
import { fetchLandmarks } from "../store/landmarks";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polyline: {
        show: false,
        coordinates: []
      }
    };
    this.db = database.ref();
  }

  componentDidMount = async () => {
    await this.props.getLandmarks(this.db);
  };

  render() {
    return (
    !this.props.err ?
    <View style={specificStyles.main}>
      <View>
        <ExploreBrooklyn/>
          <Map
            markers={this.props.landmarks}
          />
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
  getLandmarks: db => dispatch(fetchLandmarks(db))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
