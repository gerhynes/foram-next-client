import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Layout from "../components/layout";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = uuidv4();

    const user = {
      id: userId,
      name,
      email,
      username,
      password
    };

    console.log(user);

    // axios
    //   .post(`${process.env.NEXT_PUBLIC_API_URL}/users`, user)
    //   .then((res) => console.log(res))
    //   .catch((error) => console.error(error));

    // res.redirect(`/users/${user.username}`);
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
          <div className="mt-10 bg-indigo-100 rounded-md p-4 mx-auto max-w-lg">
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
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
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
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
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
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <p className="text-slate-600">Your full name (optional)</p>
              </div>
              <div className="mb-4">
                <input
                  className="p-2 rounded"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
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
      </Layout>
    </>
  );
}
