import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../contexts/UserContext";

export default function PostEditForm({
  posts,
  postToEdit,
  isPostEditFormOpen,
  closePostEditForm,
  setCurrentPosts
}) {
  // Access global user object
  const { user, setUser } = useContext(UserContext);

  const [content, setContent] = useState(postToEdit.content);

  // Load content from postToEdit once selected by user
  useEffect(() => {
    setContent(postToEdit.content);
  }, [postToEdit]);

  // Copy postToEdit and update fields
  const updatedPost = {
    ...postToEdit,
    content,
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
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${updatedPost.id}`,
        updatedPost,
        config
      )
      .then((response) => {
        if (response.status !== 200) {
          console.log(response.message);
          toast.error("An error occurred. Please try again shortly");
          return;
        }
        // Update current list of posts to keep UI in sync with database
        const existingPosts = posts.filter((post) => post.id !== updatedPost.id);
        setCurrentPosts([...existingPosts, updatedPost]);
        closePostEditForm();
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred. Please try again shortly");
      });
  };

  return (
    <div
      className={`sticky bottom-0 left-0 px-4 py-4 bg-white w-full border-t-8 border-t-indigo-900 ${
        isPostEditFormOpen ? "" : "hidden"
      }`}
    >
      <div className="py-2">
        <span className="text-lg font-semibold text-indigo-900">
          Edit post {postToEdit.post_number}
        </span>
      </div>
      <form className="max-w-lg" onSubmit={handleSubmit}>
        <div className="mb-2">
          <textarea
            name="postContent"
            id="postContent"
            className="px-2 py-2 border-2 border-slate-200 w-full"
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
            <span className="ml-2">Save</span>
          </button>
          <button
            className="text-slate-400 font-semibold hover:text-red-500"
            onClick={closePostEditForm}
          >
            cancel
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
