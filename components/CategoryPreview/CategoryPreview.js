import { useState, useEffect } from "react";
import Link from "next/link";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CategoryPreview({ category }) {
  const [topics, setTopics] = useState([]);
  const [posts, setPosts] = useState([]);

  const [isMounted, setIsMounted] = useState(false);
  const [latestTopic, setLatestTopic] = useState({});

  const getLatestPost = (posts) => {
    return posts.sort((a, b) => -a.created_at.localeCompare(b.created_at))[0];
  };

  const truncateString = (string, num) => {
    if (string.length > num) {
      return string.slice(0, num) + "...";
    } else {
      return string;
    }
  };

  const getTopicsAndPosts = async () => {
    try {
      const topicRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${category.id}/topics`
      );
      const latestTopics = await topicRes.json();

      const topic = latestTopics.sort(
        (a, b) => -a.updated_at.localeCompare(b.updated_at)
      )[0];

      try {
        const postsRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/topics/${topic.id}/posts`
        );
        const topicPosts = await postsRes.json();
        setPosts(topicPosts);
      } catch (error) {
        console.log(error);
      }

      setTopics(latestTopics);
      setLatestTopic(topic);
      setIsMounted(true);
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again shortly");
    }
  };

  useEffect(() => {
    getTopicsAndPosts();
  }, []);

  return (
    <>
      <article className="flex gap-4 py-4 flex-wrap justify-between border-b-2 border-slate-300">
        <div className="flex gap-4 items-center">
          <h4 className="text-xl font-semibold w-28 break-all">
            <Link href={`/categories/${category.slug}/${category.id}`}>
              <a className="hover:underline">{category.name}</a>
            </Link>
          </h4>
          <div className="flex gap-4">
            <div>
              <span className="w-14 grid place-content-center">
                {topics.length}
              </span>
            </div>
            <div>
              <span className="w-14 grid place-content-center">
                {isMounted &&
                  latestTopic.updated_at &&
                  formatDistanceToNowStrict(new Date(latestTopic.updated_at))}
              </span>
            </div>
          </div>
        </div>
        {isMounted && (
          <div className="flex gap-4 items-center border-2 border-slate-300 p-2 rounded">
            <span>
              <Link href={`topics/${latestTopic.slug}/${latestTopic.id}`}>
                <a className="hover:underline">
                  {truncateString(latestTopic.title, 50)}
                </a>
              </Link>
            </span>
            <span>{posts.length > 1 ? posts.length - 1 : 0}</span>
            <span>
              {formatDistanceToNowStrict(
                new Date(getLatestPost(posts).updated_at)
              )}
            </span>
          </div>
        )}
      </article>
      <ToastContainer />
    </>
  );
}
export default CategoryPreview;
