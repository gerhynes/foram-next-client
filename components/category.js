import React from "react";

export default function Category({ name, description, topics }) {
  return (
    <div className="mb-4 flex py-2 pl-2 border-t-2 border-t-indigo-900 border-l-4 border-l-indigo-600">
      <div className="basis-3/4">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-slate-600">{description}</p>
      </div>
      <div className="basis-1/4 text-right">
        <span className="text-lg font-semibold  text-right">{topics}</span>/
        <span className="text-right">week</span>
      </div>
    </div>
  );
}
