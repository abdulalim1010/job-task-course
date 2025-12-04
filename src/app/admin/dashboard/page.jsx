"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) router.push("/auth/admin-login");
    else setAdmin({ email: "admin@example.com" }); // Optional: decode token to get admin info
  }, [router]);

  if (!admin) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="flex flex-col gap-4">
        <Link href="/admin/courses" className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
          Manage Courses
        </Link>
        <Link href="/admin/enrollments" className="bg-green-600 text-white p-3 rounded hover:bg-green-700">
          View Enrollments
        </Link>
        <Link href="/admin/assignments" className="bg-yellow-600 text-white p-3 rounded hover:bg-yellow-700">
          Review Assignments
        </Link>
      </div>
    </div>
  );
}
