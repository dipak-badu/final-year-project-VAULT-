import TransactionLabel from "../transaction/TransactionLabe";
export default function IncomeForm({ label }) {
  return (
    <form>
      {/* Amount + Date */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <TransactionLabel>Amount</TransactionLabel>

          <input
            type="number"
            placeholder="0.00"
            className="w-full h-11 px-4 rounded-lg bg-[#0f1117] border border-white/10 text-white outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <TransactionLabel>Date</TransactionLabel>

          <input
            type="date"
            className="w-full h-11 px-4 rounded-lg bg-[#0f1117] border border-white/10 text-white outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Description */}
      <div className="mb-5">
        <TransactionLabel>Description</TransactionLabel>

        <input
          type="text"
          placeholder="Weekly Groceries"
          className="w-full h-11 px-4 rounded-lg bg-[#0f1117] border border-white/10 text-white outline-none focus:border-indigo-500"
        />
      </div>

      {/* Category */}
      <div className="mb-6">
        <TransactionLabel>{label}</TransactionLabel>

        <select className="w-full h-11 px-4 rounded-lg bg-[#0f1117] border border-white/10 text-white outline-none focus:border-indigo-500">
          <option>Food & Dining</option>
          <option>Transportation</option>
          <option>Shopping</option>
          <option>Entertainment</option>
        </select>
      </div>

      {/* Footer */}
      <div className="flex justify-between gap-3">
        <button className="px-5 py-2.5 rounded-lg text-gray-400 hover:text-white bg-red-300/20 transition hover:bg-red-300 hover:cursor-pointer">
          Cancel
        </button>

        <button className="px-5 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition ">
          Save Transaction
        </button>
      </div>
    </form>
  );
}
