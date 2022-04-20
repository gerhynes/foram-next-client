import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../../components/Layout/Layout";
import Post from "../../../components/Post/Post";
import PostForm from "../../../components/PostForm/PostForm";
import PostEditForm from "../../../components/PostEditForm/PostEditForm";
import CategoryTag from "../../../components/CategoryTag/CategoryTag";

export default function SingleTopic({ topic, posts }) {
  const { id, title, slug, category_name, category_id, username } = topic;

  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentPosts, setCurrentPosts] = useState(posts);
  const [postToEdit, setPostToEdit] = useState({});

  const openPostForm = () => setIsPostFormOpen(true);
  const openEditForm = () => setIsEditFormOpen(true);
  const closePostForm = () => setIsPostFormOpen(false);
  const closeEditForm = () => setIsEditFormOpen(false);

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
            <h1 className="text-3xl font-semibold mb-4">{title}</h1>
            <div className="mb-2">
              <CategoryTag
                category_id={category_id}
                category_name={category_name}
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
