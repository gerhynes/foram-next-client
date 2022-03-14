import { useState } from "react";
import Head from "next/head";
import Layout from "../components/layout";
import Category from "../components/category";
import Topic from "../components/topic";
import TopicForm from "../components/topicForm";

export default function Home({ categories, topics }) {
  let [isOpen, setIsOpen] = useState(false);
  const openForm = () => setIsOpen(true);
  const closeForm = () => setIsOpen(false);

  return (
    <div className="relative">
      <Head>
        <title>Fóram</title>
        <meta name="description" content="Fóram | A platform for discussion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-end">
            <button
              className="inline-flex items-center px-2 py-2 text-indigo-900 border-4 border-indigo-900 hover:bg-indigo-900  hover:text-white transition"
              onClick={openForm}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="ml-2">New Topic</span>
            </button>
          </div>
          <div className="sm:flex sm:gap-8">
            <div className="mb-8 sm:flex-1" id="categories">
              <div className="flex justify-between py-2 border-b-4 border-b-slate-300">
                <span className="text-slate-600">Subforum</span>
                <span className="text-slate-600">Topics</span>
              </div>
              {categories
                .sort((a, b) => a.created_at.localeCompare(b.created_at)) // sort by first created
                .map((category) => {
                  const categoryTopics = topics.filter(
                    (topic) => topic.category_id === category.id
                  );
                  return (
                    <Category
                      key={category.id}
                      category={category}
                      topicsCount={categoryTopics.length}
                    />
                  );
                })}
            </div>
            <div className="sm:flex-1" id="latestTopics">
              <div className="flex justify-between py-2 border-b-4 border-b-slate-300">
                <span className="text-slate-600">Latest</span>
              </div>
              {topics
                .sort((a, b) => -a.created_at.localeCompare(b.created_at)) // sort by most recently created
                .map((topic) => (
                  <Topic key={topic.id} topic={topic} posts="12" />
                ))}
            </div>
          </div>
        </div>
      </Layout>
      <TopicForm
        categories={categories}
        isOpen={isOpen}
        closeForm={closeForm}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const [categoriesRes, topicsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics`)
  ]);
  const [categories, topics] = await Promise.all([
    categoriesRes.json(),
    topicsRes.json()
  ]);
  return { props: { categories, topics } };
}
