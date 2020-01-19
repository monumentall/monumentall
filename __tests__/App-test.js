import React from "react";
import { configure, mount, shallow } from "enzyme";
import App from "../App";
import Adapter from "enzyme-adapter-react-16";

configure({
  adapter: new Adapter()
});

const baseProps = {
  skipLoadingScreen: true
};

describe("App", () => {
  it(`renders the loading app if skipLoadingScreen is false`, () => {
    const props = { ...baseProps, skipLoadingScreen: false };

    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find("AppLoading")).toHaveLength(1);
  });

  it(`renders the homeScreen if skipLoadingScreen is true`, () => {
    const props = { ...baseProps };

    const wrapper = shallow(<App {...props} />);
    expect(wrapper.find("Provider")).toHaveLength(1);
  });
});

// it(`renders the loading screen`, () => {
//   const tree = renderer.create(<App />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

// it(`renders the root without loading screen`, () => {
//   const tree = renderer.create(<App skipLoadingScreen />).toJSON();
//   expect(tree).toMatchSnapshot();
// });
