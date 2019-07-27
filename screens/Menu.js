import React from "react";
import { View, Text } from "react-native";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        {this.props.visible && (
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              backgroundColor: "#00000080"
            }}
          >
            <View
              style={{
                width: 200,
                height: 300,
                backgroundColor: "#fff",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text>Menu</Text>
            </View>
          </View>
        )}
      </View>
    );
  }
}
