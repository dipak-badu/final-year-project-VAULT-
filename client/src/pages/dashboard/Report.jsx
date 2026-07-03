import AreaChart from "../../component/visualizer/AreaChart"

import React from 'react';
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Line, Doughnut } from 'react-chartjs-2';

import sourceData from "../../data/sourceData.json";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";


export default function Report() {
    return (
        <main className="flex flex-col min-h-screen p-4 sm:p-6 md:p-8 gap-10">
            <div className="grid lg:grid-cols-3 w-full gap-10 max-w-350">
                <GridItems title="Monthly Income and Expenses" className="lg:col-span-2">
                    <AreaChart />
                </GridItems>

                <GridItems title="Expense Sources">
                    <div className="w-75 h-75 mx-auto">
                        <Doughnut
                            data={{
                                labels: sourceData.map((item) => item.label),
                                datasets: [
                                    {
                                        data: sourceData.map((item) => item.value),
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 205, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                            'rgba(199, 199, 199, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 205, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)',
                                            'rgba(255, 159, 64, 1)',
                                            'rgba(199, 199, 199, 1)'
                                        ],
                                        borderWidth: 1
                                    }
                                ]
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        position: "bottom",
                                    },
                                },
                            }}
                        />
                    </div>
                </GridItems>
            </div>
        </main>
    )
}

function GridItems({ title, className, children }) {
    return (
        <div className={`flex flex-col items-center justify-center p-4 border border-white/10 rounded-lg bg-[#16161d] min-h-100 ${className}`}>
            <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
            <div className="w-full">{children}</div>
        </div>
    )
}