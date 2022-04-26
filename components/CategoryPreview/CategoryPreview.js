import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CategoryPreview({ category, topics, latestTopic }) {
  const [posts, setPosts] = useState([]);

  const [isMounted, setIsMounted] = useState(false);

  const getLatestPost = (posts) => {
    return posts.sort((a, b) => -a.updated_at.localeCompare(b.updated_at))[0];
  };

  const truncateString = (string, num) => {
    if (string.length > num) {
      return string.slice(0, num) + "...";
    } else {
      return string;
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      await axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/topics/${latestTopic.id}/posts`
        )
        .then((res) => {
          setPosts(res.data);
          setIsMounted(true);
        })
        .catch((error) => {
          console.error(error);
          toast.error("An error occurred. Please try again shortly");
        });
    };

    getPosts();
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
                {formatDistanceToNowStrict(new Date(latestTopic.updated_at))}
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
              {posts.length > 0 &&
                formatDistanceToNowStrict(
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
