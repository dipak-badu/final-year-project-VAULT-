import {
    LayoutDashboard,
    ReceiptText,
    Wallet,
    BarChart3,
    Settings,
    CircleHelp,
    Plus,
    CircleUserRound
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ mobile = false }) {
    const navItems = [
        {
            name: "Overview",
            icon: LayoutDashboard,
            path: "/user",
        },
        {
            name: "Transactions",
            icon: ReceiptText,
            path: "/user/transactions",
        },
        {
            name: "Budgets",
            icon: Wallet,
            path: "/user/budgets",
        },
        {
            name: "Reports",
            icon: BarChart3,
            path: "/user/reports",
        },
    ];

    // Mobile Bottom Navigation
    if (mobile) {
        return (
            <nav className="w-full bg-[#111118] border-t border-gray-800">
                <ul className="relative flex items-center justify-around px-2 py-3">
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex flex-col items-center gap-1 text-xs transition ${isActive
                                            ? "text-indigo-400"
                                            : "text-gray-400 hover:text-white"
                                        }`
                                    }
                                >
                                    <Icon size={20} />
                                    <span>{item.name}</span>
                                </NavLink>
                            </li>
                        );
                    })}

                    <li>
                        <NavLink
                            to="/user/new-transaction"
                            className="absolute right-4 -top-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-lg"
                        >
                            <Plus size={24} />
                        </NavLink>
                    </li>
                </ul>
            </nav>
        );
    }

    // Desktop Sidebar
    return (
        <aside className="flex h-screen w-64 flex-col bg-[#111118] border-r border-gray-800">
            <div className="p-6">
                <h1 className="text-3xl font-bold text-indigo-400">VAULT</h1>
                <p className="text-xs tracking-widest text-gray-500">
                    PREMIUM FINANCE
                </p>
            </div>

            <nav className="flex-1 px-4">
                <ul className="space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 rounded-lg p-3 transition ${isActive
                                            ? "bg-indigo-500/20 border-r-4 border-indigo-400"
                                            : "hover:bg-gray-800"
                                        }`
                                    }
                                >
                                    <Icon size={18} />
                                    {item.name}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>

                <NavLink
                    to="/user/new-transaction"
                    className="mt-10 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-medium hover:bg-blue-700"
                >
                    <Plus size={18} />
                    New Transaction
                </NavLink>
            </nav>

            <div className="border-t border-gray-800 p-4">
                <NavLink
                    to="/user/settings"
                    className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-800"
                >
                    <Settings size={18} />
                    Settings
                </NavLink>

                <NavLink
                    to="/user/support"
                    className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-800"
                >
                    <CircleHelp size={18} />
                    Support
                </NavLink>

                <NavLink
                    to=""
                    className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-800"
                >
                    <CircleUserRound size={18} />
                    John Doe
                </NavLink>
            </div>
        </aside>
    );
}