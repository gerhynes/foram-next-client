import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../../components/layout";
import Post from "../../../components/post";
import PostForm from "../../../components/postForm";
import PostEditForm from "../../../components/postEditForm";

export default function SingleTopic({ topic, posts }) {
  const { id, title, slug, category_name, category_id, username } = topic;
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentPosts, setCurrentPosts] = useState(posts);
  const openPostForm = () => setIsPostFormOpen(true);
  const openEditForm = () => setIsEditFormOpen(true);
  const closePostForm = () => setIsPostFormOpen(false);
  const closeEditForm = () => setIsEditFormOpen(false);
  const [postToEdit, setPostToEdit] = useState({});

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
            <Link href={`/topics/${slug}/${id}`}>
              <a>
                <h1 className="text-3xl font-semibold mb-4">{title}</h1>
              </a>
            </Link>
            <div className="mb-2">
              <Link
                href={`/categories/${category_name.toLowerCase()}/${category_id}`}
              >
                <a>
                  <span className="px-2 bg-indigo-200">{category_name}</span>
                </a>
              </Link>
            </div>
          </div>
          <div>
            {currentPosts
              .sort((a, b) => a.created_at.localeCompare(b.created_at)) // sort by first created
              .map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  username={username}
                  openPostForm={openPostForm}
                  openEditForm={openEditForm}
                  currentPosts={currentPosts}
                  setCurrentPosts={setCurrentPosts}
                  setPostToEdit={setPostToEdit}
                />
              ))}
          </div>
        </div>
      </Layout>
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
        isEditFormOpen={isEditFormOpen}
        closeEditForm={closeEditForm}
        setCurrentPosts={setCurrentPosts}
      />
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
