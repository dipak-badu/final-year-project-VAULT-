import {
  LayoutDashboard,
  ReceiptText,
  Wallet,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  CircleUserRound,
  Menu,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuth";

export default function Sidebar({ mobile = false }) {
  const { authUser, logout } = useAuth();
  const navItems = [
    {
      name: "Transactions",
      icon: ReceiptText,
      path: ".",
    },
    {
      name: "Budgets",
      icon: Wallet,
      path: "budgets",
    },
    {
      name: "Reports",
      icon: BarChart3,
      path: "reports",
    },
  ];

  // State to manage the open/close state of the user profile dropdown
  const [open, setOpen] = useState(false);

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
                    `flex flex-col items-center gap-1 text-xs transition ${
                      isActive
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
            {/* // User Profile Dropdown */}
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-400 hover:text-white active:"
            >
              <Menu />
            </button>

            {open && (
              <div className="flex flex-col absolute bottom-16 right-4 w-48 rounded-lg bg-[#111118] border border-gray-800">
                <NavLink
                  to="profile"
                  className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-800 min-w-0 break-all"
                >
                  <CircleUserRound size={18} className="shrink-0" />
                  <span>{authUser?.email || "Profile"}</span>
                </NavLink>

                <NavLink
                  to="settings"
                  className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-800"
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </NavLink>

                <button
                  className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-800"
                  onClick={logout}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}

            {/* // New Transaction Button */}
            <NavLink
              to="new-transaction"
              className="absolute right-4 -top-15 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-lg"
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
        <p className="text-xs tracking-widest text-gray-500">PREMIUM FINANCE</p>
      </div>

      <nav className="flex-1 flex-col justify-between px-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg p-3 transition ${
                      isActive
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

        <div className="mt-4">
          <NavLink
            to="new-transaction"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-medium hover:bg-blue-700"
          >
            <Plus size={18} />
            New Transaction
          </NavLink>
        </div>
      </nav>

      <div className="border-t mt-5 border-gray-800 p-4">
        <NavLink
          to="settings"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-800"
        >
          <Settings size={18} />
          Settings
        </NavLink>

        <NavLink
          to="profile"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-800 min-w-0 break-all"
        >
          <CircleUserRound size={18} className="shrink-0" />
          {authUser?.email || "Profile"}
        </NavLink>

        <NavLink
          to="logout"
          className="flex items-center gap-3 rounded-lg p-3 hover:bg-gray-800"
          onClick={logout}
        >
          <LogOut size={18} />
          Logout
        </NavLink>
      </div>
    </aside>
  );
}
