import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../../pages/login";
import { UserContext } from "../../contexts/UserContext";

const user = {};
const setUser = jest.fn();

describe("Login", () => {
  it("renders a login form", async () => {
    render(
      <UserContext.Provider value={{ user, setUser }}>
        <Login />
      </UserContext.Provider>
    );
    const nameInputElement = screen.getByPlaceholderText("Username");
    const passwordInputElement = screen.getByPlaceholderText("Password");
    const buttonElement = screen.getByText("Log In");
    expect(nameInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });
});
