import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../contexts/UserContext";

function TopicEditForm({
  topic,
  categories,
  categoryName,
  setTitle,
  setCategoryName,
  setCategoryId,
  isTopicEditFormOpen,
  closeTopicEditForm
}) {
  // Access global user object
  const { user, setUser } = useContext(UserContext);

  const [topicTitle, setTopicTitle] = useState(topic.title);
  const [topicCategoryName, setTopicCategoryName] = useState(categoryName);

  const updatedTopic = {
    ...topic,
    title: topicTitle,
    category_name: topicCategoryName,
    category_id: categories.find(
      (category) => category.name === topicCategoryName
    ).id,
    updated_at: new Date().toISOString()
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add headers
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };

    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/topics/${topic.id}`,
        updatedTopic,
        config
      )
      .then((response) => {
        if (response.status !== 200) {
          console.log(response.message);
          toast.error("An error occurred. Please try again shortly");
          return;
        }
        setTitle(topicTitle);
        setCategoryName(topicCategoryName);
        setCategoryId(
          categories.find((category) => category.name === topicCategoryName).id
        );
        closeTopicEditForm();
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred. Please try again shortly");
      });
  };

  return (
    <div
      className={`sticky bottom-0 left-0 px-4 py-4 bg-white w-full border-t-8 border-t-indigo-900 ${
        isTopicEditFormOpen ? "" : "hidden"
      }`}
    >
      <div className="py-2 text-center">
        <span className="text-lg font-semibold text-indigo-900">
          Edit Topic Title and Category
        </span>
      </div>
      <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            name="topicTitle"
            id="topicTitle"
            type="text"
            className="border-2 border-slate-200 px-2 py-2 w-full"
            placeholder="Title"
            value={topicTitle}
            onChange={(e) => setTopicTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <select
            name="category"
            id="categorySelect"
            className="border-2 border-slate-200 px-2 py-2 w-full"
            value={topicCategoryName}
            onChange={(e) => setTopicCategoryName(e.target.value)}
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-4">
          <button className="inline-flex items-center px-2 py-2 text-indigo-900 border-4 border-indigo-900 hover:bg-indigo-900  hover:text-white transition">
            Save
          </button>
          <button
            className="text-slate-400 font-semibold hover:text-red-500"
            onClick={closeTopicEditForm}
          >
            cancel
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
export default TopicEditForm;
