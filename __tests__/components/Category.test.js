import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Category from "../../components/Category/Category";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

const category = {
  created_at: "2022-04-25T09:46:42.289+01:00",
  description:
    "Ask questions and share tips for JavaScript, React, Node - anything to do with the JavaScript ecosystem.",
  id: "94da67f8-97bb-49dd-a9ee-581baa47a82d",
  name: "JavaScript",
  slug: "javascript",
  updated_at: "2022-04-25T09:38:45.794Z",
  user_id: "0b9b6413-bfa2-4d84-a2f0-4a1fc0f2f334"
};
const topicsCount = 1;
const latestTopic = {
  category_id: "94da67f8-97bb-49dd-a9ee-581baa47a82d",
  category_name: "JavaScript",
  created_at: "2022-04-25T09:46:42.308+01:00",
  id: "c1cc8556-e463-4522-9401-080a770cae6d",
  slug: "how-does-useeffect-work",
  title: "How does useEffect work?",
  updated_at: "2022-04-25T09:46:42.309+01:00",
  user_id: "df915229-8d9b-4fe5-9064-b17d9169eb23",
  username: "beatz"
};

describe("Category", () => {
  it("renders a Category title", () => {
    render(
      <Category
        category={category}
        topicsCount={topicsCount}
        latestTopic={latestTopic}
      />
    );
    const titleElement = screen.getByText(category.name);
    expect(titleElement).toBeInTheDocument();
  });
  it("renders a Category description", () => {
    render(
      <Category
        category={category}
        topicsCount={topicsCount}
        latestTopic={latestTopic}
      />
    );
    const paragraphElement = screen.getByText(category.description);
    expect(paragraphElement).toBeInTheDocument();
  });
  it("renders a Category topic count", () => {
    render(
      <Category
        category={category}
        topicsCount={topicsCount}
        latestTopic={latestTopic}
      />
    );
    const topicCountElement = screen.getByText(topicsCount);
    expect(topicCountElement).toBeInTheDocument();
  });
  it("renders a latestTopic datetime", () => {
    render(
      <Category
        category={category}
        topicsCount={topicsCount}
        latestTopic={latestTopic}
      />
    );
    const datetimeElement = screen.getByText(
      formatDistanceToNowStrict(new Date(latestTopic.created_at))
    );
    expect(datetimeElement).toBeInTheDocument();
  });
});
