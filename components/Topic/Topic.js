import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import Avatar from "../Avatar/Avatar";
import CategoryTag from "../CategoryTag/CategoryTag";

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
          <Link href={`/topics/${slug}/${id}`}>
            <a className="hover:underline">
              <h2 className="text-xl font-semibold">{title}</h2>
            </a>
          </Link>
        </div>
        <div className="mb-2">
          <CategoryTag
            category_id={category_id}
            category_name={category_name}
          />
        </div>
      </div>
      <div className="w-24 text-right">
        <div>
          <span className="text-2xl font-semibold">{posts.length}</span>
        </div>
        <div>
          <span className="text-slate-500">
            {isMounted &&
              latestPost.updated_at &&
              formatDistanceToNowStrict(new Date(latestPost.updated_at))}
          </span>
        </div>
      </div>
    </div>
  );
}
