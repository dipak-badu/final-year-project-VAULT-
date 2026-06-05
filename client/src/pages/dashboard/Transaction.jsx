import {
    LayoutDashboard,
    ReceiptText,
    Wallet,
    BarChart3,
    Settings,
    CircleHelp,
    Plus,
    Search,
} from "lucide-react";

export default function Transaction() {
    return (
        <>
            <div className="flex-1 p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-4xl font-bold">Transactions</h2>

                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            className="bg-[#14141E] border border-gray-700 rounded-xl pl-10 pr-4 py-3 w-80 outline-none"
                        />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-[#14141E] rounded-2xl p-6 border border-gray-800">
                        <p className="text-sm text-gray-400">MONTH SPEND</p>
                        <h3 className="text-4xl font-bold mt-2">$12,482</h3>

                        <div className="mt-4 h-2 bg-gray-700 rounded-full">
                            <div className="h-full w-2/3 bg-indigo-400 rounded-full"></div>
                        </div>
                    </div>

                    <div className="bg-[#14141E] rounded-2xl p-6 border border-gray-800">
                        <p className="text-sm text-gray-400">MONTHLY INCOME</p>
                        <h3 className="text-4xl font-bold mt-2">$18,200</h3>
                        <p className="text-indigo-400 mt-3">On track for goal</p>
                    </div>

                    <div className="bg-[#14141E] rounded-2xl p-6 border border-gray-800 flex justify-between">
                        <div>
                            <p className="text-sm text-gray-400">CASHBACK EARNED</p>
                            <h3 className="text-4xl font-bold text-cyan-400 mt-2">
                                $412.90
                            </h3>
                        </div>

                        <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                            🏆
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <button className="bg-indigo-400 text-black px-5 py-2 rounded-xl">
                        All
                    </button>

                    <button className="bg-[#14141E] border border-gray-700 px-5 py-2 rounded-xl">
                        Categories
                    </button>

                    <button className="bg-[#14141E] border border-gray-700 px-5 py-2 rounded-xl">
                        Date Range
                    </button>

                    <button className="bg-[#14141E] border border-gray-700 px-5 py-2 rounded-xl">
                        Status
                    </button>
                </div>

                {/* Transactions List */}
                <div className="bg-[#14141E] rounded-2xl border border-gray-800 overflow-hidden">
                    {[
                        {
                            title: "Apple Store",
                            category: "Hardware & Technology",
                            amount: "-$1,299",
                            negative: true,
                        },
                        {
                            title: "Le Bernardin",
                            category: "Dining & Entertainment",
                            amount: "-$450.20",
                            negative: true,
                        },
                        {
                            title: "Inbound Wire Transfer",
                            category: "Payroll & Income",
                            amount: "+$8,500",
                            negative: false,
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center p-6 border-b border-gray-800"
                        >
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gray-800"></div>

                                <div>
                                    <h4 className="font-semibold text-lg">{item.title}</h4>
                                    <p className="text-sm text-gray-400">{item.category}</p>
                                </div>
                            </div>

                            <p
                                className={`text-2xl font-bold ${item.negative
                                    ? "text-red-400"
                                    : "text-cyan-400"
                                    }`}
                            >
                                {item.amount}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}