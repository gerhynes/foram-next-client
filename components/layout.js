import React from "react";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <Header username="qu" />
        <main className="px-4 py-4">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
