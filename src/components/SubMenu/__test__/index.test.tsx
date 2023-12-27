import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SubMenu from "..";
import fetchMock from "jest-fetch-mock";

jest.mock("axios");
// let server = "https://fakestoreapi.com/products/category/electronics";
const mockdata = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

describe("Submenu component test with mocks", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  test("renders users when API call succeeds", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockdata), { status: 200 });
    render(<SubMenu data={mockdata} />);
    expect(await screen.findByText("electronics")).toBeInTheDocument();
    const selectedItem = screen.getByText("electronics");
    fireEvent.click(selectedItem);
  });
});
