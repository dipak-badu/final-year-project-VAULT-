import { useMemo, useState } from "react";
import AreaChart from "../../component/visualizer/AreaChart";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

import { useTransaction } from "../../component/context/TransactionContext";
import { useIncome } from "../../component/context/INcomeContext";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "white";

export default function Report() {
  const { transactions = [], txLoading } = useTransaction();
  const { incomes = [], incomeLoading } = useIncome();

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const availableYears = useMemo(() => {
    const years = new Set();

    incomes.forEach((income) => {
      years.add(Number(income.year));
      // or:
      // years.add(new Date(income.date).getFullYear());
    });

    transactions.forEach((transaction) => {
      years.add(Number(transaction.year));
      // or:
      // years.add(new Date(transaction.date).getFullYear());
    });

    return [...years].sort((a, b) => b - a);
  }, [incomes, transactions]);

  const monthlyIncomes = useMemo(() => {
    return incomes.filter(
      (income) =>
        Number(income.month) === selectedMonth &&
        Number(income.year) === selectedYear,
    );
  }, [incomes, selectedMonth, selectedYear]);

  const monthlyExpenses = useMemo(() => {
    return transactions.filter(
      (transaction) =>
        Number(transaction.month) === selectedMonth &&
        Number(transaction.year) === selectedYear,
    );
  }, [transactions, selectedMonth, selectedYear]);

  if (incomeLoading || txLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white text-xl">
        Loading Reports...
      </div>
    );
  }

  const incomeData = monthlyIncomes.reduce((acc, item) => {
    acc[item.source] = (acc[item.source] || 0) + Number(item.amount);
    return acc;
  }, {});

  const expenseData = monthlyExpenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + Number(item.amount);
    return acc;
  }, {});

  const colors = [
    "rgba(255,99,132,0.2)",
    "rgba(54,162,235,0.2)",
    "rgba(255,205,86,0.2)",
    "rgba(75,192,192,0.2)",
    "rgba(153,102,255,0.2)",
    "rgba(255,159,64,0.2)",
    "rgba(199,199,199,0.2)",
    "rgba(83,102,255,0.2)",
    "rgba(255,99,71,0.2)",
    "rgba(60,179,113,0.2)",
  ];

  const borderColors = [
    "rgba(255,99,132,1)",
    "rgba(54,162,235,1)",
    "rgba(255,205,86,1)",
    "rgba(75,192,192,1)",
    "rgba(153,102,255,1)",
    "rgba(255,159,64,1)",
    "rgba(199,199,199,1)",
    "rgba(83,102,255,1)",
    "rgba(255,99,71,1)",
    "rgba(60,179,113,1)",
  ];

  const monthNames = [
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

  return (
    <main className="flex flex-col min-h-screen p-4 sm:p-6 md:p-8 gap-10">
      <div className="flex justify-end gap-4 flex-wrap">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="bg-[#16161d] border border-gray-600 rounded-md px-3 py-2 text-white"
        >
          {monthNames.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="bg-[#16161d] border border-gray-600 rounded-md px-3 py-2 text-white"
        >
          {availableYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="grid lg:grid-cols-2 w-full gap-10 max-w-350 mx-auto">
        <GridItems
          title="Monthly Income and Expenses"
          className="lg:col-span-2"
        >
          <AreaChart selectedYear={selectedYear} />
        </GridItems>

        <GridItems
          title={`Income Sources - ${
            monthNames[selectedMonth - 1]
          } ${selectedYear}`}
        >
          <div className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] mx-auto">
            <Doughnut
              data={{
                labels: Object.keys(incomeData),
                datasets: [
                  {
                    data: Object.values(incomeData),
                    backgroundColor: colors,
                    borderColor: borderColors,
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      color: "white",
                    },
                  },
                  tooltip: {
                    displayColors: false,
                    callbacks: {
                      label: function (context) {
                        return `Rs. ${Number(context.raw).toLocaleString(
                          "en-IN",
                        )}`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </GridItems>

        <GridItems
          title={`Expense Categories - ${
            monthNames[selectedMonth - 1]
          } ${selectedYear}`}
        >
          <div className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] mx-auto">
            <Doughnut
              data={{
                labels: Object.keys(expenseData),
                datasets: [
                  {
                    data: Object.values(expenseData),
                    backgroundColor: colors,
                    borderColor: borderColors,
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      color: "white",
                    },
                  },
                  tooltip: {
                    displayColors: false,
                    callbacks: {
                      label: function (context) {
                        return `Rs. ${Number(context.raw).toLocaleString(
                          "en-IN",
                        )}`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </GridItems>
      </div>
    </main>
  );
}

function GridItems({ title, className = "", children }) {
  return (
    <div
      className={`flex flex-col items-center p-4 border border-white/10 rounded-lg bg-[#16161d] min-h-[420px] overflow-hidden ${className}`}
    >
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>

      <div className="w-full">{children}</div>
    </div>
  );
}
