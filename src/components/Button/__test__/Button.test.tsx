// src/components/Button/__tests__/ButtonComp.test.js

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ButtonComp from "../index";

describe("ButtonComp", () => {
  it("renders ButtonComp correctly", () => {
    const { asFragment } = render(
      <ButtonComp
        label="Click me"
        variant="primary"
        color="blue"
        style={{ fontWeight: "bold" }}
        type="button"
        disabled={false}
        onClick={() => console.log("Button clicked")}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("handles click event", () => {
    // Mocking a function to check if it's called when the button is clicked
    const mockClickHandler = jest.fn();

    const { getByText } = render(
      <ButtonComp label="Click me" onClick={mockClickHandler} />
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const button = getByText("Click me");
    button.click();

    expect(mockClickHandler).toHaveBeenCalled();
  });
});
