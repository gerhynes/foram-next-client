import React from "react";

export default function PostPreview({ post }) {
  return (
    <>
      <p>{post.content.substring(0, 280)}</p>
    </>
  );
}
