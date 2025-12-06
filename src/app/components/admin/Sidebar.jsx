"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, BookOpen, CheckSquare, LogOut, Users } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  const navLinks = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/admin/dashboard" },
    { name: "Manage Courses", icon: <BookOpen size={18} />, path: "/admin/courses" },
    { name: "Enrollments", icon: <Users size={18} />, path: "/admin/enrollments" },
    { name: "Assignments", icon: <CheckSquare size={18} />, path: "/admin/assignments" },
  ];

  return (
    <aside
      className={`bg-white shadow-md transition-all duration-300 ${
        open ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <span className={`${open ? "text-xl font-bold" : "hidden"}`}>
          Admin Panel
        </span>
        <button
          className="p-1 hover:bg-gray-200 rounded"
          onClick={() => setOpen(!open)}
        >
          {open ? "«" : "»"}
        </button>
      </div>

      <nav className="mt-4 flex flex-col gap-2">
        {navLinks.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-2 p-3 transition rounded
              ${
                pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }
            `}
          >
            {item.icon}
            <span className={`${open ? "inline" : "hidden"}`}>
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-5 w-full px-4">
        <button
          onClick={logout}
          className="flex items-center px-14 gap-2 bg-red-500 text-white p-3 rounded hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          <span className={`${open ? "inline" : "hidden"}`}>
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}
