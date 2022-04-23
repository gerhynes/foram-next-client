import { useEffect, useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import Category from "../components/Category/Category";
import CategoryForm from "../components/CategoryForm/CategoryForm";

import { UserContext } from "../contexts/UserContext";

function AdminPage({ categories, topics }) {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const openCategoryForm = () => setIsCategoryFormOpen(true);
  const closeCategoryForm = () => setIsCategoryFormOpen(false);

  useEffect(() => {
    if (user.role !== "admin") {
      router.push("/");
    }
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
          <h1>Admin Page</h1>
          <div className="flex justify-end">
            <button
              className="inline-flex items-center px-2 py-2 text-indigo-900 border-4 border-indigo-900 hover:bg-indigo-900  hover:text-white transition"
              onClick={openCategoryForm}
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
              <span className="ml-2">New Category</span>
            </button>
          </div>
          <div></div>
        </Layout>
        <CategoryForm
          isCategoryFormOpen={isCategoryFormOpen}
          closeCategoryForm={closeCategoryForm}
        />
      </div>
    </>
  );
}
export default AdminPage;

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
