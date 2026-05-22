export default function LandingPage() {
  return (
    <section className=" h-screen w-full">
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

      <main className="w-full min-h-screen bg-radial from-slate-800  to-black overflow-hidden">
        {/* Main Container */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 py-40">
          {/* Responsive Flex Layout */}
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16">
            {/* LEFT CONTENT */}
            <div className="flex flex-col gap-8 text-center lg:text-left max-w-xl">
              {/* Heading */}
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold text-gray-200 leading-tight">
                  Take Control of
                </h1>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-500 leading-tight">
                  Your Wealth
                </h1>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                A high quality financial service for managing your expenses with
                modern analytics and secure tracking.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 md:justify-center  md:items-center lg:justify-start">
                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium transition duration-300 shadow-lg w-full sm:w-auto cursor-pointer">
                  Open Account
                </button>

                <button className="text-white border border-slate-700 hover:border-slate-500 hover:bg-slate-900 px-8 py-3 rounded-lg font-medium transition duration-300 w-full sm:w-auto cursor-pointer">
                  View Platform →
                </button>
              </div>
            </div>

            {/* RIGHT IMAGE SECTION */}
            <div className="flex justify-center items-center w-full">
              <div className="relative group w-full max-w-[550px]">
                {/* Glow */}
                <div className="absolute rounded-3xl blur-3xl opacity-40 group-hover:opacity-60 transition duration-500"></div>

                {/* Image Container */}
                <div className="relative   rounded-3xl shadow-2xl">
                  <img
                    src="/img/HeroImage.png"
                    alt="Expense Tracker Hero"
                    className="w-full h-auto rounded-2xl object-cover"
                  />

                  {/* Floating Card */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-950/90 w-full px-8 py-4 fixed bottom-0 left-0 z-50 text-center text-gray-400 text-sm ">
        &copy; 2024 Expense Tracker. All rights reserved.
      </footer>
    </section>
  );
}
