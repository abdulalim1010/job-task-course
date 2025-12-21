"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function JobPage() {
  const router = useRouter();

  const handleApply = () => {
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ---------------- HERO SECTION ---------------- */}
      <div className="relative w-full h-[420px]">
        <Image
          src="/job.jfif"
          alt="Career at our company"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />

        {/* Text */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-6 text-white">
            <span className="inline-block mb-4 px-4 py-1 text-sm bg-blue-600 rounded-full">
              We’re Hiring
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Frontend Developer <br /> (React / Next.js)
            </h1>

            <p className="text-lg text-gray-200 max-w-2xl">
              Build modern, scalable interfaces used by thousands of users worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* ---------------- CONTENT ---------------- */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Job Description
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            We are looking for a skilled Frontend Developer with strong experience
            in React and Next.js. You will collaborate with designers and backend
            engineers to build high-quality web applications.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            Responsibilities
          </h3>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Develop user-facing features using React & Next.js</li>
            <li>Write clean, scalable, and maintainable code</li>
            <li>Collaborate with UI/UX designers</li>
            <li>Optimize applications for maximum performance</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            Requirements
          </h3>

          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>1+ year experience with React</li>
            <li>Basic understanding of Next.js</li>
            <li>Knowledge of Tailwind CSS</li>
            <li>Freshers with strong skills are welcome</li>
          </ul>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24">

          <h3 className="text-xl font-semibold mb-4 text-gray-900">
            Job Overview
          </h3>

          <div className="space-y-3 text-gray-700 text-sm mb-6">
            <p><b>Job Type:</b> Full-time</p>
            <p><b>Location:</b> Remote</p>
            <p><b>Salary:</b> 35k – 90k BDT</p>
            <p><b>Experience:</b> 1+ Years</p>
          </div>

          <button
            onClick={handleApply}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl
                       hover:bg-blue-700 transition-all duration-200 shadow-md"
          >
            Apply Now
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            You must be logged in to apply
          </p>
        </div>
      </div>
    </div>
  );
}
