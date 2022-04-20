import { useState, useContext } from "react";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import Topic from "../../components/Topic/Topic";
import TopicPreview from "../../components/TopicPreview/TopicPreview";
import TopicForm from "../../components/TopicForm/TopicForm";
import { UserContext } from "../../contexts/UserContext";

export default function AllTopics({ categories, topics }) {
  let [isOpen, setIsOpen] = useState(false);
  const openForm = () => setIsOpen(true);
  const closeForm = () => setIsOpen(false);
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="relative">
      <Head>
        <title>Fóram | Latest Topics</title>
        <meta name="description" content="Fóram | A platform for discussion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-5xl mx-auto">
          <section className="flex justify-end">
            {Object.keys(user).length === 0 ? (
              ""
            ) : (
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
            )}
          </section>
          <section className="sm:flex-1" id="latestTopics">
            <div className="flex justify-between py-2 border-b-4 border-b-slate-300">
              <span className="text-slate-600">Latest Topics</span>
            </div>
            {topics
              .sort((a, b) => -a.created_at.localeCompare(b.created_at)) // sort by most recently created
              .map((topic) => (
                <TopicPreview key={topic.id} topic={topic} />
              ))}
          </section>
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
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/latest`)
  ]);
  const [categories, topics] = await Promise.all([
    categoriesRes.json(),
    topicsRes.json()
  ]);
  return { props: { categories, topics } };
}
