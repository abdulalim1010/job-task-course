// Inside StudentDashboard.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      router.push("/auth/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    async function fetchEnrollments() {
      try {
        const res = await fetch(`/api/student/enrollments?studentId=${parsedUser._id}`, {
          headers: { "Authorization": `Bearer ${token}` } // optional, if your API checks JWT
        });

        if (!res.ok) {
          throw new Error("Failed to fetch enrollments");
        }

        const data = await res.json();
        setCourses(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchEnrollments();
  }, [router]);

  if (loading) return <p className="text-center mt-20 text-lg">Loading...</p>;
  if (!courses.length) return <p className="text-center mt-20 text-lg">No courses enrolled.</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-8">My Courses</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white rounded-2xl shadow-md p-5 border hover:shadow-xl transition">
            <div className="overflow-hidden rounded-xl mb-4">
              <img src={course.image} alt={course.title} className="w-full h-44 object-cover group-hover:scale-105 transition duration-300"/>
            </div>
            <h3 className="text-xl font-bold mb-2 line-clamp-2">{course.title}</h3>
            <p className="text-gray-500 text-sm capitalize mb-2">{course.category}</p>

            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700">Progress: {course.progress || 0}%</p>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${course.progress || 0}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={() => router.push(`/courses/${course._id}`)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            >
              View Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
