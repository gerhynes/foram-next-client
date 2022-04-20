import React from "react";
import Link from "next/link";

export default function PostPreview({ post }) {
  const { id, slug, topic_slug, topic_id } = post;
  return (
    <div className="prose py-4 border-b-2 border-b-slate-200">
      <Link href={`/topics/${topic_slug}/${topic_id}`}>
        <a>
          <p>{post.content.substring(0, 280)}</p>
        </a>
      </Link>
    </div>
  );
}
