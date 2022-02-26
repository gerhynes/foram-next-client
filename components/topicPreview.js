import React from "react";
import Link from "next/link";

export default function TopicPreview({ topic }) {
  const { id, title, slug } = topic;
  return (
    <div className="px-2 py-4">
      <Link href={`/topics/${slug}/${id}`}>
        <a>
          <h2 className="text-xl font-semibold">{title}</h2>
        </a>
      </Link>
    </div>
  );
}
