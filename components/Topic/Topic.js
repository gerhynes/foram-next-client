import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import Avatar from "../Avatar/Avatar";

export default function Topic({ topic }) {
  const { id, title, slug, category_name, category_id, username } = topic;
  const [posts, setPosts] = useState([]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}/posts`)
      .then((res) => {
        setPosts(res.data);
        setIsMounted(true);
      })
      .catch((err) => console.error(err));
  }, []);

  const latestPost = posts.sort(
    (a, b) => -a.updated_at.localeCompare(b.updated_at)
  )[0]; // sort by most recently updated

  return (
    <div className="flex py-4 border-b-2 border-b-slate-200">
      <div className="w-16 grid place-content-center">
        <Link href={`/users/${username}`}>
          <a>
            <Avatar username={username} />
          </a>
        </Link>
      </div>
      <div className="flex-1 pl-2">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            <Link href={`/topics/${slug}/${id}`}>
              <a>{title}</a>
            </Link>
          </h2>
        </div>
        <div className="">
          <span className="px-2 text-indigo-900 bg-indigo-200">
            <Link
              href={`/categories/${category_name.toLowerCase()}/${category_id}`}
            >
              <a>{category_name}</a>
            </Link>
          </span>
        </div>
      </div>
      <div className="w-24 text-right">
        <div>
          <span className="text-2xl font-semibold">{posts.length}</span>
        </div>
        <div>
          <span className="text-slate-500">
            {isMounted &&
              formatDistanceToNowStrict(new Date(latestPost.updated_at))}
          </span>
        </div>
      </div>
    </div>
  );
}
