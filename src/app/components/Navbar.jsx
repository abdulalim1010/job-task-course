"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Home, Briefcase, BookOpen, CheckSquare, LogOut } from "lucide-react";
import Image from "next/image";
import logoimage from "../../../src/assets/logoo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { name: "Home", icon: <Home size={18} />, path: "/" },
    { name: "Jobs", icon: <Briefcase size={18} />, path: "/jobs" },
    { name: "Tasks", icon: <CheckSquare size={18} />, path: "/tasks" },
    { name: "Courses", icon: <BookOpen size={18} />, path: "/courses" },
  ];

  // 🔥 FIXED USER LOADING (auto update)
  const loadUser = () => {
    try {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    } catch {
      setUser(null);
    }
  };

  // 🔥 Load user on mount + update whenever storage changes
  useEffect(() => {
    loadUser();

    const storageListener = () => loadUser();
    window.addEventListener("storage", storageListener);

    return () => window.removeEventListener("storage", storageListener);
  }, []);

  // 🔥 Listen for login/logout inside same tab (important)
  useEffect(() => {
    const interval = setInterval(() => {
      const storedUser = localStorage.getItem("user");
      const parsed = storedUser ? JSON.parse(storedUser) : null;

      if (!parsed && user) setUser(null);
      if (parsed && !user) setUser(parsed);
    }, 300);

    return () => clearInterval(interval);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null); // immediate toggle
    router.push("/auth/login");
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logoimage} alt="Logo" className="w-9 h-9" priority />
          <span className="text-xl font-bold text-gray-800">JobTaskCourse</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-1 text-gray-700 relative group transition ${
                pathname === item.path ? "text-blue-600 font-semibold" : "hover:text-blue-600"
              }`}
            >
              {item.icon}
              {item.name}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-blue-600 transition-all duration-300 ${
                  pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}

          {/* RIGHT SIDE AREA */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-gray-800 font-semibold">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-800">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md animate-slideDown">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 text-gray-700 text-lg transition ${
                  pathname === item.path ? "text-blue-600 font-semibold" : "hover:text-blue-600"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-800 font-semibold">{user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
