import { useState, useEffect } from "react";
import Link from "next/link";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import Avatar from "../Avatar/Avatar";

function CategoryPreview({ category }) {
  const [topics, setTopics] = useState([]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(async () => {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${category.id}/topics`
      );
      const latestTopics = await result.json();
      setTopics(latestTopics);
      setIsMounted(true);
    } catch (error) {}
  }, []);

  const latestTopic = topics.sort(
    (a, b) => -a.updated_at.localeCompare(b.updated_at)
  )[0];

  console.log(latestTopic);

  return (
    <article className="flex gap-4 py-4 justify-between">
      <div className="flex gap-4 items-center">
        <h4 className="text-xl font-semibold w-28 break-all">
          {category.name}
        </h4>
        {isMounted && (
          <div className="flex gap-4 items-center">
            <Avatar username={latestTopic.username} />
            <span>{latestTopic.title}</span>
          </div>
        )}
      </div>
      <div className="flex gap-4">
        <div>
          <span className="w-14 grid place-content-center">
            {topics.length}
          </span>
        </div>
        <div>
          <span className="w-14 grid place-content-center">
            {isMounted &&
              formatDistanceToNowStrict(new Date(latestTopic.updated_at))}
          </span>
        </div>
      </div>
    </article>
  );
}
export default CategoryPreview;
