import React, { useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Layout from "../components/layout";
import { UserContext } from "../contexts/UserContext";

export default function Register() {
  // Router for redirecting on completion
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = uuidv4();
    const datetime = new Date().toISOString();

    const newUser = {
      id: userId,
      name,
      email,
      username,
      created_at: datetime,
      updated_at: datetime
    };

    console.log(newUser);

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/users`, newUser)
      .then((res) => {
        console.log(res);
        setUser(newUser);
        router.push(`/users/${newUser.username}`);
      })
      .catch((error) => console.error(error));
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
                  onChange={(e) => setUsername(e.target.value)}
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
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
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
                  minLength="12"
                  value={password}
                  required
                />
                <p className="text-slate-600">At least 12 characters</p>
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
