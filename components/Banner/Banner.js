function Banner({ title = "", text = "" }) {
  return (
    <div className="text-indigo-900 bg-indigo-200 rounded p-4">
      <h2 className="font-semibold text-3xl mb-2">{title}</h2>
      <p className="text-lg">{text}</p>
    </div>
  );
}
export default Banner;
