import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Topic from "../components/Topic/Topic";

const sampleTopic = {
  category_id: "94da67f8-97bb-49dd-a9ee-581baa47a82d",
  category_name: "JavaScript",
  created_at: "2022-04-25T09:46:42.301+01:00",
  id: "3f230f9e-9a92-4e7e-b9b3-791622510bb5",
  slug: "i-dont-understand-promises-in-javascript-help",
  title: "I don't understand promises in JavaScript. Help!",
  updated_at: "2022-04-25T09:46:42.301+01:00",
  user_id: "0b9b6413-bfa2-4d84-a2f0-4a1fc0f2f334",
  username: "quincy"
};

describe("Topic", () => {
  it("renders a Topic title", () => {
    render(<Topic topic={sampleTopic} />);
    const titleElement = screen.getByText(sampleTopic.title);
    expect(titleElement).toBeInTheDocument();
  });
});
