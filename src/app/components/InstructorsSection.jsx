import { motion } from 'framer-motion';
import { FaBookOpen, FaUsers } from 'react-icons/fa';

const instructorsData = [
  { id: 1, name: "MS. Mehwish Wilson", title: "Software Engineer", courses: 50, students: 1000 },
  { id: 2, name: "MD. MettalWilson", title: "SEO Expert", courses: 45, students: 950 },
  { id: 3, name: "MD. Montoril Wilson", title: "UX Designer", courses: 30, students: 600 },
  { id: 4, name: "MD. Honogr Wilson", title: "Web Developer", courses: 55, students: 1200 },
];

const InstructorCard = ({ data }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-500 flex flex-col items-center text-center"
      whileHover={{ 
        y: -10, // Lift slightly
        rotateY: 5, // 3D Tilt effect
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" // Stronger shadow
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Placeholder Image/Avatar */}
      <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 border-4 border-indigo-500 overflow-hidden">
        {/* 

[Image of a young male professional smiling]
 - You can add a specific instructor image here */}
      </div>
      
      <h3 className="font-bold text-xl text-gray-800">{data.name}</h3>
      <p className="text-sm text-indigo-600 mb-4">{data.title}</p>
      
      <div className="flex justify-center space-x-4 text-gray-600">
        <p className="flex items-center text-sm font-medium">
          <FaBookOpen className="mr-1 text-indigo-500" /> 
          {data.courses} Courses
        </p>
        <p className="flex items-center text-sm font-medium">
          <FaUsers className="mr-1 text-indigo-500" /> 
          {data.students} Students
        </p>
      </div>
    </motion.div>
  );
};

const InstructorsSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold uppercase text-indigo-600 tracking-wider mb-2">
          INSTRUCTORS
        </p>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
          Meet Our Expert <span className="text-indigo-600">Instructors</span>
        </h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {instructorsData.map(instructor => (
            <motion.div key={instructor.id} variants={{ hidden: { scale: 0.8 }, visible: { scale: 1 } }}>
              <InstructorCard data={instructor} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InstructorsSection;