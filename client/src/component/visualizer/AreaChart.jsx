import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { useMemo, useState } from "react";
import { useTransaction } from "../context/TransactionContext";
import { useIncome } from "../context/INcomeContext";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function AreaChartComponent({ selectedYear }) {
  const { transactions = [] } = useTransaction();
  const { incomes = [] } = useIncome();

  // Get all available years
  const availableYears = useMemo(() => {
    const years = new Set();

    incomes.forEach((income) => {
      years.add(new Date(income.date).getFullYear());
    });

    transactions.forEach((expense) => {
      years.add(new Date(expense.date).getFullYear());
    });

    return [...years].sort((a, b) => b - a);
  }, [transactions, incomes]);

  const chartData = useMemo(() => {
    const data = months.map((month) => ({
      name: month,
      income: 0,
      expenses: 0,
    }));

    // Add incomes
    incomes.forEach((income) => {
      const date = new Date(income.date);

      if (date.getFullYear() !== selectedYear) return;

      data[date.getMonth()].income += Number(income.amount);
    });

    // Add expenses
    transactions.forEach((expense) => {
      const date = new Date(expense.date);

      if (date.getFullYear() !== selectedYear) return;

      data[date.getMonth()].expenses += Number(expense.amount);
    });

    return data;
  }, [transactions, incomes, selectedYear]);

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3b3b3b" />

          <XAxis dataKey="name" tick={{ fill: "white" }} stroke="white" />

          <YAxis
            tickFormatter={(value) => `Rs. ${value.toLocaleString("en-IN")}`}
            tick={{ fill: "white" }}
            stroke="white"
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend
            wrapperStyle={{
              color: "white",
            }}
          />

          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#ef4444"
            fill="#ef4444"
            fillOpacity={0.35}
            animationDuration={1200}
          />

          <Area
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.35}
            animationDuration={1200}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[#16161d] border border-gray-700 rounded-lg p-4">
      <p className="text-white font-semibold mb-2">{label}</p>

      <p className="text-green-400">
        Income:
        <span className="ml-2">
          Rs.
          {payload
            .find((p) => p.dataKey === "income")
            ?.value?.toLocaleString("en-IN") ?? 0}
        </span>
      </p>

      <p className="text-red-400">
        Expenses:
        <span className="ml-2">
          Rs.
          {payload
            .find((p) => p.dataKey === "expenses")
            ?.value?.toLocaleString("en-IN") ?? 0}
        </span>
      </p>
    </div>
  );
}
