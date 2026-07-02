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
        income: 4000,
        expenses: 2400,
    },
    {
        name: 'Feb',
        income: 3000,
        expenses: 1398,
    },
    {
        name: 'Mar',
        income: 2000,
        expenses: 9800,
    },
    {
        name: 'Apr',
        income: 2780,
        expenses: 3908,
    },
    {
        name: 'May',
        income: 1890,
        expenses: 4800,
    },
    {
        name: 'Jun',
        income: 2390,
        expenses: 5800,
    },
    {
        name: 'Jul',
        income: 3490,
        expenses: 4300,
    },
    {
        name: 'Aug',
        income: 3890,
        expenses: 13000,
    },
    {
        name: 'Sep',
        income: 4990,
        expenses: 4400,
    },
    {
        name: 'Oct',
        income: 5090,
        expenses: 5000,
    },
    {
        name: 'Nov',
        income: 5490,
        expenses: 9000,
    },
    {
        name: 'Dec',
        income: 6790,
        expenses: 8300,
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
                    dataKey="income"
                    stroke="#44ab6a"
                    fill="#44ab6a"
                    stackId="1"
                />

                <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#c42f2f"
                    fill="#c42f2f"
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
                <p className="text-sm text-teal-400">
                    Income:
                    <span className="ml-2">Rs.{payload[0].value}</span>
                </p>
                <p className="text-sm text-red-400">
                    Expenses:
                    <span className="ml-2">Rs.{payload[1].value}</span>
                </p>
            </div>
        )
    }
};

export default AreaChartCoponent;