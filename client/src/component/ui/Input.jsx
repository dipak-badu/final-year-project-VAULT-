export default function Input({ placeholder, type }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-white transition"
    />
  );
}
