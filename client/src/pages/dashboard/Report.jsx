import AreaChart from "../../component/visualizer/AreaChart";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

import { useTransaction } from "../../component/context/TransactionContext";
import { useIncome } from "../../component/context/INcomeContext";
import Transaction from "./Transaction";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "white";

export default function Report() {
    const { transactions = [], txLoading } = useTransaction();

    const { incomes = [], incomeLoading } = useIncome();

    // Show loading while data is being fetched
    if (incomeLoading || txLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-white text-xl">
                Loading Reports...
            </div>
        );
    }

    // Group incomes by source
    const incomeData = incomes.reduce((acc, item) => {
        acc[item.source] = (acc[item.source] || 0) + Number(item.amount);
        return acc;
    }, {});

    // Group expenses by category
    const expenseData = transactions.reduce((acc, item) => {
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

    return (
        <main className="flex flex-col min-h-screen p-4 sm:p-6 md:p-8 gap-10">
            <div className="grid lg:grid-cols-2 w-full gap-10 max-w-350 mx-auto">
                <GridItems
                    title="Monthly Income and Expenses"
                    className="lg:col-span-2"
                >
                    <AreaChart />
                </GridItems>

                <GridItems title="Income Sources">
                    <div className="w-75 h-75 mx-auto">
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
                                },
                            }}
                        />
                    </div>
                </GridItems>

                <GridItems title="Expense categrories">
                    <div className="w-75 h-75 mx-auto">
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
            className={`flex flex-col items-center justify-center p-4 border border-white/10 rounded-lg bg-[#16161d] min-h-105 ${className}`}
        >
            <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>

            <div className="w-full">{children}</div>
        </div>
    );
}
