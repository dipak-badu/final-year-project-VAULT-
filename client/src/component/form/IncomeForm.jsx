import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import TransactionLabel from "../transaction/TransactionLabe";
import { useTransaction } from "../context/TransactionContext";

const expenseCategories = [
  "food ",
  "transportation",
  "shopping",
  "entertainment",
  "bills",
  "health",
  "education",
  "utilities",
  "Other",
];

const incomeSources = [
  "salary",
  "freelance",
  "business",
  "investment",
  "gift",
  "Other",
];

export default function IncomeForm({ label, type = "expense", onCancel }) {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { addTransaction } = useTransaction();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
      description: "",
      category: type === "expense" ? "Food & Dining" : "Salary",
    },
  });

  const onSubmit = async (data) => {
    try {
      if (type === "income") {
        // Your backend currently supports only expense routes
        toast.error(
          "Income API not ready yet. Please add backend income route.",
        );
        return;
      }

      await addTransaction({
        name: data.name || "Expense",
        amount: Number(data.amount),
        category: data.category,
        description: data.description.trim() || "",
        date: data.date,
      });

      toast.success("Transaction saved");
      navigate(`/user/${userId}/transactions`);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to save transaction",
      );
    }
  };

  const options = type === "expense" ? expenseCategories : incomeSources;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Amount + Date */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <TransactionLabel>Amount</TransactionLabel>
          <input
            {...register("amount", { required: true, min: 1 })}
            type="number"
            step="0.01"
            placeholder="0.00"
            className="w-full h-11 px-4 rounded-lg bg-[#0f1117] border border-white/10 text-white outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <TransactionLabel>Date</TransactionLabel>
          <input
            {...register("date", { required: true })}
            type="date"
            className="w-full h-11 px-4 rounded-lg bg-[#0f1117] border border-white/10 text-white outline-none focus:border-indigo-500"
          />
        </div>
      </div>
      <div className="mb-5">
        <TransactionLabel>Name</TransactionLabel>
        <input
          {...register("name")}
          type="text"
          className="w-full h-11 px-4 rounded-lg bg-[#0f1117] border border-white/10 text-white outline-none focus:border-indigo-500"
        />
      </div>

      {/* Description */}
      <div className="mb-5">
        <TransactionLabel>Description</TransactionLabel>
        <input
          {...register("description")}
          type="text"
          placeholder="Weekly Groceries"
          className="w-full h-11 px-4 rounded-lg bg-[#0f1117] border border-white/10 text-white outline-none focus:border-indigo-500"
        />
      </div>

      {/* Category / Source */}
      <div className="mb-6">
        <TransactionLabel>{label}</TransactionLabel>
        <select
          {...register("category", { required: true })}
          className="w-full h-11 px-4 rounded-lg bg-[#0f1117] border border-white/10 text-white outline-none focus:border-indigo-500"
        >
          {options.map((item) => (
            <option key={item} value={item} className="text-white">
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Footer */}
      <div className="flex justify-between gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 rounded-lg text-gray-400 hover:text-white bg-red-300/20 transition hover:bg-red-300 hover:cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium transition disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Save Transaction"}
        </button>
      </div>
    </form>
  );
}
