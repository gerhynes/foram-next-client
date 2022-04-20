import React, { useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/layout";
import { UserContext } from "../contexts/UserContext";

export default function Login() {
  // Router for redirecting on completion
  const router = useRouter();

  // Access logged-in user, if any
  const { user, setUser } = useContext(UserContext);

  // Form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (userCredentials) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userCredentials)
      });

      // If unauthorized, give feedback and return
      if (response.status === 401) {
        toast.error("Invalid username or password");
        return;
      }

      const result = await response.json();

      if (result.message) {
        toast.error("An error occurred. Please try again shortly");
      } else {
        setUser(result);
        router.push(`/users/${result.username}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again shortly");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userCredentials = {
      username,
      password
    };

    await loginUser(userCredentials);
  };

  return (
    <>
      <Head>
        <title>Fóram</title>
        <meta name="description" content="Fóram | A platform for discussion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container mx-auto">
          <div className="mt-10 bg-indigo-100 rounded-md py-8 px-4 mx-auto max-w-lg">
            <form className="text-center" onSubmit={handleSubmit}>
              <h1 className="text-3xl font-bold mb-2 text-indigo-900">
                Welcome Back 👋
              </h1>
              <h2 className="text-xl mb-4 font-semibold text-indigo-900">
                Log into your account
              </h2>
              <div className="mb-4">
                <input
                  className="p-2 rounded"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  onChange={(e) =>
                    setUsername(e.target.value.replaceAll(" ", ""))
                  }
                  value={username}
                  required
                />
              </div>
              <div className="mb-8">
                <input
                  className="p-2 rounded"
                  type="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value.trim())}
                  value={password}
                  required
                />
              </div>

              <div className="flex flex-wrap gap-2 justify-around">
                <Link href="/register">
                  <a className="bg-transparent border-2 border-indigo-900 py-2 px-4 text-indigo-900 hover:bg-indigo-900 hover:text-white transition">
                    Create New Account
                  </a>
                </Link>
                <button className="inline-flex items-center bg-indigo-900 text-white p-2 border-2 border-transparent hover:text-indigo-900 hover:bg-transparent hover:border-indigo-900 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                  </svg>
                  <span className="ml-2">Log In</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </Layout>
    </>
  );
}
