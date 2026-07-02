import { useState } from "react";
import TransactionLabel from "../component/transaction/TransactionLabe";
import IncomeForm from "../component/form/IncomeForm";
import { useNavigate } from "react-router-dom";

export default function NewTransaction() {
  const [type, setType] = useState("expense");
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#16161d] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">New Transaction</h2>

          <button
            className="text-gray-400 hover:text-white hover:cursor-pointer"
            onClick={() => navigate(-1)}
          >
            ✕
          </button>
        </div>

        {/* Type */}
        <div className="mb-5">
          <TransactionLabel>Transaction Type</TransactionLabel>

          <div className="grid grid-cols-2 bg-[#0f1117] rounded-lg p-1">
            <button
              onClick={() => setType("expense")}
              className={`py-2 rounded-md font-medium transition-all ${
                type === "expense"
                  ? "bg-red-500/20 text-red-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Expense
            </button>

            <button
              onClick={() => setType("income")}
              className={`py-2 rounded-md font-medium transition-all ${
                type === "income"
                  ? "bg-green-500/20 text-green-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Income
            </button>
          </div>
        </div>

        {type === "expense" ? (
          <IncomeForm
            label="Category"
            type="expense"
            onCancel={() => navigate(-1)}
          />
        ) : (
          <IncomeForm
            label="Source"
            type="income"
            onCancel={() => navigate(-1)}
          />
        )}
      </div>
    </div>
  );
}
