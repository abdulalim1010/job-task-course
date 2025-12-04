"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`/api/courses/${id}`);
        const data = await res.json();
        setCourse(data.error ? null : data);
      } catch (err) {
        console.error(err);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [id]);

  const handleEnroll = () => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/auth/login");
    else router.push(`/courses/${id}/payment`);
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-500 text-lg">Loading...</p>;
  if (!course)
    return <p className="text-center mt-20 text-red-500 text-lg">Course not found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Image */}
        <div className="lg:w-1/2 flex-shrink-0">
          <img
            src={course.image || "/placeholder-course.jpg"}
            alt={course.title}
            className="w-full h-full rounded-xl object-cover shadow-lg"
          />
        </div>

        {/* Right: Details */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-gray-900">{course.title}</h1>

          {/* Category + Level */}
          <div className="flex flex-wrap gap-3">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full capitalize">
              {course.category}
            </span>
            <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full capitalize">
              {course.level}
            </span>
          </div>

          {/* Price */}
          <p className="text-3xl font-bold text-gray-900">
            Price: <span className="text-blue-600">${course.price}</span>
          </p>

          {/* Description */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{course.description}</p>
          </div>

          {/* Instructor */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-3">Instructor</h2>
            <p className="text-gray-700">{course.instructor}</p>
          </div>

          {/* Syllabus */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-3">Syllabus</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {course.syllabus?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Enroll Button */}
          <button
            onClick={handleEnroll}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}
