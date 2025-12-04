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

        setCourse(data.course || null);
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [id]);

  const handleEnroll = () => {
    const isLoggedIn = localStorage.getItem("token"); // modify based on your auth system

    if (!isLoggedIn) {
      router.push("/auth/login");
    } else {
      router.push(`/courses/${id}/payment`);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!course) return <p className="text-center mt-10">Course not found.</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-4">{course.title}</h1>

      {/* Category + Level */}
      <div className="flex items-center gap-4 text-gray-600 mb-6">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full capitalize">
          {course.category}
        </span>
        <span className="bg-gray-200 px-3 py-1 rounded-full capitalize">
          {course.level}
        </span>
      </div>

      {/* Image */}
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-80 object-cover rounded-xl mb-8"
      />

      {/* Price */}
      <p className="text-3xl font-bold text-gray-900 mb-6">
        Price: <span className="text-blue-600">${course.price}</span>
      </p>

      {/* Description */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-3">Description</h2>
        <p className="text-gray-700 leading-relaxed">{course.description}</p>
      </div>

      {/* Instructor */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-3">Instructor</h2>
        <p className="text-gray-700">{course.instructor}</p>
      </div>

      {/* Syllabus */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-3">Syllabus</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          {course.syllabus?.map((item, index) => (
            <li key={index}>{item}</li>
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
  );
}
