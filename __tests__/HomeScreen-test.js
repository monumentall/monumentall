import React from "react";
import renderer from "react-test-renderer";

import HomeScreen from "../screens/HomeScreen";

jest.mock("react-native-maps", () => ({__esModule: true,
  default: "MapView"}));

describe("HomeScreen", () => {
  it(`renders the map and the "Explore Brooklyn" drawer as the default`, () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
