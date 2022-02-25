import React from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import TopicPreview from "../../components/topicPreview";

export default function SingleCategory({ category, topics }) {
  console.log(category);
  console.log(topics);
  return (
    <>
      <Head>
        <title>Fóram</title>
        <meta name="description" content="Fóram | A platform for discussion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container mx-auto mt-8">
          <div>{category.title}</div>
          <div className="flex justify-between py-2 border-b-4 border-b-slate-400">
            <span>Topic</span>
            <div className="flex justify-between gap-4">
              <span>Replies</span>
              <span>Activity</span>
            </div>
          </div>
          <div>
            <TopicPreview title="I'm stuck. Please help me." />
            <TopicPreview title="How does routing work?" />
            <TopicPreview title="Don't make me read the docs" />
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
