import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../contexts/UserContext";

export default function TopicForm({
  categories,
  isTopicFormOpen,
  closeTopicForm
}) {
  // Router for redirecting on completion
  const router = useRouter();

  // Access logged-in user
  const { user, setUser } = useContext(UserContext);

  const topicId = uuidv4();
  const postId = uuidv4();

  const datetime = new Date().toISOString();

  // Create topic
  const [title, setTitle] = useState("");

  // Set default category details to those of first category
  // Prevents categoryId being undefined
  const [categoryName, setCategoryName] = useState(categories[0].name);
  const [categoryId, setCategoryId] = useState(categories[0].id);

  // Create post
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    // Prevent page reload
    e.preventDefault();

    // Get category_id based off selected category
    setCategoryId(
      categories.find((category) => category.name === categoryName).id
    );

    // Populate post object
    const post = {
      id: postId,
      post_number: 1,
      topic_id: topicId,
      topic_slug: slugify(title, { lower: true, remove: /[*+~.()'"!:@?]/g }),
      user_id: user.id,
      username: user.username,
      content,
      created_at: datetime,
      updated_at: datetime
    };

    // Populate topic object, including posts
    const topic = {
      id: topicId,
      title,
      slug: slugify(title, { lower: true, remove: /[*+~.()'"!:@?]/g }),
      user_id: user.id,
      username: user.username,
      category_name: categoryName,
      category_id: categoryId,
      created_at: datetime,
      updated_at: datetime,
      posts: [post]
    };

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/topics`, topic, config)
      .then((response) => {
        if (response.message) {
          console.log(response.message);
          toast.error("An error occurred. Please try again shortly");
          return;
        }
        router.push(`/topics/${topic.slug}/${topicId}`);
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred. Please try again shortly");
      });
  };

  return (
    <div
      className={`sticky bottom-0 left-0 px-4 py-4 bg-white w-full border-t-8 border-t-indigo-900 ${
        isTopicFormOpen ? "" : "hidden"
      }`}
    >
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold text-indigo-900">
          Create a new Topic
        </h2>
      </div>
      <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-4 w-full mb-2">
          <div className="flex-1">
            <input
              name="topicTitle"
              id="topicTitle"
              type="text"
              className=" border-2 border-slate-200 px-2 py-2 w-full"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <select
              name="category"
              id="categorySelect"
              className="flex-1 border-2 border-slate-200 px-2 py-2 w-full"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            >
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
            onClick={closeTopicForm}
          >
            cancel
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
