import React from 'react';
import { act } from 'react-dom/test-utils';
import App from './App';
import '../../setupTests';
import renderer from 'react-test-renderer';
import store from '../../redux/store';
import { Provider } from "react-redux";

describe("App Component", () => {
  it("should render without throwing an error", () => {
    let rendered;

    act(() => {
      rendered = renderer.create(
        <Provider store={store}>
            <App />
        </Provider>
      )
      expect(rendered.toJSON()).toMatchSnapshot();
    });
    
  });
});