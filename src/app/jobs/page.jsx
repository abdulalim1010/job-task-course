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

      {/* ================= HERO ================= */}
      <div className="relative w-full h-[420px]">
        <Image
          src="/job.jfif"
          alt="Career Opportunity"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-6 text-white">
            <span className="inline-block mb-4 px-4 py-1 text-sm bg-blue-600 rounded-full">
              Now Hiring
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frontend Developer <br /> (React / Next.js)
            </h1>

            <p className="text-lg text-gray-200 max-w-2xl">
              Join our team and build modern, scalable web applications used by thousands.
            </p>
          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-12">

          {/* Job Description */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
            <p className="text-gray-700 mb-6">
              We are looking for a Frontend Developer who loves building clean,
              high-performance user interfaces using React and Next.js.
            </p>

            <h3 className="text-xl font-semibold mb-3">Responsibilities</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Develop UI using React & Next.js</li>
              <li>Collaborate with designers & backend developers</li>
              <li>Optimize applications for performance</li>
              <li>Maintain clean and reusable code</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">Requirements</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>1+ year experience with React</li>
              <li>Basic Next.js knowledge</li>
              <li>Tailwind CSS experience</li>
              <li>Freshers with strong skills can apply</li>
            </ul>
          </section>

          {/* Why Work With Us */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Why Work With Us?</h2>
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <p>✔ Friendly & supportive team culture</p>
              <p>✔ Remote-friendly environment</p>
              <p>✔ Career growth & learning opportunities</p>
              <p>✔ Real-world production projects</p>
            </div>
          </section>

          {/* Tech Stack */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Our Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {["React", "Next.js", "Tailwind CSS", "Node.js", "MongoDB", "Git"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </section>

          {/* Hiring Process */}
          <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Hiring Process</h2>
            <ol className="space-y-3 text-gray-700 list-decimal pl-6">
              <li>Submit your application</li>
              <li>Initial screening call</li>
              <li>Technical interview</li>
              <li>Final HR discussion</li>
            </ol>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24">
          <h3 className="text-xl font-semibold mb-4">Job Overview</h3>

          <div className="space-y-3 text-gray-700 text-sm mb-6">
            <p><b>Job Type:</b> Full-time</p>
            <p><b>Location:</b> Remote</p>
            <p><b>Salary:</b> 35k – 90k BDT</p>
            <p><b>Experience:</b> 1+ Years</p>
          </div>

          <button
            onClick={handleApply}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl
                       hover:bg-blue-700 transition shadow-md"
          >
            Apply Now
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Login required to apply
          </p>
        </aside>
      </div>

      {/* ================= FINAL CTA ================= */}
      <div className="bg-blue-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to take the next step in your career?
        </h2>
        <p className="mb-6 text-blue-100">
          Apply today and become part of our growing team.
        </p>
        <button
          onClick={handleApply}
          className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
