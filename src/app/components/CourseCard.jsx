"use client";

import { useRouter } from "next/navigation";

export default function CourseCard({
  _id,
  title,
  image,
  level,
  duration,
  price,
  category
}) {
  const router = useRouter();

  // Fallback image
  const imgSrc = image || "/placeholder-course.jpg";

  // Slug from title
  const slug = title?.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="group bg-white rounded-2xl shadow-md p-5 border hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => router.push(`/courses/${_id}`)}
    >
      {/* IMAGE */}
      <div className="overflow-hidden rounded-xl mb-4">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-44 object-cover group-hover:scale-110 transition duration-300"
        />
      </div>

      {/* TITLE */}
      <h3 className="text-xl font-bold mb-2  line-clamp-2">{title}</h3>

      {/* CATEGORY */}
      <p className="text-gray-500 text-sm capitalize">{category}</p>

      {/* LEVEL + DURATION */}
      <div className="flex items-center justify-between mt-2 mb-4">
        <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          {level}
        </span>
        <span className="text-sm">{duration}</span>
      </div>

      {/* PRICE */}
      <p className="text-lg font-bold mb-4">${price}</p>

      {/* BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/courses/${_id}`);
        }}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
      >
        vew Details
      </button>
    </div>
  );
}
