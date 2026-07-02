import AreaChart from "../../component/visualizer/AreaChart"

export default function Report() {
    return (
        <main className="flex flex-col min-h-screen p-4 sm:p-6 md:p-8 gap-10">
            <div className="grid lg:grid-cols-3 w-full gap-10 max-w-350">
                <GridItems title="Area Chart" className="lg:col-span-2">
                    <AreaChart />
                </GridItems>

                <GridItems title="Pie Chart">

                </GridItems>
            </div>
        </main>
    )
}

function GridItems({ title, className, children }) {
    return (
        <div className={`flex flex-col items-center justify-center p-4 border border-white/10 rounded-lg bg-[#16161d] h-100 ${className}`}>
            <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
            <div className="w-full">{children}</div>
        </div>
    )
}