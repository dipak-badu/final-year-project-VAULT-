export default function Header() {
  return (
    <header
      className="bg-slate-950/90 w-full px-8 py-4 fixed top-0 left-0 z-50"
      style={{ boxShadow: "0 6px 12px rgba(0,0,0,0.6)" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="img/logo.png"
            alt="Expense Tracker Logo"
            className="h-10 w-20"
          />
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          <a
            href="#features"
            className="text-gray-300 hover:text-white transition"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-gray-300 hover:text-white transition"
          >
            Pricing
          </a>
          <a
            href="#about"
            className="text-gray-300 hover:text-white transition"
          >
            About
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-gray-300 hover:text-white transition font-medium">
            Login
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
