import React from "react";
import Head from "next/head";
import Layout from "../../components/layout";

export default function SingleTopic({ topic, posts }) {
  const { title } = topic;
  console.log(topic);
  console.log(posts);
  return (
    <div>
      <Head>
        <title>Fóram</title>
        <meta name="description" content="Fóram | A platform for discussion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container mx-auto mt-8">
          <div>
            <h1 className="text-2xl font-semibold mb-2">{topic.title}</h1>
            <div>
              <span className="px-2 bg-indigo-200">Category</span>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:8080/api/topics");
  const topics = await res.json();

  const paths = topics.map((topic) => ({
    params: { id: topic.id.toString() }
  }));

  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  const topicRes = await fetch(`http://localhost:8080/api/topics/${params.id}`);
  const topic = await topicRes.json();

  const postsRes = await fetch(
    `http://localhost:8080/api/topics/${params.id}/posts`
  );
  const posts = await postsRes.json();

  return { props: { topic, posts } };
}
