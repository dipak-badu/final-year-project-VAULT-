import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import axiosInstance from "../../config/Apiclient";

const TransactionContext = createContext(null);

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [txLoading, setTxLoading] = useState(true);
  const [pagination, setPagination] = useState({
    totalExpenses: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  });

  // GET /api/expense/getExpenses
  const fetchTransactions = async (params = {}) => {
    try {
      setTxLoading(true);

      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      if (params.category) query.append("category", params.category);
      if (params.search) query.append("search", params.search);
      if (params.sortBy) query.append("sortBy", params.sortBy);
      if (params.sortOrder) query.append("sortOrder", params.sortOrder);
      if (params.startDate) query.append("startDate", params.startDate);
      if (params.endDate) query.append("endDate", params.endDate);

      const url = query.toString()
        ? `/expense/getExpenses?${query.toString()}`
        : "/expense/getExpenses";

      const res = await axiosInstance.get(url);

      const list = res?.data?.expenses || [];
      const pageInfo = res?.data?.pagination || {};

      setTransactions(Array.isArray(list) ? list : []);
      setPagination((prev) => ({
        ...prev,
        ...pageInfo,
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load expenses");
      setTransactions([]);
    } finally {
      setTxLoading(false);
    }
  };

  // POST /api/expense/addExpense
  const addTransaction = async (payload) => {
    try {
      const body = {
        name: payload.name?.trim() || "Expense",
        amount: Number(payload.amount),
        category: payload.category,
        description: payload.description?.trim() || "",
        date: payload.date,
      };

      const res = await axiosInstance.post("/expense/addExpense", body);
      const created = res?.data?.expense;

      if (created) {
        setTransactions((prev) => [created, ...prev]);
      } else {
        await fetchTransactions();
      }

      toast.success(res?.data?.message || "Expense added successfully");
      return created;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add expense");
      throw error;
    }
  };

  // PUT /api/expense/editExpense/:id
  const editTransaction = async (id, payload) => {
    try {
      const body = {
        name: payload.name?.trim() || "Expense",
        amount: Number(payload.amount),
        category: payload.category,
        description: payload.description?.trim() || "",
        date: payload.date,
      };

      const res = await axiosInstance.put(`/expense/editExpense/${id}`, body);
      const updated = res?.data?.expense;

      if (updated) {
        setTransactions((prev) =>
          prev.map((item) =>
            String(item._id) === String(id) ? updated : item,
          ),
        );
      } else {
        await fetchTransactions();
      }

      toast.success(res?.data?.message || "Expense updated successfully");
      return updated;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update expense");
      throw error;
    }
  };

  // DELETE /api/expense/deleteExpense/:id
  const deleteTransaction = async (id) => {
    try {
      const res = await axiosInstance.delete(`/expense/deleteExpense/${id}`);
      setTransactions((prev) =>
        prev.filter((item) => String(item._id) !== String(id)),
      );
      toast.success(res?.data?.message || "Expense deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete expense");
      throw error;
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const value = useMemo(() => {
    const expense = transactions.reduce(
      (sum, t) => sum + Number(t?.amount || 0),
      0,
    );

    return {
      transactions,
      txLoading,
      pagination,
      income: 0, // income backend not added yet
      expense,
      balance: -expense,
      fetchTransactions,
      addTransaction,
      editTransaction,
      deleteTransaction,
      setTransactions,
    };
  }, [transactions, txLoading, pagination]);

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransaction() {
  const ctx = useContext(TransactionContext);
  if (!ctx) {
    throw new Error("useTransaction must be used within <TransactionProvider>");
  }
  return ctx;
}
