import React from "react";

export default function Post({ post }) {
  return (
    <div className="flex mb-4 border-t-2 border-t-slate-200">
      <div className="w-16" id="avatar">
        <div className="bg-gray-300 w-10 h-10"></div>
      </div>
      <div className="flex-1 flex flex-col" id="postContent">
        <div className="flex justify-between py-2">
          <span className="font-semibold">Username</span>
          <span className="font-semibold text-slate-400">2h</span>
        </div>
        <div className="prose">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dolore
          animi voluptate non sit, aut dolorum fugiat dignissimos veniam ipsum
          impedit ullam aliquid iusto nihil omnis ab corporis temporibus culpa
          voluptatum molestias, enim quo itaque sequi. Cupiditate expedita hic
          dolorem, reiciendis quod fugiat sapiente deleniti non, minima facere
          beatae dicta.
        </div>
        <div className="py-4 text-right">
          <button className="py-2 px-4 bg-indigo-200 hover:bg-indigo-300 transition">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}