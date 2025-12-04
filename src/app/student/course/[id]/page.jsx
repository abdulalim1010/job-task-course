"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CoursePlayer() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    async function fetchCourse() {
      const res = await fetch(`/api/student/course/${id}`);
      const data = await res.json();
      setCourse(data.course || null);
    }
    fetchCourse();
  }, [id]);

  const markComplete = async (lessonId) => {
    await fetch(`/api/student/course/${id}/lesson/${lessonId}/complete`, { method: "POST" });
    setCourse(prev => ({
      ...prev,
      lessons: prev.lessons.map(lesson => lesson._id === lessonId ? { ...lesson, completed: true } : lesson)
    }));
  };

  if (!course) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-6">{course.title}</h1>

      {course.lessons.map((lesson) => (
        <div key={lesson._id} className="mb-6 p-4 bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">{lesson.title}</h2>
          <div className="aspect-video mb-2">
            <iframe
              src={lesson.videoUrl}
              title={lesson.title}
              className="w-full h-full rounded-lg"
              frameBorder="0"
              allowFullScreen
            />
          </div>
          <button
            onClick={() => markComplete(lesson._id)}
            className={`py-2 px-4 rounded-lg font-semibold ${
              lesson.completed ? "bg-green-500 text-white" : "bg-blue-600 text-white"
            }`}
          >
            {lesson.completed ? "Completed" : "Mark as Completed"}
          </button>
        </div>
      ))}
    </div>
  );
}
