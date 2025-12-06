"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, LayoutDashboard, LogOut, User } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runAuthCheck = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!token || !storedUser) {
        localStorage.clear();
        router.replace("/auth/login");
        return;
      }

      let payload;
      try {
        payload = JSON.parse(atob(token.split(".")[1]));
      } catch {
        localStorage.clear();
        router.replace("/auth/login");
        return;
      }

      // PREMIUM CHECK — stop loop
      if (!payload.isPremium) {
        if (window.location.pathname !== "/premium-required") {
          router.replace("/premium-required");
        }
        return; // Stop execution to avoid loop
      }

      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Load courses only when premium user
      try {
        const res = await fetch(
          `/api/student/enrollments?studentId=${parsedUser._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setCourses(data || []);
        } else {
          console.error("Failed to load courses");
        }
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    runAuthCheck();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.replace("/auth/login");
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="flex min-h-screen mt-32">
      <aside className="w-64 bg-gray-900 text-white p-5 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Student Panel</h2>

        <nav className="flex flex-col gap-3">
          <Link
            href="/student/dashboard"
            className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-md"
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>

          <Link
            href="/student/profile"
            className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-md"
          >
            <User size={18} /> Profile
          </Link>

          <Link
            href="/student/courses"
            className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-md"
          >
            <BookOpen size={18} /> My Courses
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 p-2 mt-6 bg-red-600 hover:bg-red-700 rounded-md"
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold mb-3">Hello, {user?.name}</h1>
        <p className="text-gray-700 mb-6">Welcome to your student dashboard!</p>

        <h2 className="text-2xl font-semibold mb-4">Your Enrolled Courses</h2>

        {courses.length === 0 && (
          <p className="text-gray-600">You have not enrolled in any course yet.</p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white shadow-md p-5 rounded-lg border hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold">{course.courseTitle}</h3>
              <p className="text-gray-600 mt-2 text-sm">{course.description}</p>

              <Link
                href={`/courses/${course.courseId}`}
                className="inline-block mt-4 text-blue-600 font-medium hover:underline"
              >
                View Course →
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
