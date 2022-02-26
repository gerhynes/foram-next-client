import React from "react";
import Link from "next/link";

export default function Category({ category, topics }) {
  const { id, name, slug, description } = category;
  return (
    <div className="flex py-2 pl-2 border-b-2 border-b-slate-200 border-l-4 border-l-indigo-600">
      <div className="flex-1">
        <h2 className="text-xl font-semibold">
          <Link href={`/categories/${slug}/${id}`}>
            <a>{name}</a>
          </Link>
        </h2>
        <p className="text-slate-600">{description}</p>
      </div>
      <div className="w-24 text-right">
        <span className="text-lg font-semibold  text-right">{topics}</span>/
        <span className="text-right">week</span>
      </div>
    </div>
  );
}