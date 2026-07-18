import { Search, Pencil, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useTransaction } from "../../component/context/TransactionContext";
import { useIncome } from "../../component/context/INcomeContext";

export default function Transaction() {
  const { transactions, txLoading, deleteTransaction, editTransaction } =
    useTransaction();

  const { incomes } = useIncome();

  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const [search, setSearch] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = useMemo(() => {
    const allYears = [
      ...transactions.map((t) => new Date(t.date).getFullYear()),
      ...incomes.map((i) => new Date(i.date).getFullYear()),
    ];

    const uniqueYears = [...new Set(allYears)].sort((a, b) => b - a);

    return uniqueYears.length ? uniqueYears : [new Date().getFullYear()];
  }, [transactions, incomes]);

  const monthlyTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const date = new Date(transaction.date);

      return (
        date.getMonth() === selectedMonth && date.getFullYear() === selectedYear
      );
    });
  }, [transactions, selectedMonth, selectedYear]);

  const monthlyIncomes = useMemo(() => {
    return incomes.filter((income) => {
      const date = new Date(income.date);

      return (
        date.getMonth() === selectedMonth && date.getFullYear() === selectedYear
      );
    });
  }, [incomes, selectedMonth, selectedYear]);

  const monthlyExpense = useMemo(() => {
    return monthlyTransactions.reduce(
      (sum, item) => sum + Number(item.amount),
      0,
    );
  }, [monthlyTransactions]);

  const monthlyIncome = useMemo(() => {
    return monthlyIncomes.reduce((sum, item) => sum + Number(item.amount), 0);
  }, [monthlyIncomes]);

  const monthlyBalance = monthlyIncome - monthlyExpense;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return monthlyTransactions;

    return monthlyTransactions.filter((t) => {
      const name = (t.name || "").toLowerCase();
      const category = (t.category || "").toLowerCase();
      const description = (t.description || "").toLowerCase();

      return (
        name.includes(q) || category.includes(q) || description.includes(q)
      );
    });
  }, [monthlyTransactions, search]);

  const onDelete = async (id) => {
    const ok = window.confirm("Delete this transaction?");
    if (!ok) return;

    await deleteTransaction(id);
  };

  const onEditSubmit = async (e) => {
    e.preventDefault();

    if (!editingItem?._id) return;

    setSaving(true);

    try {
      await editTransaction(editingItem._id, {
        name: editingItem.name,
        amount: Number(editingItem.amount),
        category: editingItem.category,
        description: editingItem.description || "",
        date: editingItem.date?.slice(0, 10),
      });

      setEditingItem(null);
    } finally {
      setSaving(false);
    }
  };

  if (txLoading) {
    return <div className="flex-1 p-8 text-white">Loading transactions...</div>;
  }

  return (
    <div className="flex-1 p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <h2 className="text-4xl font-bold">Transactions</h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="bg-[#14141E] border border-gray-700 rounded-xl px-4 py-3 outline-none"
          >
            {months.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="bg-[#14141E] border border-gray-700 rounded-xl px-4 py-3 outline-none"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search transactions..."
              className="bg-[#14141E] border border-gray-700 rounded-xl pl-10 pr-4 py-3 w-full sm:w-80 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#14141E] rounded-2xl p-6 border border-gray-800">
          <p className="text-sm text-gray-400">MONTHLY INCOME</p>

          <h3 className="text-2xl sm:text-4xl font-bold mt-2 break-all text-green-400">
            Rs.{" "}
            {monthlyIncome.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h3>
        </div>

        <div className="bg-[#14141E] rounded-2xl p-6 border border-gray-800">
          <p className="text-sm text-gray-400">MONTHLY SPEND</p>

          <h3 className="text-2xl sm:text-4xl font-bold mt-2 break-all text-red-400">
            Rs.{" "}
            {monthlyExpense.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h3>
        </div>

        <div className="bg-[#14141E] rounded-2xl p-6 border border-gray-800">
          <p className="text-sm text-gray-400">TRANSACTIONS</p>

          <h3 className="text-2xl sm:text-4xl font-bold mt-2">
            {monthlyTransactions.length}
          </h3>
        </div>

        <div className="bg-[#14141E] rounded-2xl p-6 border border-gray-800">
          <p className="text-sm text-gray-400">BALANCE</p>

          <h3
            className={`text-2xl sm:text-4xl font-bold mt-2 break-all ${
              monthlyBalance >= 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            Rs.{" "}
            {monthlyBalance.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h3>

          {monthlyBalance < 0 && (
            <p className="text-red-400 mt-2 text-sm">Over Budget</p>
          )}
        </div>
      </div>

      <div className="bg-[#14141E] rounded-2xl border border-gray-800 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            No transactions found for{" "}
            <span className="font-semibold">
              {months[selectedMonth]} {selectedYear}
            </span>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item._id}
              className="flex flex-col gap-4 p-4 sm:p-6 border-b border-gray-800"
            >
              <div className="flex gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-gray-800 shrink-0"></div>

                <div className="min-w-0 flex-1">
                  <h4 className="font-semibold text-lg break-all">
                    {item.name || "Expense"}
                  </h4>

                  <p className="text-sm text-gray-400 break-all">
                    {item.category}
                    {item.description ? ` • ${item.description}` : ""}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className="text-lg sm:text-2xl font-bold text-red-400 break-all">
                  -Rs.{" "}
                  {Number(item.amount).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setEditingItem({
                        ...item,
                        date: item.date?.slice(0, 10),
                      })
                    }
                    className="p-2 rounded-lg border border-gray-700 hover:bg-gray-800"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => onDelete(item._id)}
                    className="p-2 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {editingItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#16161d] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Edit Transaction</h3>

              <button
                onClick={() => setEditingItem(null)}
                className="text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={onEditSubmit} className="space-y-4">
              <input
                value={editingItem.name || ""}
                onChange={(e) =>
                  setEditingItem((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="Name"
                className="w-full h-11 px-4 rounded-lg bg-[#0f1117] border border-white/10 outline-none"
                required
              />

              <input
                type="number"
                step="0.01"
                value={editingItem.amount ?? ""}
                onChange={(e) =>
                  setEditingItem((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }))
                }
                placeholder="Amount"
                className="w-full h-11 px-4 rounded-lg bg-[#0f1117] border border-white/10 outline-none"
                required
              />

              <input
                value={editingItem.category || ""}
                onChange={(e) =>
                  setEditingItem((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                placeholder="Category"
                className="w-full h-11 px-4 rounded-lg bg-[#0f1117] border border-white/10 outline-none"
                required
              />

              <input
                type="date"
                value={editingItem.date?.slice(0, 10) || ""}
                onChange={(e) =>
                  setEditingItem((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
                className="w-full h-11 px-4 rounded-lg bg-[#0f1117] border border-white/10 outline-none"
                required
              />

              <input
                value={editingItem.description || ""}
                onChange={(e) =>
                  setEditingItem((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Description"
                className="w-full h-11 px-4 rounded-lg bg-[#0f1117] border border-white/10 outline-none"
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-lg border border-gray-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
