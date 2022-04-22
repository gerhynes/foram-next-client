import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import { UserContext } from "../../contexts/UserContext";
import Avatar from "../Avatar/Avatar";
import WidgetButton from "../WidgetButton/WidgetButton";

export default function Post({
  post,
  openPostForm,
  openPostEditForm,
  currentPosts,
  setCurrentPosts,
  setPostToEdit
}) {
  const { user, setUser } = useContext(UserContext);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleEdit = () => {
    setPostToEdit(post);
    openPostEditForm();
  };

  return (
    <div className="flex mb-4 border-t-2 border-t-slate-200">
      <div className="w-16" id="avatar">
        <Link href={`/users/${post.username}`}>
          <a>
            <Avatar username={post.username} />
          </a>
        </Link>
      </div>
      <div className="flex-1 flex flex-col" id="postContent">
        <div className="flex justify-between py-2">
          <span className="font-semibold">{post.username}</span>
          <span className="font-semibold text-slate-400">
            {formatDistanceToNowStrict(new Date(post.created_at))}
          </span>
        </div>
        <div className="prose prose-slate break-all max-w-full">
          {post.content}
        </div>
        <div className="flex justify-end">
          <span className="font-semibold text-slate-400">
            {post.created_at !== post.updated_at
              ? `(edited) ${formatDistanceToNowStrict(
                  new Date(post.updated_at)
                )}`
              : ""}
          </span>
        </div>
        <div className="py-4 flex justify-end gap-4">
          {isMounted && post.username === user.username ? (
            <div className="flex gap-4">
              <WidgetButton
                thisPost={post}
                currentPosts={currentPosts}
                setCurrentPosts={setCurrentPosts}
              />
              <button
                className="bg-indigo-100 p-2 hover:bg-indigo-900 hover:text-white transition"
                aria-label="Edit button"
                title="Edit button"
                onClick={handleEdit}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
          ) : (
            ""
          )}
          {isMounted && user ? (
            <button
              className="py-2 px-4 font-semibold text-indigo-900 bg-indigo-100 hover:bg-indigo-900 hover:text-white transition"
              onClick={openPostForm}
            >
              Reply
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
