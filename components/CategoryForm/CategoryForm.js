import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import slugify from "slugify";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../contexts/UserContext";

function CategoryForm({ isCategoryFormOpen, closeCategoryForm }) {
  // Router for redirecting on completion
  const router = useRouter();

  const { user, setUser } = useContext(UserContext);

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [topicTitle, setTopicTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const datetime = new Date().toISOString();

    const categoryId = uuidv4();
    const topicId = uuidv4();

    const category = {
      id: categoryId,
      name: categoryName,
      slug: slugify(categoryName, { lower: true, remove: /[*+~.()'"!:@?]/g }),
      description: categoryDescription,
      user_id: user.id,
      username: user.username,
      created_at: datetime,
      updated_at: datetime,
      topics: [
        {
          id: topicId,
          title: topicTitle,
          slug: slugify(topicTitle, { lower: true, remove: /[*+~.()'"!:@?]/g }),
          user_id: user.id,
          username: user.username,
          category_name: categoryName,
          category_id: categoryId,
          created_at: datetime,
          updated_at: datetime,
          posts: [
            {
              id: uuidv4(),
              post_number: 1,
              topic_id: topicId,
              topic_slug: slugify(topicTitle, {
                lower: true,
                remove: /[*+~.()'"!:@?]/g
              }),
              user_id: user.id,
              username: user.username,
              content: postContent,
              created_at: datetime,
              updated_at: datetime
            }
          ]
        }
      ]
    };

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/categories`, category, config)
      .then((response) => {
        if (response.message) {
          console.log(response.message);
          toast.error(
            `An error occurred (${response.message}). Please try again shortly`
          );
          return;
        }
        router.push(`/categories/${category.slug}/${categoryId}`);
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred. Please try again shortly");
      });
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
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
            <p className="text-slate-600">
              Try to keep category names to one word
            </p>
          </div>
          <div className="mb-2">
            <textarea
              name="categoryDescription"
              id="categoryDescription"
              className="px-2 py-2 border-2 border-slate-200 w-full"
              placeholder="Category Description"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
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
              value={topicTitle}
              onChange={(e) => setTopicTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <textarea
              name="topicContent"
              id="topicContent"
              className="px-2 py-2 border-2 border-slate-200 w-full"
              placeholder="Content of first Topic"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
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
