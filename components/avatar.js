export default function Avatar({ username }) {
  const initials = username?.toUpperCase().substring(0, 2);

  return (
    <div className="w-10 h-10 grid place-content-center text-white bg-indigo-600 tracking-wider">
      {initials || ""}
    </div>
  );
}
