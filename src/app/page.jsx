import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 px-4">
      <div className="bg-white/80 shadow-xl rounded-xl p-10 max-w-lg w-full text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-4">
          Welcome to the E-Agri Bank Portal
        </h1>
        <p className="text-gray-700 mb-8">
          This is the home page of the E-Agri Bank Portal. You can navigate to different sections.
        </p>
        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full py-3 px-6 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
          >
            Go to Login Page
          </Link>
          <Link
            href="/loan-applications"
            className="block w-full py-3 px-6 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Go to Loan Applications
          </Link>
          <Link
            href="/loan-approvals"
            className="block w-full py-3 px-6 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition"
          >
            Go to Loan Approvals
          </Link>
        </div>
      </div>
    </div>
  );
}
