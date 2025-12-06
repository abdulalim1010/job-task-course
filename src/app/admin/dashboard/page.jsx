"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/auth/login");

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (!payload.isAdmin) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return router.push("/auth/login");
      }
      setAdmin({ email: payload.email });
    } catch {
      router.push("/auth/login");
    }
  }, [router]);

  if (!admin) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/admin/courses"
          className="bg-blue-600 text-white p-6 rounded-xl shadow hover:bg-blue-700 transition"
        >
          Manage Courses
        </Link>

        <Link
          href="/admin/enrollments"
          className="bg-green-600 text-white p-6 rounded-xl shadow hover:bg-green-700 transition"
        >
          View Enrollments
        </Link>

        <Link
          href="/admin/assignments"
          className="bg-yellow-600 text-white p-6 rounded-xl shadow hover:bg-yellow-700 transition"
        >
          Review Assignments
        </Link>
      </div>
    </div>
  );
}
