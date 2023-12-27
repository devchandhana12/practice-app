import React from "react";
import CardComp from "..";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

afterEach(cleanup);
it("should match snapshot", () => {
  const { asFragment } = render(
    <CardComp>
      <p>hello</p>
    </CardComp>
  );
  expect(asFragment()).toMatchSnapshot();
});
