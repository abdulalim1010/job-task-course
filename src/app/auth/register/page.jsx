"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Call registration API
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Registration failed.");
        return;
      }

      // Clear old user info
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Store new user info & JWT token
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      setForm({ name: "", email: "", password: "" });
      setMessage("Registration successful! Redirecting...");

      // Redirect to student dashboard
      setTimeout(() => router.push("/student/dashboard"), 1000);

    } catch (err) {
      console.error(err);
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Student Registration</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
