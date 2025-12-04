"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login"); // protect route
      return;
    }

    async function fetchCourses() {
      const res = await fetch("/api/student/enrolled", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCourses(data.courses || []);
      setLoading(false);
    }

    fetchCourses();
  }, [router]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!courses.length) return <p className="text-center mt-10">No enrolled courses yet.</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-10">My Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex items-center justify-between mb-4">
              <span>Progress: {course.progress || 0}%</span>
              <div className="w-32 bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${course.progress || 0}%` }}
                />
              </div>
            </div>
            <button
              onClick={() => router.push(`/student/course/${course._id}`)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              Go to Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
