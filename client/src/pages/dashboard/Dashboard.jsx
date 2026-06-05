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
import Sidebar from "../../component/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-black text-white md:block">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
