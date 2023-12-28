/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "..";
import { AuthContext } from "../../../contexts/AuthContext";

describe("Header", () => {
  // Helper function to render Header with provided props
  const renderHeader = (props: any) => {
    return render(<Header {...props} />);
  };

  it("renders Header correctly with user", () => {
    const user = { user: "John" };
    const { getByText } = renderHeader({ user });

    expect(getByText("Fakestore")).toBeInTheDocument();
    expect(getByText("Welcome back John")).toBeInTheDocument();
    expect(getByText("Logout")).toBeInTheDocument();
  });

  it("renders Header correctly without user", () => {
    const { getByText, getByTestId } = render(<Header />);

    expect(getByText("Fakestore")).toBeInTheDocument();
    expect(getByTestId("login")).toBeInTheDocument();
    expect(getByText("Logout")).toBeInTheDocument();
  });
});

// testing auth context
describe("context test in Header", () => {
  it("should logout user on button click", () => {
    const user = { user: "chethan" };
    const login = jest.fn();
    const logout = jest.fn();
    const { getByText } = render(
      <AuthContext.Provider value={{ user, login, logout }}>
        <Header />
      </AuthContext.Provider>
    );
    const logoutBtn = getByText("Logout");
    fireEvent.click(logoutBtn);
    expect(logout).toHaveBeenCalledTimes(1);
  });
});
