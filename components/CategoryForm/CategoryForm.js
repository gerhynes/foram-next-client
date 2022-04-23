import { useState, useEffect, useContext } from "react";
import slugify from "slugify";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CategoryForm({ isCategoryFormOpen, closeCategoryForm }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const datetime = new Date().toISOString();

    const category = {
      id: uuidv4(),
      name,
      slug: slugify(name, { lower: true, remove: /[*+~.()'"!:@?]/g }),
      description,
      user_id: user.id,
      username: user.username,
      created_at: datetime,
      updated_at: datetime,
      topics: [topic],
      posts: [post]
    };

    const topic = {
      id: uuidv4(),
      title,
      slug: slugify(title, { lower: true, remove: /[*+~.()'"!:@?]/g }),
      user_id: user.id,
      username: user.username,
      category_name,
      category_id,
      created_at: datetime,
      updated_at: datetime,
      posts: [post]
    };

    const post = {
      id: uuidv4(),
      post_number: 1,
      topic_id: topic.id,
      topic_slug: slugify(title, { lower: true, remove: /[*+~.()'"!:@?]/g }),
      user_id: user.id,
      username: user.username,
      content,
      created_at: datetime,
      updated_at: datetime
    };

    console.log(category);
  };

  return (
    <div
      className={`sticky bottom-0 left-0 px-4 py-4 bg-white w-full border-t-8 border-t-indigo-900 ${
        isCategoryFormOpen ? "" : "hidden"
      }`}
    >
      <div className="py-2 text-center">
        <h2 className="text-xl font-semibold text-indigo-900">
          Create a new Category
        </h2>
      </div>
      <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <h3 className="text-lg text-indigo-900 font-semibold mb-2">
            Category Details
          </h3>
          <div className="mb-2">
            <input
              name="categoryName"
              id="categoryName"
              type="text"
              className="border-2 border-slate-200 px-2 py-2 w-full"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <textarea
              name="categoryDescription"
              id="categoryDescription"
              className="px-2 py-2 border-2 border-slate-200 w-full"
              placeholder="Category Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg text-indigo-900 font-semibold mb-2">
            First Topic
          </h3>
          <div className="mb-2">
            <input
              name="topicTitle"
              id="topicTitle"
              type="text"
              className="border-2 border-slate-200 px-2 py-2 w-full"
              placeholder="Title of first Topic"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <textarea
              name="topicContent"
              id="topicContent"
              className="px-2 py-2 border-2 border-slate-200 w-full"
              placeholder="Content of first Topic"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
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
            <span className="ml-2">Create Category</span>
          </button>
          <button
            className="text-slate-400 font-semibold hover:text-red-500"
            onClick={closeCategoryForm}
          >
            cancel
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
}
export default CategoryForm;
