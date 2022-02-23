import React from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import TopicPreview from "../../components/topicPreview";

export default function SingleCategory({ category }) {
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

export async function getStaticPaths() {
  const res = await fetch("http://localhost:5000/categories");
  const categories = await res.json();

  const paths = categories.map((category) => ({
    params: { slug: category.slug }
  }));

  return {
    paths,
    fallback: true
  };
}

export async function getStaticProps({ params }) {
  // TODO get id to fetch single category, params just has slug
  const res = await fetch(`http://localhost:5000/categories/${params.id}`);
  const category = await res.json();

  return { props: { category } };
}
