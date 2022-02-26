import Head from "next/head";
import Layout from "../components/layout";
import Category from "../components/category";
import Topic from "../components/topic";

export default function Home({ categories, topics }) {
  return (
    <>
      <Head>
        <title>Fóram</title>
        <meta name="description" content="Fóram | A platform for discussion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-5xl mt-10 mx-auto sm:flex sm:gap-8">
          <div className="mb-8 sm:flex-1" id="categories">
            <div className="flex justify-between py-2 border-b-4 border-b-slate-300">
              <span className="text-slate-600">Subforum</span>
              <span className="text-slate-600">Topics</span>
            </div>
            {categories
              .sort((a, b) => a.id - b.id)
              .map((category) => (
                <Category key={category.id} category={category} topics="3" />
              ))}
          </div>
          <div className="sm:flex-1" id="latestTopics">
            <div className="flex justify-between py-2 border-b-4 border-b-slate-300">
              <span className="text-slate-600">Latest</span>
            </div>
            {topics
              .sort((a, b) => a.id - b.id)
              .map((topic) => (
                <Topic key={topic.id} topic={topic} posts="12" />
              ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const categoryRes = await fetch(`http://localhost:8080/api/categories/`);
  const categories = await categoryRes.json();

  const topicRes = await fetch(`http://localhost:8080/api/topics/`);
  const topics = await topicRes.json();

  return { props: { categories, topics } };
}
