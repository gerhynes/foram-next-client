import React from "react";
import Link from "next/link";

export default function Topic({ id, title, category, posts }) {
  return (
    <div className="flex pl-2 py-2 border-b-2 border-b-slate-200">
      <div className="w-24 grid place-content-center">
        <div className="bg-gray-300 w-8 h-8"></div>
      </div>
      <div className="flex-1">
        <div className="mb-2">
          <h2 className="text-xl font-semibold">
            <Link href={`/topics/${id}`}>
              <a>{title}</a>
            </Link>
          </h2>
        </div>
        <div className="">
          <span className="px-2 bg-indigo-200">{category}</span>
        </div>
      </div>
      <div className="w-24 text-right">
        <div>
          <span className="text-xl font-semibold">{posts}</span>
        </div>
        <div>
          <span>18m</span>
        </div>
      </div>
    </div>
  );
}
