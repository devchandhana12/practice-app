import React from "react";
import renderer from "react-test-renderer";
import App from "../App";
test("demo", () => {
  expect(true).toBe(true);
});

describe("Jest Snapshot testing suite", () => {
  it("Matches DOM Snapshot", () => {
    const domTree = renderer.create(<App />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
