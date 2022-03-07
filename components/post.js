import React from "react";
import Avatar from "../components/avatar";

export default function Post({ post, username }) {
  return (
    <div className="flex mb-4 border-t-2 border-t-slate-200">
      <div className="w-16" id="avatar">
        <Avatar />
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
          <button className="py-2 px-4 font-semibold text-indigo-900 bg-indigo-100 hover:bg-indigo-900 hover:text-white transition">
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}
