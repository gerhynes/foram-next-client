import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../pages/index";
import { UserContext } from "../../contexts/UserContext";

const categories = [
  {
    created_at: "2022-04-25T09:46:42.289+01:00",
    description:
      "Ask questions and share tips for JavaScript, React, Node - anything to do with the JavaScript ecosystem.",
    id: "94da67f8-97bb-49dd-a9ee-581baa47a82d",
    name: "JavaScript",
    slug: "javascript",
    updated_at: "2022-04-25T09:38:45.794Z",
    user_id: "0b9b6413-bfa2-4d84-a2f0-4a1fc0f2f334"
  }
];

const topics = [
  {
    category_id: "94da67f8-97bb-49dd-a9ee-581baa47a82d",
    category_name: "JavaScript",
    created_at: "2022-04-25T09:46:42.308+01:00",
    id: "c1cc8556-e463-4522-9401-080a770cae6d",
    slug: "how-does-useeffect-work",
    title: "How does useEffect work?",
    updated_at: "2022-04-25T09:46:42.309+01:00",
    user_id: "df915229-8d9b-4fe5-9064-b17d9169eb23",
    username: "beatz"
  }
];

const user = {
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

const mockProps = {
  categories,
  topics
};

const setUser = jest.fn();

describe("Home", () => {
  it("renders a Subforum heading", async () => {
    render(
      <UserContext.Provider value={{ user, setUser }}>
        <Home {...mockProps} />
      </UserContext.Provider>
    );
    const subForumElement = screen.getByText("Subforum");
    expect(subForumElement).toBeInTheDocument();
  });
  it("renders details of Categories", async () => {
    render(
      <UserContext.Provider value={{ user, setUser }}>
        <Home {...mockProps} />
      </UserContext.Provider>
    );
    const categoryHeadingElement = await screen.findByRole("heading", {
      name: categories[0].name
    });
    const categoryParagraphElement = await screen.findByText(
      categories[0].description
    );
    expect(categoryHeadingElement).toBeInTheDocument();
    expect(categoryParagraphElement).toBeInTheDocument();
  });
  it("renders details of latest Topics", async () => {
    render(
      <UserContext.Provider value={{ user, setUser }}>
        <Home {...mockProps} />
      </UserContext.Provider>
    );
    const topicHeadingElement = await screen.findByRole("heading", {
      name: topics[0].title
    });

    expect(topicHeadingElement).toBeInTheDocument();
  });
});
