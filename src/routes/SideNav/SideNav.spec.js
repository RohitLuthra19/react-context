import React from "react";
import { act } from "react-dom/test-utils";
import SideNav from "./SideNav";
import "../../setupTests";
import renderer from "react-test-renderer";
import Store from "../../redux/categories/store";
import { shallow, mount } from "enzyme";

describe("SideNav renders", () => {
  it("renders", () => {
    const wrapper = shallow(
      <Store>
        <SideNav />
      </Store>
    );
    expect(wrapper.exists()).toBe(true);
  });

  it("SideNav component created", () => {
    let rendered;
    act(() => {
      rendered = renderer.create(
        <Store>
          <SideNav />
        </Store>
      );
      expect(rendered.toJSON()).toMatchSnapshot();
    });
  });

  it("find text:Categories", () => {
    const wrapper = mount(
      <Store>
        <SideNav />
      </Store>
    );
    const text = wrapper.find("h2").text();
    expect(text).toEqual("Categories");
  });

  it("side nav bar ul count", () => {
    const wrapper = mount(
      <Store>
        <SideNav />
      </Store>
    );
    const navBarLink = wrapper.find("ul");
    expect(navBarLink.length).toEqual(1);
  });
});
