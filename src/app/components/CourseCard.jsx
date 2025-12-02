"use client";

import PropTypes from "prop-types";

export default function CourseCard({ title, image, level, duration }) {
  return (
    <div className="group bg-white rounded-2xl shadow-md p-5 border hover:shadow-xl transition-all duration-300 cursor-pointer">
      {/* Image */}
      <div className="overflow-hidden rounded-xl mb-4">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-44 object-cover group-hover:scale-110 transition duration-300"
        />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

      <div className="flex items-center justify-between text-gray-600 mb-4">
        <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          {level}
        </span>
        <span className="text-sm">{duration}</span>
      </div>

      <button
        onClick={() =>
          window.location.href = `/courses/${title.replace(/\s+/g, "-").toLowerCase()}`
        }
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
      >
        Explore Course
      </button>
    </div>
  );
}

CourseCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
};
