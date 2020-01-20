import React from "react";
import { configure, shallow } from "enzyme";
import BottomSheet from "reanimated-bottom-sheet";
import { Explore } from "../screens/Explore";
import Adapter from "enzyme-adapter-react-16";

configure({
  adapter: new Adapter()
});

const setup = ( Component, customProps = {} ) => {
	const props = {
		landmarkDetails: {},
		...customProps,
	};

	return shallow( <Component {...props} /> );
};

describe("Explore Screen", () => {
  it("should have a BottomSheet", () => {
    const wrapper = setup(Explore, {err: true});
    expect(wrapper.find(BottomSheet)).toHaveLength(1);
  });

});
