import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import Layout from "../../../components/Layout/Layout";
import TopicPreview from "../../../components/TopicPreview/TopicPreview";
import CategoryEditForm from "../../../components/CategoryEditForm/CategoryEditForm";
import { UserContext } from "../../../contexts/UserContext";

export default function SingleCategory({ category, topics }) {
  const { user, setUser } = useContext(UserContext);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [categoryName, setCategoryName] = useState(category.name);

  const [isCategoryEditFormOpen, setIsCategoryEditFormOpen] = useState(false);
  const openCategoryEditForm = () => setIsCategoryEditFormOpen(true);
  const closeCategoryEditForm = () => setIsCategoryEditFormOpen(false);

  return (
    <>
      <Head>
        <title>Fóram</title>
        <meta name="description" content="Fóram | A platform for discussion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-5xl mx-auto mt-8">
          {isMounted && user.role === "admin" && (
            <div className="flex justify-end">
              <button
                className="inline-flex items-center px-2 py-2 text-indigo-900 border-4 border-indigo-900 hover:bg-indigo-900  hover:text-white transition"
                onClick={openCategoryEditForm}
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
                <span className="ml-2">Edit Category</span>
              </button>
            </div>
          )}
          <div>
            <h1 className="text-3xl font-semibold">{category.name}</h1>
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
      <CategoryEditForm
        category={category}
        setCategoryName={setCategoryName}
        isCategoryEditFormOpen={isCategoryEditFormOpen}
        closeCategoryEditForm={closeCategoryEditForm}
      />
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
