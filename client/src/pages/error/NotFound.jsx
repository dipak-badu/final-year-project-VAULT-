import { NavLink, useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
                <div className='flex p-4 items-center justify-center gap-0 mb-4'>
                    <h1 className="text-6xl font-bold">404</h1>
                    <div className='text-7xl '>😴</div>
                </div>
                <p className="text-xl mb-8">Page Not Found</p>
                <button
                    onClick={
                        () => navigate(-1)
                    }
                    className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                >
                    Go Back
                </button>

            </div>
        </>
    )
}