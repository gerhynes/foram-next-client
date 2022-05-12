import { useState, useEffect, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../../components/Layout/Layout";
import Post from "../../../components/Post/Post";
import PostForm from "../../../components/PostForm/PostForm";
import PostEditForm from "../../../components/PostEditForm/PostEditForm";
import TopicEditForm from "../../../components/TopicEditForm/TopicEditForm";
import CategoryTag from "../../../components/CategoryTag/CategoryTag";
import Banner from "../../../components/Banner/Banner";
import { UserContext } from "../../../contexts/UserContext";

export default function SingleTopic({ topic, posts }) {
  const router = useRouter();

  const { id, slug, username } = topic;

  const { user, setUser } = useContext(UserContext);

  const [title, setTitle] = useState(topic.title);
  const [categoryName, setCategoryName] = useState(topic.category_name);
  const [categoryId, setCategoryId] = useState(topic.category_id);
  const [categories, setCategories] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [isPostEditFormOpen, setIsPostEditFormOpen] = useState(false);
  const [isTopicEditFormOpen, setIsTopicEditFormOpen] = useState(false);
  const [currentPosts, setCurrentPosts] = useState(posts);
  const [postToEdit, setPostToEdit] = useState({});

  const openPostForm = () => setIsPostFormOpen(true);
  const closePostForm = () => setIsPostFormOpen(false);
  const openPostEditForm = () => setIsPostEditFormOpen(true);
  const closePostEditForm = () => setIsPostEditFormOpen(false);
  const openTopicEditForm = () => setIsTopicEditFormOpen(true);
  const closeTopicEditForm = () => setIsTopicEditFormOpen(false);

  // Get all categories on pageload - for use if editing topic
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((response) => {
        setCategories(response.data);
        setIsMounted(true);
      })
      .catch((error) => console.error(error));
  }, []);

  const deleteTopic = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };

    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/topics/${topic.id}`, config)
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
    <div>
      <Head>
        <title>Fóram</title>
        <meta name="description" content="Fóram | A platform for discussion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-3xl mt-8 mx-auto">
          <div className="py-2">
            <div className="flex gap-4">
              <div className="flex gap-4 items-center">
                <h1 className="text-3xl font-semibold mb-4">{title}</h1>
                {isMounted &&
                  (topic.user_id === user.id || user.role === "admin" ? (
                    <button
                      className="bg-indigo-100 p-2 hover:bg-indigo-900 hover:text-white transition self-start"
                      aria-label="Edit topic title and category"
                      title="Edit topic title and category"
                      onClick={openTopicEditForm}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  ) : (
                    ""
                  ))}
              </div>
              <div>
                {isMounted && user.role === "admin" && (
                  <button
                    className="inline-flex items-center px-2 py-2 text-red-600 border-4 border-red-600 hover:bg-red-600  hover:text-white transition"
                    aria-label="Delete topic"
                    title="Delete topic"
                    onClick={deleteTopic}
                  >
                    <span>Delete</span>
                  </button>
                )}
              </div>
            </div>
            <div className="mb-2">
              <CategoryTag
                category_id={categoryId}
                category_name={categoryName}
              />
            </div>
          </div>
          <div>
            {currentPosts
              .sort((a, b) => a.created_at.localeCompare(b.created_at)) // sort by first created
              .map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  openPostForm={openPostForm}
                  openPostEditForm={openPostEditForm}
                  currentPosts={currentPosts}
                  setCurrentPosts={setCurrentPosts}
                  setPostToEdit={setPostToEdit}
                />
              ))}
          </div>
          {!user && <Banner text="Sign in to join this conversation" />}
        </div>
      </Layout>
      {isMounted && (
        <>
          <TopicEditForm
            topic={topic}
            categories={categories}
            setTitle={setTitle}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
            setCategoryId={setCategoryId}
            isTopicEditFormOpen={isTopicEditFormOpen}
            closeTopicEditForm={closeTopicEditForm}
          />
          <PostForm
            topic={topic}
            posts={currentPosts}
            isPostFormOpen={isPostFormOpen}
            closePostForm={closePostForm}
            setCurrentPosts={setCurrentPosts}
          />
          <PostEditForm
            topic={topic}
            posts={posts}
            postToEdit={postToEdit}
            isPostEditFormOpen={isPostEditFormOpen}
            closePostEditForm={closePostEditForm}
            setCurrentPosts={setCurrentPosts}
          />
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const [topicRes, postsRes] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${params.id}`),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${params.id}/posts`)
  ]);
  const [topic, posts] = await Promise.all([topicRes.json(), postsRes.json()]);
  return { props: { topic, posts } };
}
