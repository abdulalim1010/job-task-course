"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function JobPage() {
  const router = useRouter();

  const handleApply = () => {
    router.push("/auth/login"); // লগইনে পাঠাবে
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-10">

      {/* Top Large Image */}
      <div className="w-full max-w-4xl mb-10">
        <Image
          src="/job.jfif"   // 🚀 PUBLIC FOLDER IMAGE
          alt="Job Banner"
          width={1600}
          height={900}
          className="rounded-2xl shadow-lg w-full"
        />
      </div>

      {/* Job Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-3xl w-full border">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🚀 Frontend Developer (React / Next.js)
        </h1>

        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          We are looking for a passionate Frontend Developer with experience
          in React & Next.js. If you enjoy building clean, modern interfaces
          and want to join a fast-growing tech team, this role is perfect for you.
        </p>

        <div className="space-y-2 text-gray-800 mb-6">
          <p>📌 <b>Job Type:</b> Full-time</p>
          <p>📍 <b>Location:</b> Remote</p>
          <p>💰 <b>Salary:</b> 35k – 90k BDT</p>
          <p>🕒 <b>Experience:</b> 1+ Years (Freshers can apply)</p>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApply}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl text-lg
                     hover:bg-blue-700 transition-all duration-200 shadow-md"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
