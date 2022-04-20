import React from "react";
import Head from "next/head";
import Layout from "../../../components/Layout/Layout";
import TopicPreview from "../../../components/TopicPreview/TopicPreview";

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
              <span className="w-14">Replies</span>
              <span className="w-14">Activity</span>
            </div>
          </div>
          <div>
            {topics
              .sort((a, b) => -a.created_at.localeCompare(b.created_at)) // sort by most recently created
              .map((topic) => (
                <TopicPreview key={topic.id} topic={topic} />
              ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const [categoryRes, topicsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${params.id}`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${params.id}/topics`)
  ]);
  const [category, topics] = await Promise.all([
    categoryRes.json(),
    topicsRes.json()
  ]);
  return { props: { category, topics } };
}
