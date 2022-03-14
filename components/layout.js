import React, { useEffect, useContext } from "react";
import Header from "./header";
import Footer from "./footer";
import { UserContext } from "../contexts/UserContext";

export default function Layout({ children }) {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    setUser({
      name: "Quincy Lars",
      username: "quince",
      id: "33de6e57-c57c-4451-82b9-b73ae248c672"
    });
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <Header username={user.username} />
        <main className="px-4 py-4">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
