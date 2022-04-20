import React from "react";

export default function Footer() {
  return (
    <footer className="bg-indigo-900 text-white px-4 py-2 flex justify-center">
      Fóram &copy; {new Date().getFullYear()}
    </footer>
  );
}
