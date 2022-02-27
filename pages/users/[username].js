import React from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import PostPreview from "../../components/postPreview";

export default function SingleUser({ user, posts }) {
  console.log(user);
  console.log(posts);
  return (
    <>
      <Head>
        <title>Fóram</title>
        <meta name="description" content="Fóram | A platform for discussion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div>{user.username}</div>
        <div>
          {posts.map((post) => (
            <PostPreview key={post.id} post={post} />
          ))}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const userRes = await fetch(
    `http://localhost:8080/api/users/${params.username}`
  );
  const user = await userRes.json();

  const postsRes = await fetch(
    `http://localhost:8080/api/users/${params.username}/posts`
  );
  const posts = await postsRes.json();

  return { props: { user, posts } };
}
