export default function TransactionLabel({ children }) {
  return (
    <label className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
      {children}
    </label>
  );
}
