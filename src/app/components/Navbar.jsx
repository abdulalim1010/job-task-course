"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import logoimage from "../../../src/assets/logo.png"
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
                    src={logoimage}
                    alt="Online Course"
                    className="w-8 h-8"
                    priority
                  />
          <span className="text-xl font-bold text-gray-800">
            JobTaskCourse
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/jobs" className="hover:text-blue-600 transition">
            Jobs
          </Link>
          <Link href="/tasks" className="hover:text-blue-600 transition">
            Tasks
          </Link>
          <Link href="/courses" className="hover:text-blue-600 transition">
            Courses
          </Link>

          <Link
            href="/join"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Join Now
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-800"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-6 py-4 flex flex-col gap-4">
            <Link
              href="/jobs"
              className="hover:text-blue-600 transition"
              onClick={() => setOpen(false)}
            >
              Jobs
            </Link>
            <Link
              href="/tasks"
              className="hover:text-blue-600 transition"
              onClick={() => setOpen(false)}
            >
              Tasks
            </Link>
            <Link
              href="/courses"
              className="hover:text-blue-600 transition"
              onClick={() => setOpen(false)}
            >
              Courses
            </Link>

            <Link
              href="/join"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-center transition"
              onClick={() => setOpen(false)}
            >
              Join Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
