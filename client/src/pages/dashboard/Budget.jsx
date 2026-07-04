import { Search, Pencil, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useIncome } from "../../component/context/INcomeContext";
import { useTransaction } from "../../component/context/TransactionContext";

export default function Transaction() {
  const {
    incomes,
    incomeLoading,
    totalIncome,
    pagination,
    editIncome,
    deleteIncome,
  } = useIncome();
  const { expense, balance } = useTransaction();

  const [search, setSearch] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return incomes;

    return incomes.filter((t) => {
      const source = (t.source || "").toLowerCase();
      const description = (t.description || "").toLowerCase();

      return source.includes(q) || description.includes(q);
    });
  }, [incomes, search]);

  const onDelete = async (id) => {
    const ok = window.confirm("Delete this income?");
    if (!ok) return;
    await deleteIncome(id);
  };

  const onEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingItem?._id) return;

    setSaving(true);
    try {
      await editIncome(editingItem._id, {
        name: editingItem.name,
        amount: editingItem.amount,
        source: editingItem.source,
        description: editingItem.description || "",
        date: editingItem.date?.slice(0, 10),
      });
      setEditingItem(null);
    } finally {
      setSaving(false);
    }
  };

  if (incomeLoading) {
    return <div className="flex-1 p-8 text-white">Loading incomes...</div>;
  }

  return (
    <div className="flex-1 p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-4xl mb-4 md:mb-0 font-bold">Incomes</h2>

        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search incomes..."
            className="bg-[#14141E] border border-gray-700 rounded-xl pl-10 pr-4 py-3 w-80 outline-none"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#14141E] rounded-2xl p-6 border border-gray-800">
          <p className="text-sm text-gray-400">TOTAL INCOMES</p>
          <h3 className="text-4xl font-bold mt-2">
            Rs. {Number(totalIncome).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h3>
        </div>
        <div className="bg-[#14141E] rounded-2xl p-6 border border-gray-800">
          <p className="text-sm text-gray-400">NUMBER OF INCOMES</p>
          <h3 className="text-4xl font-bold mt-2">{incomes.length}</h3>
        </div>
        <div className="bg-[#14141E] rounded-2xl p-6 border border-gray-800">
          <p className="text-sm text-gray-400">BALANCE</p>
          <h3 className="text-4xl font-bold mt-2">
            Rs. {Number(totalIncome - expense).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            <br />
            {totalIncome - expense < 0 ? (
              <span className="text-red-400 text-lg ml-2">(Over Budget)</span>
            ) : null}
          </h3>
        </div>
      </div>

      <div className="bg-[#14141E] rounded-2xl border border-gray-800 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-6 text-gray-400">No incomes found.</div>
        ) : (
          filtered.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center p-6 border-b border-gray-800"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-800"></div>
                <div>
                  <h4 className="font-semibold text-lg">
                    {item.name || "Income"}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {item.source || "Income"}
                    {item.description ? ` • ${item.description}` : ""}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p className="text-2xl font-bold text-green-400">
                  +Rs. {Number(item.amount).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>

                <button
                  onClick={() =>
                    setEditingItem({ ...item, date: item.date?.slice(0, 10) })
                  }
                  className="p-2 rounded-lg border border-gray-700 hover:bg-gray-800"
                  title="Edit"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => onDelete(item._id)}
                  className="p-2 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {editingItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#16161d] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Edit Income</h3>
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
                  setEditingItem((p) => ({ ...p, name: e.target.value }))
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
                  setEditingItem((p) => ({ ...p, amount: e.target.value }))
                }
                placeholder="Amount"
                className="w-full h-11 px-4 rounded-lg bg-[#0f1117] border border-white/10 outline-none"
                required
              />
              <input
                value={editingItem.source || ""}
                onChange={(e) =>
                  setEditingItem((p) => ({ ...p, source: e.target.value }))
                }
                placeholder="Source"
                className="w-full h-11 px-4 rounded-lg bg-[#0f1117] border border-white/10 outline-none"
                required
              />
              <input
                type="date"
                value={editingItem.date?.slice(0, 10) || ""}
                onChange={(e) =>
                  setEditingItem((p) => ({ ...p, date: e.target.value }))
                }
                className="w-full h-11 px-4 rounded-lg bg-[#0f1117] border border-white/10 outline-none"
                required
              />
              <input
                value={editingItem.description || ""}
                onChange={(e) =>
                  setEditingItem((p) => ({ ...p, description: e.target.value }))
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
