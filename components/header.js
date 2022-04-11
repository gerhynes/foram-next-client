import React from "react";
import Link from "next/link";
import Avatar from "./avatar";
import LogoutButton from "./logoutButton";

export default function Header({ user }) {
  return (
    <header className="bg-indigo-900 flex justify-between items-center px-4">
      <div></div>
      <Link href="/">
        <a className="block text-lg text-white text-center">Fóram</a>
      </Link>
      {Object.keys(user).length === 0 ? (
        <div className="flex gap-2 items-center p-2">
          <Link href="/register">
            <a className="inline-flex items-center px-2 text-white bg-indigo-500 border-2 border-indigo-200 hover:bg-indigo-200  hover:text-indigo-900 transition">
              Sign up
            </a>
          </Link>
          <Link href="/login">
            <a className="inline-flex items-center px-2 text-white bg-indigo-500 border-2 border-indigo-200 hover:bg-indigo-200  hover:text-indigo-900 transition">
              Log in
            </a>
          </Link>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <LogoutButton />
          <Link href={`/users/${user.username}`}>
            <a>
              <Avatar username={user.username} />
            </a>
          </Link>
        </div>
      )}
    </header>
  );
}
