import React from "react";

export default function TopicPreview({ title }) {
  return (
    <div className="px-2 py-4">
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
}
