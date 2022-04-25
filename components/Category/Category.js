import Link from "next/link";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

export default function Category({ category, topicsCount, latestTopic }) {
  const { id, name, slug, description } = category;

  return (
    <div className="flex py-4 pl-4 border-b-2 border-b-slate-200 border-l-4 border-l-indigo-600">
      <div className="flex-1 mb-2">
        <Link href={`/categories/${slug}/${id}`}>
          <a className="hover:underline">
            <h2 className="text-xl font-semibold mb-4">{name}</h2>
          </a>
        </Link>
        <p className="prose prose-slate">{description}</p>
      </div>
      <div className="w-24 text-right flex flex-col">
        <span className="text-2xl font-semibold">{topicsCount}</span>
        <span className="text-slate-500">
          {latestTopic.created_at &&
            formatDistanceToNowStrict(new Date(latestTopic.created_at))}
        </span>
      </div>
    </div>
  );
}
