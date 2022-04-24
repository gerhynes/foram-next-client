import React from "react";
import Link from "next/link";
import TopicPreview from "../TopicPreview/TopicPreview";
import Topic from "../Topic/Topic";
import PostPreview from "../PostPreview/PostPreview";
import Avatar from "../Avatar/Avatar";

export default function userProfile({ user, topics, posts }) {
  return (
    <div className="max-w-3xl mt-10 mx-auto">
      <section
        className="flex mb-4 justify-between items-center"
        id="userDetails"
      >
        <div className="flex">
          <div className="w-16 grid place-content-center">
            <Avatar username={user.username} />
          </div>
          <div className="ml-2">
            <h1 className="text-3xl font-semibold mb-2">{user.username}</h1>
            <h2 className="text-lg font-semibold text-slate-500">
              {user.name}
            </h2>
          </div>
        </div>
        <div>
          {user.role === "admin" && (
            <Link href="/admin">
              <a className="inline-flex items-center px-2 py-2 text-indigo-900 border-4 border-indigo-900 hover:bg-indigo-900  hover:text-white transition">
                Admin Dashboard
              </a>
            </Link>
          )}
        </div>
      </section>
      <section className="py-2 mb-4" id="userTopics">
        <h3 className="text-lg font-semibold">Topics by {user.username}</h3>
        {topics
          .sort((a, b) => -a.created_at.localeCompare(b.created_at)) // sort by most recently created
          .map((topic) => (
            <Topic key={topic.id} topic={topic} />
          ))}
      </section>
      <section className="py-2" id="userPosts">
        <h3 className="text-lg font-semibold">Posts by {user.username}</h3>
        {posts
          .sort((a, b) => -a.created_at.localeCompare(b.created_at)) // sort by most recently created
          .map((post) => (
            <PostPreview key={post.id} post={post} />
          ))}
      </section>
    </div>
  );
}
