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
          <section className="flex" id="userDetails">
            <div className="w-16 grid place-content-center">
              <Avatar username={user.username} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{user.username}</h1>
              <h2 className="text-lg font-semibold">{user.name}</h2>
            </div>
          </section>
          <section className="py-2" id="userTopics">
            <h3 className="text-lg font-semibold">Topics</h3>
            {topics.map((topic) => (
              <Topic key={topic.id} topic={topic} />
            ))}
          </section>
          <section className="py-2" id="userPosts">
            <h3 className="text-lg font-semibold">Posts</h3>
            {posts.map((post) => (
              <PostPreview key={post.id} post={post} />
            ))}
          </section>
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

  const topicsRes = await fetch(
    `http://localhost:8080/api/users/${params.username}/topics`
  );
  const topics = await topicsRes.json();

  const postsRes = await fetch(
    `http://localhost:8080/api/users/${params.username}/posts`
  );
  const posts = await postsRes.json();

  return { props: { user, topics, posts } };
}
