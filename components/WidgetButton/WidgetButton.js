import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

export default function WidgetButton({
  thisPost,
  currentPosts,
  setCurrentPosts
}) {
  // Access logged-in user
  const { user, setUser } = useContext(UserContext);

  const [isBtnsVisible, setIsBtnsVisible] = useState(false);

  const toggleButtons = () => {
    setIsBtnsVisible(!isBtnsVisible);
  };

  const deletePost = () => {
    // Delete post from database

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };

    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/posts/${thisPost.id}`, config)
      .then((res) => {
        console.log(res);
        // Update state to show post has been deleted
        setCurrentPosts(currentPosts.filter((post) => post.id !== thisPost.id));
      })
      .catch((error) => console.error(error));
  };

  return (
    <span className="flex gap-4">
      {isBtnsVisible && (
        <button
          className="bg-red-200 text-red-900 p-2 hover:bg-red-900 hover:text-white transition"
          aria-label="delete"
          onClick={deletePost}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      <button
        className="bg-indigo-100 p-2 hover:bg-indigo-900 hover:text-white transition"
        aria-label="show more"
        onClick={toggleButtons}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
    </span>
  );
}
