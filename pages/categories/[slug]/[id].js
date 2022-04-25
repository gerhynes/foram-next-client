import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../../components/Layout/Layout";
import TopicPreview from "../../../components/TopicPreview/TopicPreview";
import CategoryEditForm from "../../../components/CategoryEditForm/CategoryEditForm";
import { UserContext } from "../../../contexts/UserContext";

export default function SingleCategory({ category, topics }) {
  const router = useRouter();

  const { user, setUser } = useContext(UserContext);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [categoryName, setCategoryName] = useState(category.name);

  const [isCategoryEditFormOpen, setIsCategoryEditFormOpen] = useState(false);
  const openCategoryEditForm = () => setIsCategoryEditFormOpen(true);
  const closeCategoryEditForm = () => setIsCategoryEditFormOpen(false);

  const deleteCategory = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };

    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${category.id}`,
        config
      )
      .then((response) => {
        if (response.status !== 200) {
          console.log(response.message);
          toast(
            `An error occurred (${response.message}). Please try again shortly`
          );
          return;
        }
        router.push("/admin");
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred. Please try again shortly");
      });
  };

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
            <div className="flex gap-4 justify-end">
              <button
                className="inline-flex items-center px-2 py-2 text-red-600 border-4 border-red-600 hover:bg-red-600  hover:text-white transition"
                onClick={deleteCategory}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2">Delete Category</span>
              </button>
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
            <h1 className="text-3xl font-semibold">{categoryName}</h1>
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
      <ToastContainer />
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
