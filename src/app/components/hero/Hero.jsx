"use client";

import Image from "next/image";
import heroImg from "../../../assets/png.png"; // <-- your image path

export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16 md:py-24 gap-10 bg-white">
      
      {/* Left Content */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
          Learn New Skills With Our  
          <span className="text-blue-600"> Online Courses</span>
        </h1>

        <p className="text-gray-600 mt-4 md:text-lg">
          Upgrade your knowledge and build your career with structured, high-quality online courses created by top instructors.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            Explore Now
          </button>

          <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
            Enroll Now
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src={heroImg}
          alt="Online Course"
          className="w-full max-w-md md:max-w-lg"
          priority
        />
      </div>
    </section>
  );
}
