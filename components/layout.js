import React, { useEffect, useContext, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { UserContext } from "../contexts/UserContext";

export default function Layout({ children }) {
  const { user, setUser } = useContext(UserContext);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        {/* Only render user-dependent content in browser */}
        {isMounted && <Header user={user} />}
        <main className="px-4 py-4">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
