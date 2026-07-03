'use client';
import {
    AreaChart,
    Area,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';

const productSales = [
    {
        name: 'Jan',
        expenses: 4000,
        income: 2400,
    },
    {
        name: 'Feb',
        expenses: 3000,
        income: 1398,
    },
    {
        name: 'Mar',
        expenses: 2000,
        income: 9800,
    },
    {
        name: 'Apr',
        expenses: 2780,
        income: 3908,
    },
    {
        name: 'May',
        expenses: 1890,
        income: 4800,
    },
    {
        name: 'Jun',
        expenses: 2390,
        income: 5800,
    },
    {
        name: 'Jul',
        expenses: 3490,
        income: 4300,
    },
    {
        name: 'Aug',
        expenses: 3890,
        income: 13000,
    },
    {
        name: 'Sep',
        expenses: 4990,
        income: 4400,
    },
    {
        name: 'Oct',
        expenses: 5090,
        income: 5000,
    },
    {
        name: 'Nov',
        expenses: 5490,
        income: 9000,
    },
    {
        name: 'Dec',
        expenses: 6790,
        income: 8300,
    },
];

const AreaChartCoponent = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart
                width={500}
                height={300}
                data={productSales}
            >
                <YAxis />
                <XAxis dataKey="name" />
                <CartesianGrid strokeDasharray="5 5" />

                <Tooltip content={<CustomTooltip />} />
                <Legend />

                <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#c42f2f"
                    fill="#c42f2f"
                    stackId="1"
                />

                <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#44ab6a"
                    fill="#44ab6a"
                    stackId="1"
                />
            </AreaChart>
        </ResponsiveContainer>
    )
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
                <p className="text-medium text-lg">{label}</p>
                <p className="text-sm text-red-400">
                    expenses:
                    <span className="ml-2">Rs.{payload[0].value}</span>
                </p>
                <p className="text-sm text-teal-400">
                    income:
                    <span className="ml-2">Rs.{payload[1].value}</span>
                </p>
            </div>
        )
    }
};

export default AreaChartCoponent;