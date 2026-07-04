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

import { useMemo } from "react";
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

export default function AreaChartComponent() {
  const { transactions = [] } = useTransaction();
  const { incomes = [] } = useIncome();

  const chartData = useMemo(() => {
    const data = months.map((month) => ({
      name: month,
      income: 0,
      expenses: 0,
    }));

    // Add incomes
    incomes.forEach((income) => {
      const monthIndex = new Date(income.date).getMonth();
      data[monthIndex].income += Number(income.amount);
    });

    // Add expenses
    transactions.forEach((expense) => {
      const monthIndex = new Date(expense.date).getMonth();
      data[monthIndex].expenses += Number(expense.amount);
    });

    return data;
  }, [transactions, incomes]);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#3b3b3b" />

        <XAxis dataKey="name" tick={{ fill: "white" }} stroke="white" />

        <YAxis tick={{ fill: "white" }} stroke="white" />

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
          fillOpacity={0.4}
        />

        <Area
          type="monotone"
          dataKey="income"
          stroke="#22c55e"
          fill="#22c55e"
          fillOpacity={0.4}
        />
      </AreaChart>
    </ResponsiveContainer>
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
          ₹{payload.find((p) => p.dataKey === "income")?.value ?? 0}
        </span>
      </p>

      <p className="text-red-400">
        Expenses:
        <span className="ml-2">
          ₹{payload.find((p) => p.dataKey === "expenses")?.value ?? 0}
        </span>
      </p>
    </div>
  );
}
