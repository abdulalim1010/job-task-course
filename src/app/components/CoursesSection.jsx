"use client";

import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

export default function CoursesSection() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/courses?search=${search}&category=${category}&sort=${sort}&page=${page}&limit=6`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error("Failed to load courses");
        }

        const data = await res.json();

        setCourses(data.courses || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Fetch error:", error);
        setCourses([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, [search, category, sort, page]);

  return (
    <section className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Explore Our Courses
          </h2>
          <p className="text-gray-600 mt-4 md:text-lg">
            Search, filter, and sort courses easily.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="border rounded-lg px-4 py-2 w-full"
          />

          <select
            className="border px-4 py-2 rounded-lg"
            value={category}
            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}
          >
            <option value="">All Categories</option>
            <option value="web">Web Development</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
          </select>

          <select
            className="border px-4 py-2 rounded-lg"
            value={sort}
            onChange={(e) => {
              setPage(1);
              setSort(e.target.value);
            }}
          >
            <option value="">Sort</option>
            <option value="price_low">Price: Low → High</option>
            <option value="price_high">Price: High → Low</option>
          </select>
        </div>

        {/* Courses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
            <p className="text-center col-span-full text-gray-500">
              Loading courses...
            </p>
          ) : courses.length > 0 ? (
            courses.map((course) => (
              <CourseCard key={course._id} {...course} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No courses found.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>

          <span className="font-semibold">
            Page {page} / {totalPages}
          </span>

          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>

      </div>
    </section>
  );
}
