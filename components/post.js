import React from "react";

export default function Post() {
  return (
    <div className="flex">
      <div className="w-24 grid place-content-center" id="avatar">
        <div className="bg-gray-300 w-8 h-8"></div>
      </div>
      <div className="flex flex-col" id="postContent">
        <div>
          <span>Username</span>
          <span>2h</span>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit dolore
          animi voluptate non sit, aut dolorum fugiat dignissimos veniam ipsum
          impedit ullam aliquid iusto nihil omnis ab corporis temporibus culpa
          voluptatum molestias, enim quo itaque sequi. Cupiditate expedita hic
          dolorem, reiciendis quod fugiat sapiente deleniti non, minima facere
          beatae dicta.
        </div>
        <div>
          <span className="bg-indigo-200 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="#fff"
            >
              <path
                fillRule="evenodd"
                d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Reply
          </span>
        </div>
      </div>
    </div>
  );
}
