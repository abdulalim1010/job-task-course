"use client";

import CourseCard from "./CourseCard";



export default function CoursesSection() {
  const courses = [
    {
      title: "Full Stack Web Development",
      level: "Beginner",
      duration: "3 Months",
      image: "https://i.ibb.co.com/MkBDNHxV/d.jpg",
    },
    {
      title: "Data Science with Python",
      level: "Intermediate",
      duration: "2 Months",
      image: "https://i.ibb.co.com/kVJGM16T/data.jpg",
    },
    {
      title: "Digital Marketing Mastery",
      level: "Beginner",
      duration: "1.5 Months",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Popular Courses
          </h2>
          <p className="text-gray-600 mt-3">
            Choose your course and start learning today.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((c, i) => (
            <CourseCard key={i} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
