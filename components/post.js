import React from "react";
import Avatar from "../components/avatar";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
export default function Post({ post, username, openForm }) {
  return (
    <div className="flex mb-4 border-t-2 border-t-slate-200">
      <div className="w-16" id="avatar">
        <Avatar username={post.username} />
      </div>
      <div className="flex-1 flex flex-col" id="postContent">
        <div className="flex justify-between py-2">
          <span className="font-semibold">{post.username}</span>
          <span className="font-semibold text-slate-400">
            {formatDistanceToNowStrict(new Date(post.created_at))}
          </span>
        </div>
        <div className="prose">{post.content}</div>
        <div className="py-4 text-right">
          <button
            className="py-2 px-4 font-semibold text-indigo-900 bg-indigo-100 hover:bg-indigo-900 hover:text-white transition"
            onClick={openForm}
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}
