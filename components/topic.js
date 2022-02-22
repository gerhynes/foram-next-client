import React from "react";

export default function Topic({ title, posts }) {
  return (
    <div className="flex pl-2 py-2 border-b-2 border-b-indigo-600">
      <div className="basis-1/5 grid place-content-center">
        <div className="bg-gray-300 w-8 h-8"></div>
      </div>
      <h2 className="basis-3/5 text-xl font-semibold">{title}</h2>
      <div className=" basis-1/5 text-right">
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
