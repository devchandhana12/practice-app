import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "..";

afterEach(cleanup);
it("should match the snapshot of footer", () => {
  const { asFragment, getByText } = render(<Footer />);
  expect(asFragment()).toMatchSnapshot();
  // eslint-disable-next-line testing-library/prefer-screen-queries
  const content = getByText("im a footer to your site");
  expect(content).toBeInTheDocument();
});
