"use client";

import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Logo + About */}
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-3">EduMaster</h2>
          <p className="text-gray-400 leading-relaxed">
            Upgrade your skills with industry-expert courses.  
            Learn at your own pace and build your future.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            <a className="footerIcon"><FaFacebookF /></a>
            <a className="footerIcon"><FaInstagram /></a>
            <a className="footerIcon"><FaLinkedinIn /></a>
            <a className="footerIcon"><FaYoutube /></a>
          </div>
        </div>

        {/* Courses */}
        <div>
          <h3 className="footerTitle">Popular Courses</h3>
          <ul className="footerList">
            <li>Web Development</li>
            <li>Data Science</li>
            <li>UI/UX Design</li>
            <li>Cyber Security</li>
            <li>Digital Marketing</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="footerTitle">Company</h3>
          <ul className="footerList">
            <li>About Us</li>
            <li>Our Instructors</li>
            <li>Career</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="footerTitle">Support</h3>
          <ul className="footerList">
            <li>Help Center</li>
            <li>FAQs</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Refund Policy</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-14 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} EduMaster. All rights reserved.
      </div>
    </footer>
  );
}
