import React from "react";
import { render, cleanup } from "@testing-library/react";
import App from "../App";
import "resize-observer-polyfill";

global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

afterEach(cleanup);
it("should take a snapshot", () => {
  const { asFragment } = render(<App />);

  expect(asFragment()).toMatchSnapshot();
});
