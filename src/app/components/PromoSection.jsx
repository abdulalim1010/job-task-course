import Image from "next/image";
import girlImg from "../../assets/grill.png";
import boyImg from "../../assets/boyy .png";

export default function PromoSection() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-0 py-10">

      {/* 2 Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ================= Card 1 ================= */}
        <div className="bg-[#4F46E5] rounded-3xl p-8 md:p-12 text-white relative flex flex-col md:flex-row items-center justify-between overflow-hidden">

          {/* 🔥 Animated Text */}
          <div className="absolute top-3 left-0 w-full overflow-hidden">
            <p className="marquee font-bold text-3xl md:text-4xl opacity-90">
              🔥 Hot Offer is Going — Special Discount! 🔥 Hot Offer is Going — Special Discount! 🔥 Hot Offer is Going — Special Discount! 🔥 Hot Offer is Going — Special Discount!
            </p>
          </div>

          {/* Left Text Block */}
          <div className="flex-1 mt-10">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Get <span className="font-bold">Free Courses</span>
            </h2>

            <div className="h-1 bg-white w-40 rounded-full mb-4 relative">
              <span className="absolute right-0 top-[-6px] h-4 w-4 bg-white rounded-full"></span>
            </div>

            <p className="opacity-90 leading-relaxed">
              Top instructors from around the world teach <br />
              Millions student on EduPlus
            </p>

            <button className="mt-6 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
              Apply Now
            </button>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-end">
            <div className="w-[220px] md:w-[260px] lg:w-[300px]">
              <Image
                src={girlImg}
                alt="Girl Student"
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* ================= Card 2 ================= */}
        <div className="bg-[#10B981] rounded-3xl p-8 md:p-12 text-white relative flex flex-col md:flex-row items-center justify-between overflow-hidden">

          {/* 🔥 Animated Text */}
          <div className="absolute top-3 left-0 w-full overflow-hidden">
            <p className="marquee font-bold text-3xl md:text-4xl opacity-90">
              🎉 50% Discount is Continue! 🎉 50% Discount is Continue! 🎉 50% Discount is Continue! 🎉 50% Discount is Continue!
            </p>
          </div>

          {/* Left Text */}
          <div className="flex-1 mt-10">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Become a <span className="font-bold">Tutor</span>
            </h2>

            <div className="h-1 bg-white w-40 rounded-full mb-4 relative">
              <span className="absolute right-0 top-[-6px] h-4 w-4 bg-white rounded-full"></span>
            </div>

            <p className="opacity-90 leading-relaxed">
              Top instructors from around the world teach <br />
              Millions student on EduPlus
            </p>

            <button className="mt-6 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
              Apply Now
            </button>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-end">
            <div className="w-[220px] md:w-[260px] lg:w-[300px]">
              <Image
                src={boyImg}
                alt="Boy Student"
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
