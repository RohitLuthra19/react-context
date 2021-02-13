import React from "react";
import Main from "./Main";
import "../../setupTests";
import renderer from "react-test-renderer";
import { mount, shallow } from "enzyme";
import Store from "../../redux/categories/store";

describe("Main renders", () => {
  it("renders", () => {
    const wrapper = shallow(
      <Store>
        <Main />
      </Store>
    );
    expect(wrapper.exists()).toBe(true);
  });
  it("Main component created", () => {
    const rendered = renderer.create(
      <Store>
        <Main />
      </Store>
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it("find more button", () => {
    const wrapper = mount(
      <Store>
        <Main />
      </Store>
    );
    const text = wrapper.find("button").text();
    expect(text).toEqual("More");
  });
});
