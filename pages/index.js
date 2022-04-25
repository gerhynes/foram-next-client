import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout/Layout";
import Category from "../components/Category/Category";
import Topic from "../components/Topic/Topic";
import TopicForm from "../components/TopicForm/TopicForm";
import Banner from "../components/Banner/Banner";
import { UserContext } from "../contexts/UserContext";

export default function Home({ categories, topics }) {
  const [isTopicFormOpen, setIsTopicFormOpen] = useState(false);
  const openTopicForm = () => setIsTopicFormOpen(true);
  const closeTopicForm = () => setIsTopicFormOpen(false);

  const { user, setUser } = useContext(UserContext);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    console.log(user);
  }, []);

  return (
    <>
      <Head>
        <title>Fóram | A Platform for Discussion</title>
        <meta name="description" content="Fóram | A platform for discussion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative">
        <Layout>
          <div className="max-w-5xl mx-auto">
            <div className="mb-4">
              {isMounted &&
                (user ? (
                  <div className="flex justify-between">
                    <div>
                      {user.role === "admin" && (
                        <Link href="/admin">
                          <a className="inline-flex items-center px-2 py-2 text-indigo-900 border-4 border-indigo-900 hover:bg-indigo-900  hover:text-white transition">
                            Admin Dashboard
                          </a>
                        </Link>
                      )}
                    </div>
                    <div>
                      <button
                        className="inline-flex items-center px-2 py-2 text-indigo-900 border-4 border-indigo-900 hover:bg-indigo-900  hover:text-white transition"
                        onClick={openTopicForm}
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
                  </div>
                ) : (
                  <Banner
                    title="Welcome to Fóram"
                    text="Ask questions, join in conversations and help your community out"
                  />
                ))}
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
                    const latestTopic = categoryTopics.sort(
                      (a, b) => -a.updated_at.localeCompare(b.updated_at)
                    )[0]; // sort by most recently updated
                    return (
                      <Category
                        key={category.id}
                        category={category}
                        topicsCount={categoryTopics.length}
                        latestTopic={latestTopic}
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
                    <Topic key={topic.id} topic={topic} />
                  ))}
                <div className="py-4 flex justify-end">
                  <Link href={`/latest`}>
                    <a className="inline-flex items-center px-2 py-2 text-indigo-900 border-4 border-indigo-900 hover:bg-indigo-900  hover:text-white transition">
                      <span className="">More Topics</span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Layout>
        <TopicForm
          categories={categories}
          isTopicFormOpen={isTopicFormOpen}
          closeTopicForm={closeTopicForm}
        />
      </div>
    </>
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
