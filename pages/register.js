import React, { useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/layout";
import { UserContext } from "../contexts/UserContext";

export default function Register() {
  // Router for redirecting on completion
  const router = useRouter();

  // Access user context
  const { user, setUser } = useContext(UserContext);

  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // Set default role to user
  const role = "user";

  // Checks database for ex
  const checkUsernameExists = async (username) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${username}`
      );
      return response.status !== 404;
    } catch (error) {
      console.error(error);
    }
  };

  const registerUser = async (newUser) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = uuidv4();
    const datetime = new Date().toISOString();

    const newUser = {
      id: userId,
      name: name.replaceAll(" ", ""),
      email: email,
      username: username,
      password: password,
      role,
      created_at: datetime,
      updated_at: datetime
    };

    const usernameExists = await checkUsernameExists(username);

    if (usernameExists) {
      toast.error("Username already taken. Please use a different one");
    } else {
      try {
        const registeredUser = await registerUser(newUser);
        setUser(registeredUser);
        router.push(`/users/${registeredUser.username}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Fóram | Create an Account</title>
        <meta name="description" content="Fóram | A platform for discussion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container mx-auto">
          <div className="mt-10 bg-indigo-100 rounded-md py-8 px-4 mx-auto max-w-lg">
            <form className="text-center" onSubmit={handleSubmit}>
              <h1 className="text-3xl font-bold mb-2 text-indigo-900">
                Welcome 👋
              </h1>
              <h2 className="text-xl mb-4 font-semibold text-indigo-900">
                Let's create your account
              </h2>
              <div className="mb-4">
                <input
                  className="p-2 rounded"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value.trim())}
                  value={email}
                  required
                />
                <p className="text-slate-600">Never shown to the public</p>
              </div>
              <div className="mb-4">
                <input
                  className="p-2 rounded"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value.trim())}
                  minLength="2"
                  value={username}
                  required
                />
                <p className="text-slate-600">Unique, no spaces, short</p>
              </div>
              <div className="mb-4">
                <input
                  className="p-2 rounded"
                  type="text"
                  name="email"
                  id="name"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value.trim())}
                  value={name}
                  required
                />
                <p className="text-slate-600">Your full name (optional)</p>
              </div>
              <div className="mb-8">
                <input
                  className="p-2 rounded"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value.trim())}
                  minLength="10"
                  value={password}
                  required
                />
                <p className="text-slate-600">At least 10 characters</p>
              </div>

              <div className="flex flex-wrap gap-2 justify-around">
                <Link href="/login">
                  <a className="bg-transparent border-2 border-indigo-900 py-2 px-4 text-indigo-900 hover:bg-indigo-900 hover:text-white transition">
                    Log In
                  </a>
                </Link>
                <button className="bg-indigo-900 text-white p-2 border-2 border-transparent hover:text-indigo-900 hover:bg-transparent hover:border-indigo-900 transition">
                  Create New Account
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
