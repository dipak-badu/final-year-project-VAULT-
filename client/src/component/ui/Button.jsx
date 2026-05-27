export default function Button({ type, value }) {
  return (
    <button
      type={type}
      className="bg-blue-600 text-black font-semibold py-3 rounded-xl hover:bg-blue-700 transition cursor-pointer"
    >
      {value}
    </button>
  );
}
