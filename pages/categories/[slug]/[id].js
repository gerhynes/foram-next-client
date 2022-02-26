import React from "react";
import Head from "next/head";
import Layout from "../../../components/layout";
import TopicPreview from "../../../components/topicPreview";

export default function SingleCategory({ category, topics }) {
  return (
    <>
      <Head>
        <title>Fóram</title>
        <meta name="description" content="Fóram | A platform for discussion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container mx-auto mt-8">
          <div>
            <h1 className="text-2xl font-semibold">{category.name}</h1>
          </div>
          <div className="flex justify-between py-2 border-b-4 border-b-slate-400">
            <span>Topic</span>
            <div className="flex justify-between gap-4">
              <span>Replies</span>
              <span>Activity</span>
            </div>
          </div>
          <div>
            {topics.map((topic) => (
              <TopicPreview key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const categoryRes = await fetch(
    `http://localhost:8080/api/categories/${params.id}`
  );
  const category = await categoryRes.json();

  const topicsRes = await fetch(
    `http://localhost:8080/api/categories/${params.id}/topics`
  );
  const topics = await topicsRes.json();

  return { props: { category, topics } };
}
