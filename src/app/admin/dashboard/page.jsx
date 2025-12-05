"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home, BookOpen, CheckSquare, LogOut, Users } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/auth/login");

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (!payload.isAdmin) {
        // Not an admin → logout
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return router.push("/auth/login");
      }
      setAdmin({ email: payload.email });
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/auth/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  if (!admin) return <p className="p-8">Loading...</p>;

  const navLinks = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/admin/dashboard" },
    { name: "Manage Courses", icon: <BookOpen size={18} />, path: "/admin/courses" },
    { name: "Enrollments", icon: <Users size={18} />, path: "/admin/enrollments" },
    { name: "Assignments", icon: <CheckSquare size={18} />, path: "/admin/assignments" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 mt-20">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className={`${sidebarOpen ? "text-xl font-bold" : "hidden"}`}>
            Admin Panel
          </span>
          <button
            className="p-1 hover:bg-gray-200 rounded"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "«" : "»"}
          </button>
        </div>

        <nav className="mt-4 flex flex-col gap-2">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="flex items-center gap-2 p-3 hover:bg-gray-200 transition rounded"
            >
              {item.icon}
              <span className={`${sidebarOpen ? "inline" : "hidden"}`}>
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Welcome, {admin.name}</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            <LogOut size={16} /> Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="p-6 overflow-auto flex-1">
          <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
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
        </main>
      </div>
    </div>
  );
}
