import React, { useState } from "react";
import slugify from "slugify";

export default function TopicForm({ categories }) {
  // Create topic
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [username, setUsername] = useState("quince");
  const [userID, setUserID] = useState(1);
  const [categoryName, setCategoryName] = useState("");
  const [categoryID, setCategoryID] = useState(1);

  // Create post
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="border-t-4 border-t-indigo-900">
      <div className="py-2">
        <span className="text-lg font-semibold text-indigo-900">
          Create a new Topic
        </span>
      </div>
      <form action="#" className="max-w-lg" onSubmit={handleSubmit}>
        <div className="flex gap-4 w-full mb-2">
          <div>
            <input
              name="topicTitle"
              id="topicTitle"
              type="text"
              className="border-2 border-slate-200 px-2 py-2"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <select
              name="category"
              id="categorySelect"
              className="border-2 border-slate-200 px-2 py-2"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            >
              <option value="">Choose a Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-2">
          <textarea
            name="topicContent"
            id="topicContent"
            className="px-2 py-2 border-2 border-slate-200 w-full"
            placeholder="Type here"
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
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2">Create Topic</span>
          </button>
          <button className="text-slate-400 font-semibold hover:text-red-500">
            cancel
          </button>
        </div>
      </form>
    </div>
  );
}
