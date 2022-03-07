import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../../components/layout";
import Post from "../../../components/post";
import PostForm from "../../../components/postForm";

export default function SingleTopic({ topic, posts }) {
  const { id, title, slug, category_name, category_id, username } = topic;
  let [isOpen, setIsOpen] = useState(false);
  const openForm = () => setIsOpen(true);
  const closeForm = () => setIsOpen(false);

  return (
    <div>
      <Head>
        <title>Fóram</title>
        <meta name="description" content="Fóram | A platform for discussion" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="max-w-3xl mt-10 mx-auto">
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
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                username={username}
                openForm={openForm}
              />
            ))}
          </div>
        </div>
      </Layout>
      <PostForm
        topic={topic}
        posts={posts}
        isOpen={isOpen}
        closeForm={closeForm}
      />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const topicRes = await fetch(`http://localhost:8080/api/topics/${params.id}`);
  const topic = await topicRes.json();

  const postsRes = await fetch(
    `http://localhost:8080/api/topics/${params.id}/posts`
  );
  const posts = await postsRes.json();

  return { props: { topic, posts } };
}
