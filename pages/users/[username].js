import React from "react";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";

import UserProfile from "../../components/UserProfile/UserProfile";

export default function SingleUser({ user, topics, posts }) {
  return (
    <>
      <Head>
        <title>Fóram</title>
        <meta name="description" content="Fóram | A platform for discussion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <UserProfile user={user} topics={topics} posts={posts} />
      </Layout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const [userRes, topicsRes, postsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${params.username}`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${params.username}/topics`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${params.username}/posts`)
  ]);
  const [user, topics, posts] = await Promise.all([
    userRes.json(),
    topicsRes.json(),
    postsRes.json()
  ]);
  return { props: { user, topics, posts } };
}
