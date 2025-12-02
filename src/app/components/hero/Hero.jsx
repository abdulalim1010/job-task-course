"use client";

import Image from "next/image";
import heroImg from "../../../assets/png.png";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { motion } from "framer-motion";

export default function HeroSection() {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16 md:py-24 gap-10 overflow-hidden">
      
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-gradientBG"></div>
      
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
            },
            modes: {
              repulse: { distance: 150, duration: 0.4 },
              push: { quantity: 4 },
            },
          },
          particles: {
            color: { value: "#ffffff" },
            links: {
              enable: true,
              distance: 120,
              color: "#ffffff",
              opacity: 0.3,
              width: 1,
            },
            collisions: { enable: true },
            move: {
              enable: true,
              speed: 2,
              outModes: { default: "out" },
            },
            number: { value: 60, density: { enable: true, area: 800 } },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 2, max: 5 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 -z-10"
      />

      {/* Left Content */}
      <div className="w-full md:w-1/2 text-center md:text-left z-10">
        <motion.h1
          className="text-4xl md:text-5xl font-bold leading-tight text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Learn New Skills With Our{" "}
          <span className="text-yellow-300">Online Courses</span>
        </motion.h1>

        <motion.p
          className="text-white mt-4 md:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Upgrade your knowledge and build your career with structured, high-quality online courses.
        </motion.p>

        <motion.div
          className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg font-semibold hover:bg-yellow-500 transition">
            Explore Now
          </button>
          <button className="px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition">
            Enroll Now
          </button>
        </motion.div>
      </div>

      {/* Right Image */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center z-10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Image
          src={heroImg}
          alt="Online Course"
          className="w-full max-w-md md:max-w-lg"
          priority
        />
      </motion.div>
    </section>
  );
}
