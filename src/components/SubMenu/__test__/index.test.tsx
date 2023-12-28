import React from "react";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import SubMenu from "..";
import fetchMock from "jest-fetch-mock";

jest.mock("axios");
const mockdata = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];
afterEach(cleanup);

describe("Submenu component test with mocks", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  test("renders users when API call succeeds", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockdata), { status: 200 });
    render(<SubMenu data={mockdata} setData={jest.fn()} />);
    expect(await screen.findByText("electronics")).toBeInTheDocument();
    const selectedItem = screen.getByText("electronics");
    fireEvent.click(selectedItem);
  });
});

it("should match the snapshot", () => {
  const { asFragment } = render(
    <SubMenu data={mockdata} setData={jest.fn()} />
  );
  expect(asFragment).toMatchSnapshot();
});
