import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import axiosInstance from "../../config/Apiclient";

const IncomeContext = createContext(null);

export function IncomeProvider({ children }) {
  const [incomes, setIncomes] = useState([]);
  const [incomeLoading, setIncomeLoading] = useState(true);

  const [pagination, setPagination] = useState({
    totalIncomes: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  });

  // ===========================
  // GET ALL INCOMES
  // ===========================
  const fetchIncomes = async (params = {}) => {
    try {
      setIncomeLoading(true);

      const query = new URLSearchParams();

      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));
      if (params.search) query.append("search", params.search);
      if (params.sortBy) query.append("sortBy", params.sortBy);
      if (params.sortOrder) query.append("sortOrder", params.sortOrder);
      if (params.startDate) query.append("startDate", params.startDate);
      if (params.endDate) query.append("endDate", params.endDate);

      const url = query.toString()
        ? `/income/getIncomes?${query.toString()}`
        : "/income/getIncomes";

      const res = await axiosInstance.get(url);

      setIncomes(Array.isArray(res.data.incomes) ? res.data.incomes : []);

      setPagination({
        totalIncomes: res.pagination?.totalIncomes || 0,
        totalPages: res.pagination?.totalPages || 1,
        currentPage: res.pagination?.currentPage || 1,
        limit: res.pagination?.limit || 10,
      });
    } catch (error) {
      toast.error(error?.message || "Failed to load incomes");
      setIncomes([]);
    } finally {
      setIncomeLoading(false);
    }
  };

  // ===========================
  // ADD INCOME
  // ===========================
  const addIncome = async (payload) => {
    try {
      const body = {
        name: payload.name?.trim() || "Income",
        amount: Number(payload.amount),
        source: payload.source?.trim() || "",
        description: payload.description?.trim() || "",
        date: payload.date,
      };

      const res = await axiosInstance.post("income/addIncome", body);
      console.log("ADD INCOME RESPONSE:", res);

      if (res.data?.income) {
        setIncomes((prev) => [res.data.income, ...prev]);
      } else {
        await fetchIncomes();
      }

      toast.success(res.data?.message);

      return res.data?.income;
    } catch (error) {
      toast.error(error?.message || "Failed to add income");
      throw error;
    }
  };

  // ===========================
  // EDIT INCOME
  // ===========================
  const editIncome = async (id, payload) => {
    try {
      const body = {
        name: payload.name?.trim() || "Income",
        amount: Number(payload.amount),
        source: payload.source?.trim() || "",
        description: payload.description?.trim() || "",
        date: payload.date,
      };

      const res = await axiosInstance.put(`income/editIncome/${id}`, body);

      if (res.data?.income) {
        setIncomes((prev) =>
          prev.map((item) => (item._id === id ? res.data.income : item)),
        );
      } else {
        await fetchIncomes();
      }

      toast.success(res.data?.message);

      return res.data?.income;
    } catch (error) {
      toast.error(error?.message || "Failed to update income");
      throw error;
    }
  };

  // ===========================
  // DELETE INCOME
  // ===========================
  const deleteIncome = async (id) => {
    try {
      const res = await axiosInstance.delete(`income/deleteIncome/${id}`);

      setIncomes((prev) => prev.filter((item) => item._id !== id));

      toast.success(res.data?.message);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete income");
      throw error;
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const value = useMemo(() => {
    const totalIncome = incomes.reduce(
      (sum, income) => sum + Number(income.amount),
      0,
    );

    return {
      incomes,
      incomeLoading,
      pagination,
      totalIncome,

      fetchIncomes,
      addIncome,
      editIncome,
      deleteIncome,

      setIncomes,
    };
  }, [incomes, incomeLoading, pagination]);

  return (
    <IncomeContext.Provider value={value}>{children}</IncomeContext.Provider>
  );
}

export function useIncome() {
  const context = useContext(IncomeContext);

  if (!context) {
    throw new Error("useIncome must be used within <IncomeProvider>");
  }

  return context;
}
