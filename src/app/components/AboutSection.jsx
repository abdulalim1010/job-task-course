"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Import your images here
import imgLeft from "../../assets/center.jpg";
import imgCenter from "../../assets/left.jpg";
import icon from "../../assets/icon.svg";

export default function AboutSection() {
  return (
    <div className="w-full bg-[#F4F6FA] py-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* ================= Left Images ================= */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative flex items-center justify-center"
        >
          {/* Big Circle images */}
          <div className="relative w-[350px] h-[350px] rounded-full overflow-hidden shadow-xl">
            <Image src={imgLeft} alt="Students" fill className="object-cover" />
          </div>

          <div className="absolute right-[-40px] top-20 w-[280px] h-[280px] rounded-full border-[10px] border-white shadow-xl overflow-hidden">
            <Image src={imgCenter} alt="Student" fill className="object-cover" />
          </div>

          {/* Floating Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-10 left-20 bg-white p-5 rounded-2xl shadow-md text-center"
          >
            <div className="w-14 h-14 mx-auto">
              <Image src={icon} alt="icon" className="w-full h-full object-contain" />
            </div>
            <p className="font-semibold mt-2">Experience Advisor</p>
          </motion.div>
        </motion.div>

        {/* ================= Right Text ================= */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h4 className="text-blue-600 font-semibold uppercase text-sm mb-2">
            About Our Edplus
          </h4>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            We create unique digital media <br /> experiences.
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            At University Edplus, we are driven by the transformative power of
            education and the limitless potential within each individual. Founded
            in 1971, we remain committed to nurturing curiosity and academic excellence.
          </p>

          {/* Checklist Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              "Best Instructors & Courses",
              "Online Courses",
              "Trusted by Students",
              "Live Classes",
              "100% ISO Certified",
              "24 Hours Support",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm border"
              >
                <span className="text-blue-600 text-lg">✔</span>
                <p className="text-gray-700 text-sm font-medium">{item}</p>
              </motion.div>
            ))}
          </div>

          <button className="mt-3 bg-blue-600 text-white px-7 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
            View All Program →
          </button>
        </motion.div>
      </div>

      {/* ================= Bottom Stats Section ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto mt-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
      >
        {[
          { number: "118K", label: "Our Happy Students" },
          { number: "25K", label: "Enrolled Learners" },
          { number: "120K", label: "Expert Instructors" },
          { number: "96%", label: "Satisfaction Rate" },
        ].map((stat, index) => (
          <div key={index}>
            <p className="text-4xl font-bold">{stat.number}</p>
            <p className="mt-1 text-sm opacity-90">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
