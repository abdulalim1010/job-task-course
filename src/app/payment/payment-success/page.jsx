"use client";

import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Successful!</h1>
      <p className="text-gray-700 mb-6">Thank you for your payment.</p>
      <Link
        href="/student/dashboard"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
