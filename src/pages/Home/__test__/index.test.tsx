/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import Home from "..";
import {
  fireEvent,
  render,
  cleanup,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
afterEach(cleanup);

it("should match snapshot", () => {
  const { asFragment } = render(<Home />);
  expect(asFragment()).toMatchSnapshot();
});

jest.mock("axios");
const mockdata = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
];

test("renders products when API call succeeds", async () => {
  // Mock the API response
  fetchMock.mockResponseOnce(JSON.stringify(mockdata), { status: 200 });

  // Render the Home component
  render(<Home />);

  // Wait for the API call and rendering to complete
  await waitFor(() => {
    // Use a simplified custom text matcher function
    const textMatcher = (content: string, element: Element | null) => {
      return element?.textContent?.includes(content) || false;
    };

    // Assert that the product card element is rendered
    expect(
      screen.getByText((_, element) =>
        textMatcher(
          "Your perfect pack for everyday use and walks in the forest.",
          element
        )
      )
    ).toBeInTheDocument();

    // Add more assertions based on your component's structure
    expect(screen.getByText("3.9 (120)")).toBeInTheDocument();
    // ... add more assertions based on your component's structure
  });
});
