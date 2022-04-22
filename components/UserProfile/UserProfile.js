import React from "react";
import TopicPreview from "../TopicPreview/TopicPreview";
import Topic from "../Topic/Topic";
import PostPreview from "../PostPreview/PostPreview";
import Avatar from "../Avatar/Avatar";

export default function userProfile({ user, topics, posts }) {
  return (
    <div className="max-w-3xl mt-10 mx-auto">
      <section className="flex mb-4" id="userDetails">
        <div className="w-16 grid place-content-center">
          <Avatar username={user.username} />
        </div>
        <div className="ml-2">
          <h1 className="text-3xl font-semibold mb-2">{user.username}</h1>
          <h2 className="text-lg font-semibold text-slate-500">{user.name}</h2>
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
