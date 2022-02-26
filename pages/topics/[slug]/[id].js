import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../../components/layout";
import Post from "../../../components/post";

export default function SingleTopic({ topic, posts }) {
  const { id, title, slug, category_name, category_id } = topic;
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
                <h1 className="text-2xl font-semibold mb-2">{title}</h1>
              </a>
            </Link>
            <div>
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
              <Post key={post.id} post={post} />
            ))}
          </div>
        </div>
      </Layout>
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
