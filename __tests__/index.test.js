import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";

const UserContext = React.createContext();

const sampleUser = {
  created_at: "2022-04-25T09:46:41.735+01:00",
  email: "qlars@example.com",
  id: "0b9b6413-bfa2-4d84-a2f0-4a1fc0f2f334",
  name: "Quincy Lars",
  role: "admin",
  token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTE0ODk4MjIsImlhdCI6MTY1MDg4NTAyMiwidXNlcm5hbWUiOiJxdWluY3kifQ.mWLLnEsnDhRkWUQlKSCnC6VRwXiPsX7qDzmlQcjqmoQ",
  updated_at: "2022-04-25T09:46:41.737+01:00",
  username: "quincy"
};

const [user, setUser] = useState(sampleUser);

const categories = [];
const topics = [];

describe("Home", async () => {
  it("renders a Subforum heading", () => {
    render(
      <UserContext.Provider value={{ user, setUser }}>
        <Home props={{ categories, topics }} />
      </UserContext.Provider>
    );

    const subForumElement = screen.getByText("Subforum");

    expect(subForumElement).toBeInTheDocument();
  });
});
