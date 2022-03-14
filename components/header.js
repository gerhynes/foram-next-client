import React from "react";
import Link from "next/link";
import Avatar from "./avatar";

export default function Header({ username = "" }) {
  return (
    <header className="bg-indigo-900 flex justify-between items-center px-4">
      <div></div>
      <Link href="/">
        <a className="block text-lg text-white text-center">Fóram</a>
      </Link>
      <Avatar username={username} />
    </header>
  );
}
