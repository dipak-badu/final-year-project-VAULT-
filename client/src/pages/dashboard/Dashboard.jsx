import Sidebar from "../../component/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="flex min-h-screen bg-black text-white">
            {/* Desktop Sidebar */}
            <div className="hidden md:block fixed top-0 left-0 w-64 h-screen bg-[#111118] border-r border-gray-800">
                <Sidebar />
            </div>

            {/* Main Content */}
            <main className="md:ml-64 flex-1 overflow-x-hidden p-4 sm:p-6 md:p-8 pb-24 md:pb-8">
                <Outlet />
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
                <Sidebar mobile />
            </div>
        </div>
    );
}
