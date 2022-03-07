import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import slugify from "slugify";

export default function TopicForm({ categories, isOpen, closeForm }) {
  // Router for redirecting on completion
  const router = useRouter();

  // Create topic
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("quince");
  const [user_id, setUserID] = useState(1);
  const [category_name, setCategoryName] = useState("");

  // Create post
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    // Prevent page reload
    e.preventDefault();

    // Get category_id based off selected category
    const category_id = categories.find(
      (category) => category.name === category_name
    ).id;

    // Populate topic object
    const topic = {
      id: null,
      title,
      slug: slugify(title),
      username,
      user_id,
      username,
      category_name,
      category_id
    };

    // Populate post object
    const post = {
      id: null,
      post_number: 1,
      topic_id: null,
      topic_slug: slugify(title),
      user_id,
      username,
      content
    };

    console.log(topic);
    console.log(post);

    // axios
    //   .post(`${process.env.NEXT_PUBLIC_API_URL/topics}`, topic)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // axios
    //   .post(`${process.env.NEXT_PUBLIC_API_URL/posts}`, post)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    router.push(`/categories/${category_name}/${category_id}`);
  };

  return (
    <div
      className={`sticky bottom-0 left-0 px-4 py-4 bg-white w-full border-t-8 border-t-indigo-900 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="py-2">
        <span className="text-lg font-semibold text-indigo-900">
          Create a new Topic
        </span>
      </div>
      <form action="#" className="max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-4 w-full mb-2">
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
              value={category_name}
              onChange={(e) => setCategoryName(e.target.value)}
              required
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
