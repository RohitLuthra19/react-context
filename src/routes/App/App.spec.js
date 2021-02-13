import React from "react";
import { act } from "react-dom/test-utils";
import App from "./App";
import "../../setupTests";
import renderer from "react-test-renderer";
import Store from "../../redux/categories/store";

describe("App Component", () => {
  it("should render without throwing an error", () => {
    let rendered;

    act(() => {
      rendered = renderer.create(
        <Store>
          <App />
        </Store>
      );
      expect(rendered.toJSON()).toMatchSnapshot();
    });
  });
});
