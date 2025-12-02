import { motion } from 'framer-motion';
import { FaQuoteRight, FaStar } from 'react-icons/fa';

const testimonialsData = [
  { id: 1, name: "ASHIM LEGEND", role: "UX/UI Lead", rating: 5, text: "Dude rhoncus orci lacinia metus rhoncus. Duis rhoncus mi sed diam metus eleifend, in gravida mi dictum. Fusce pulvinar ante et ullamcorper vulputate." },
  { id: 2, name: "ASHIM DASS", role: "Content Writer", rating: 4, text: "Dude rhoncus orci lacinia metus rhoncus. Duis rhoncus mi sed diam metus eleifend, in gravida mi dictum. Fusce pulvinar ante et ullamcorper vulputate." },
  // Add the third one from the image if needed, or stick to two for simplicity
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

const TestimonialCard = ({ data }) => (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-indigo-500"
    variants={cardVariants}
    whileHover={{ scale: 1.05 }}
  >
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center">
        {/* Placeholder Avatar */}
        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 border-2 border-indigo-500"></div>
        <div>
          <p className="font-bold text-gray-800">{data.name}</p>
          <p className="text-sm text-indigo-500">{data.role}</p>
        </div>
      </div>
      <FaQuoteRight className="text-3xl text-indigo-200 opacity-50" />
    </div>

    <p className="text-gray-600 italic mb-4">"{data.text}"</p>
    
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <FaStar 
          key={i} 
          className={`w-4 h-4 ${i < data.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        />
      ))}
    </div>
  </motion.div>
);

const TestimonialsSection = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold uppercase text-indigo-600 tracking-wider flex items-center justify-center mb-2">
          TESTIMONIALS
        </p>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
          People's Say About Our <span className="text-indigo-600">Edplus</span>
        </h2>

        {/* Main Rating Card */}
        <motion.div 
            className="w-full max-w-sm mx-auto p-6 bg-indigo-700 text-white rounded-xl shadow-2xl mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <h3 className="text-6xl font-bold mb-2">4.8</h3>
            <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-6 h-6 text-yellow-300" />
                ))}
            </div>
            <p className="text-indigo-200">Based on 100+ ratings</p>
            {/* 

[Image of a diverse group of people collaborating]
 - Add a relevant image here */}
        </motion.div>


        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {testimonialsData.map(testimony => (
            <TestimonialCard key={testimony.id} data={testimony} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsSection;