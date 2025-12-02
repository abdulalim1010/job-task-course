"use client";

import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

export default function CoursesSection() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        // Ensure we get an array
        setCourses(Array.isArray(data) ? data : data.courses || []);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    }
    fetchCourses();
  }, []);

  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Explore Our Courses
          </h2>
          <p className="text-gray-600 mt-4 md:text-lg">
            Learn new skills and advance your career with our top-quality courses.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.length > 0 ? (
            courses.map((course, index) => <CourseCard key={index} {...course} />)
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No courses found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
