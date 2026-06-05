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
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <>
            {/* Sidebar */}
            <aside className="w-64 bg-[#111118] border-r border-gray-800 flex flex-col">
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-indigo-400">VAULT</h1>
                    <p className="text-xs text-gray-500 tracking-widest">
                        PREMIUM FINANCE
                    </p>
                </div>

                <nav className="flex-1 px-4">
                    <ul className="space-y-2">
                        <li>
                            <NavLink className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-800">
                                <LayoutDashboard size={18} />
                                Overview
                            </NavLink>
                        </li>

                        <li>
                            <NavLink className="flex items-center gap-3 w-full p-3 rounded-lg bg-indigo-500/20 border-r-4 border-indigo-400">
                                <ReceiptText size={18} />
                                Transactions
                            </NavLink>
                        </li>

                        <li>
                            <NavLink className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-800">
                                <Wallet size={18} />
                                Budgets
                            </NavLink>
                        </li>

                        <li>
                            <NavLink className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-800">
                                <BarChart3 size={18} />
                                Reports
                            </NavLink>
                        </li>
                    </ul>

                    <NavLink className="w-full mt-10 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium">
                        <Plus size={18} />
                        New Transaction
                    </NavLink>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <NavLink className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-800">
                        <Settings size={18} />
                        Settings
                    </NavLink>

                    <NavLink className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-gray-800">
                        <CircleHelp size={18} />
                        Support
                    </NavLink>
                </div>
            </aside>
        </>
    )
}