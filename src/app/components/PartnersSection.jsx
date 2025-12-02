"use client";
import { motion } from 'framer-motion';
import { use } from 'react';

const partners = [
  { id: 1, name: "British Council", logo: "/logos/british-council.png" }, // Add a logo file here
  { id: 2, name: "Udemy", logo: "/logos/udemy.png" },
  { id: 3, name: "Coursera", logo: "/logos/coursera.png" },
  { id: 4, name: "Trustpilot", logo: "/logos/trustpilot.png" },
  { id: 5, name: "HubSpot", logo: "/logos/hubspot.png" },
];

const PartnersSection = () => {
  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-xl font-semibold text-gray-600 mb-8">
          Trusted By The Best
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {partners.map(partner => (
            <motion.div
              key={partner.id}
              className="w-32 h-10 flex justify-center items-center"
              initial={{ filter: 'grayscale(100%)' }}
              whileHover={{ filter: 'grayscale(0%)', scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Replace the div with an actual Next.js Image component if you are using image optimization. 
                  For now, a simple placeholder will work. */}
              <div className="text-lg font-bold text-gray-500 opacity-75">{partner.name}</div>
              {/* <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain" /> */}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnersSection;