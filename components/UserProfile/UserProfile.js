import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import TopicPreview from "../TopicPreview/TopicPreview";
import Topic from "../Topic/Topic";
import PostPreview from "../PostPreview/PostPreview";
import Avatar from "../Avatar/Avatar";
import DeleteUser from "../DeleteUser/DeleteUser";
import { UserContext } from "../../contexts/UserContext";

export default function profileUser({ profileUser, topics, posts }) {
  const { user, setUser } = useContext(UserContext);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="max-w-3xl mt-10 mx-auto">
      <section
        className="flex mb-4 justify-between items-center"
        id="userDetails"
      >
        <div className="flex">
          <div className="w-16 grid place-content-center">
            <Avatar username={profileUser.username} />
          </div>
          <div className="ml-2">
            <h1 className="text-3xl font-semibold mb-2">
              {profileUser.username}
            </h1>
            <h2 className="text-lg font-semibold text-slate-500">
              {profileUser.name}
            </h2>
          </div>
        </div>
        <div>
          {profileUser.role === "admin" && (
            <Link href="/admin">
              <a className="inline-flex items-center px-2 py-2 text-indigo-900 border-4 border-indigo-900 hover:bg-indigo-900  hover:text-white transition">
                Admin Dashboard
              </a>
            </Link>
          )}
        </div>
      </section>
      <section className="py-2 mb-4" id="userTopics">
        <h3 className="text-lg font-semibold">
          Topics by {profileUser.username}
        </h3>
        {topics
          .sort((a, b) => -a.created_at.localeCompare(b.created_at)) // sort by most recently created
          .map((topic) => (
            <Topic key={topic.id} topic={topic} />
          ))}
      </section>
      <section className="py-2" id="userPosts">
        <h3 className="text-lg font-semibold">
          Posts by {profileUser.username}
        </h3>
        {posts
          .sort((a, b) => -a.created_at.localeCompare(b.created_at)) // sort by most recently created
          .map((post) => (
            <PostPreview key={post.id} post={post} />
          ))}
      </section>
      <section>
        {((isMounted && user.id === profileUser.id) ||
          user.role === "admin") && <DeleteUser userToDelete={profileUser} />}
      </section>
    </div>
  );
}
