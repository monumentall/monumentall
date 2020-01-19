import React from "react";
import { Text } from "react-native";
import { configure, shallow } from "enzyme";
import { HomeScreen } from "../screens/HomeScreen";
import Adapter from "enzyme-adapter-react-16";

configure({
  adapter: new Adapter()
});

const baseProps = {
  err: false,
  landmarks: [],
  getLandmarks: () => []
};

describe("Home Screen", () => {
  it("should render error text if there is an error", () => {
    const props = { ...baseProps, err: true };

    const wrapper = shallow(<HomeScreen {...props} />);
    expect(wrapper.find(Text)).toHaveLength(2);
    expect(
      wrapper
        .find(Text)
        .first()
        .html()
    ).toEqual("<Text>There was a problem loading the landmarks.</Text>");
  });
});
