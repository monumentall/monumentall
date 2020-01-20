import React from "react";
import { Text } from "react-native";
import { configure, shallow } from "enzyme";
import { HomeScreen } from "../screens/HomeScreen";
import Adapter from "enzyme-adapter-react-16";

configure({
  adapter: new Adapter()
});

const setup = ( Component, customProps = {} ) => {
	const props = {
		err: false,
		landmarks: [],
		getLandmarks: () => [],
		...customProps,
	};

	return shallow( <Component {...props} /> );
};

describe("Home Screen", () => {
  it("should render error text if there is an error", () => {
    const wrapper = setup(HomeScreen, {err: true});
    expect(wrapper.find(Text)).toHaveLength(2);
    expect(
      wrapper
        .find(Text)
        .first()
        .html()
    ).toEqual("<Text>There was a problem loading the landmarks.</Text>");
  });

  it("should not render error text if there is no error", () => {
    const wrapper = setup(HomeScreen);
    expect(wrapper.find(Text)).toHaveLength(0);
  });
});
