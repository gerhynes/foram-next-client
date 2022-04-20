import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Avatar from "./avatar";
import LogoutButton from "./logoutButton";
import { UserContext } from "../contexts/UserContext";

export default function Header() {
  const { user, setUser } = useContext(UserContext);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="bg-indigo-900 grid grid-cols-1 sm:grid-cols-3 justify-between items-center px-4">
      <div></div>
      <div>
        <Link href="/">
          <a className="block text-lg text-white text-center">Fóram</a>
        </Link>
      </div>
      {/* Only render user-dependent content in browser */}
      {isMounted && (
        <>
          {Object.keys(user).length === 0 ? (
            <div className="flex gap-2 items-center justify-between sm:justify-end p-2">
              <Link href="/register">
                <a className="inline-flex items-center px-2 text-white bg-indigo-600 border-2 border-indigo-200 hover:bg-indigo-200  hover:text-indigo-900 transition">
                  Sign up
                </a>
              </Link>
              <Link href="/login">
                <a className="inline-flex items-center px-2 text-white bg-indigo-600 border-2 border-indigo-200 hover:bg-indigo-200  hover:text-indigo-900 transition">
                  Log in
                </a>
              </Link>
            </div>
          ) : (
            <div className="flex gap-4 items-center justify-between sm:justify-end">
              <LogoutButton />
              <div>
                <Link href={`/users/${user.username}`}>
                  <a>
                    <Avatar username={user.username} />
                  </a>
                </Link>
              </div>
            </div>
          )}
        </>
      )}
    </header>
  );
}
