import React from "react";
import Link from "next/link";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import Avatar from "../Avatar/Avatar";

export default function Topic({ topic }) {
  const { id, title, slug, posts, category_name, category_id, username } =
    topic;
  return (
    <div className="flex pl-2 py-2 border-b-2 border-b-slate-200">
      <div className="w-16 grid place-content-center">
        <Link href={`/users/${username}`}>
          <a>
            <Avatar username={username} />
          </a>
        </Link>
      </div>
      <div className="flex-1">
        <div className="mb-2">
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
          <span className="text-xl font-semibold">{posts}</span>
        </div>
        <div>
          <span className="text-slate-500">{`${formatDistanceToNowStrict(
            new Date(topic.created_at)
          )}`}</span>
        </div>
      </div>
    </div>
  );
}
