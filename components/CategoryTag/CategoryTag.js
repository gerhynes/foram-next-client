import Link from "next/link";

function CategoryTag({ category_name, category_id }) {
  return (
    <span className="py-1 px-2 text-indigo-900 bg-indigo-200">
      <Link href={`/categories/${category_name.toLowerCase()}/${category_id}`}>
        <a>{category_name}</a>
      </Link>
    </span>
  );
}
export default CategoryTag;
