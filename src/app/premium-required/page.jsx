"use client";

import { useRouter } from "next/navigation";

export default function PremiumRequired() {
  const router = useRouter();

  // Prevent unexpected rerender redirects
  if (typeof window !== "undefined" && window.location.pathname !== "/premium-required") {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        Premium Access Required
      </h1>

      <p className="text-gray-700 mb-6 text-center">
        You need to be a premium user to access this content. <br />
        Please contact admin or upgrade your account.
      </p>

      <button
        onClick={() => router.push("/auth/login")}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Login Again
      </button>
    </div>
  );
}
