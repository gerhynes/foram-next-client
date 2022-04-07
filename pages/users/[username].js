import React from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import TopicPreview from "../../components/topicPreview";
import Topic from "../../components/topic";
import PostPreview from "../../components/postPreview";
import Avatar from "../../components/avatar";

export default function SingleUser({ user, topics, posts }) {
  return (
    <>
      <Head>
        <title>Fóram</title>
        <meta name="description" content="Fóram | A platform for discussion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-5xl mt-10 mx-auto">
          <section className="flex mb-4" id="userDetails">
            <div className="w-16 grid place-content-center">
              <Avatar username={user.username} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{user.username}</h1>
              <h2 className="text-lg font-semibold">{user.name}</h2>
            </div>
          </section>
          <section className="py-2 mb-4" id="userTopics">
            <h3 className="text-lg font-semibold">Topics by {user.username}</h3>
            {topics
              .sort((a, b) => -a.created_at.localeCompare(b.created_at)) // sort by most recently created
              .map((topic) => (
                <Topic key={topic.id} topic={topic} />
              ))}
          </section>
          <section className="py-2" id="userPosts">
            <h3 className="text-lg font-semibold">Posts by {user.username}</h3>
            {posts
              .sort((a, b) => -a.created_at.localeCompare(b.created_at)) // sort by most recently created
              .map((post) => (
                <PostPreview key={post.id} post={post} />
              ))}
          </section>
        </div>
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
