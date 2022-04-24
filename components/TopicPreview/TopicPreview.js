import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import Avatar from "../Avatar/Avatar";

export default function TopicPreview({ topic }) {
  const { id, title, slug, username } = topic;
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
    <div className="px-2 py-4 border-b-2 border-b-slate-200">
      <div className="flex justify-between items-center gap-4">
        <Link href={`/topics/${slug}/${id}`}>
          <a>
            <h2 className="text-xl font-semibold hover:underline">{title}</h2>
          </a>
        </Link>
        <div className="flex justify-between gap-4">
          <span>
            <Link href={`/users/${username}`}>
              <a>
                <Avatar username={username} />
              </a>
            </Link>
          </span>
          <span className="w-14 grid place-content-center">
            {/* Count responses, if any */}
            {posts.length > 1 ? posts.length - 1 : 0}
          </span>
          <span className="w-14 grid place-content-center">
            {isMounted &&
              formatDistanceToNowStrict(new Date(latestPost.updated_at))}
          </span>
        </div>
      </div>
    </div>
  );
}
