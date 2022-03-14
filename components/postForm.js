import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";

export default function PostForm({
  topic,
  posts,
  isOpen,
  closeForm,
  setCurrentPosts
}) {
  const [content, setContent] = useState("");

  // Generate post id
  const postId = uuidv4();

  const datetime = new Date().toISOString();

  // Populate post object
  const post = {
    id: postId,
    post_number: posts.length + 1,
    topic_id: topic.id,
    topic_slug: slugify(topic.title, {
      lower: true,
      remove: /[*+~.()'"!:@?]/g
    }),
    user_id: "33de6e57-c57c-4451-82b9-b73ae248c672",
    username: "quince",
    content,
    created_at: datetime,
    updated_at: datetime
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(post);

    axios
      .post("http://localhost:8080/api/posts", post)
      .then((res) => console.log(res))
      .catch((error) => console.error(error));

    // Update current list of posts to keep UI in sync with database
    setCurrentPosts([...posts, post]);

    closeForm();
  };

  return (
    <div
      className={`sticky bottom-0 left-0 px-4 py-4 bg-white w-full border-t-8 border-t-indigo-900 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="py-2">
        <span className="text-lg font-semibold text-indigo-900">
          {topic.title}
        </span>
      </div>
      <form className="max-w-lg" onSubmit={handleSubmit}>
        <div className="mb-2">
          <textarea
            name="topicContent"
            id="topicContent"
            className="px-2 py-2 border-2 border-slate-200 w-full"
            placeholder="Type your reply here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="flex gap-4">
          <button className="inline-flex items-center px-2 py-2 text-indigo-900 border-4 border-indigo-900 hover:bg-indigo-900  hover:text-white transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            <span className="ml-2">Reply</span>
          </button>
          <button
            className="text-slate-400 font-semibold hover:text-red-500"
            onClick={closeForm}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
}
