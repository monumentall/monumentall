import React from "react";
import renderer from "react-test-renderer";
import { HomeScreen } from "../screens/HomeScreen";

jest.mock("../screens/Map", () => "Map");
jest.mock("../screens/Explore", () => "Explore");

describe("HomeScreen", () => {
  it(`renders the map and the "Explore" drawer as the default`, () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    console.log(tree)
    expect(tree).toMatchSnapshot();
  });
});
