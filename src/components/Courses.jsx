import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPaintBrush,
  FaMusic,
  FaBookOpen,
  FaBrain,
  FaRunning,
  FaChevronDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMedia } from "../hooks/useMedia";
import SEO from "../SEO";

/**
 * OPTIMIZED IMAGE COMPONENT
 * Created to handle high-resolution original images.
 * Shows a shimmer effect while loading and fades in once ready.
 */
const OptimizedImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {/* Shimmer Placeholder */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
            style={{ backgroundSize: "200% 100%" }}
            animate={{ backgroundPosition: ["-100% 0", "100% 0"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        )}
      </AnimatePresence>

      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        onLoad={() => setIsLoaded(true)}
        className="w-full h-full object-cover relative z-10"
        loading="lazy"
      />
    </div>
  );
};

export default function Curriculum() {
  const { getSectionImage } = useMedia("Courses");
  const sclImg = getSectionImage("Main_Banner");
  const Img = getSectionImage("Program_Banner");

  const syllabusData = [
    {
      age: "2 – 3 Years (Nestlers)",
      color: "bg-red-500",
      items: [
        { icon: <FaPaintBrush />, title: "Sensory Play", desc: "Textures, colors & exploration", image: getSectionImage("Sensory") },
        { icon: <FaMusic />, title: "Music & Movement", desc: "Rhymes & rhythm activities", image: getSectionImage("Music") },
        { icon: <FaRunning />, title: "Motor Skills", desc: "Gross & fine motor development", image: getSectionImage("Motor") },
      ],
    },
    {
      age: "3 – 4 Years (Bambino)",
      color: "bg-blue-500",
      items: [
        { icon: <FaBookOpen />, title: "Storytelling", desc: "Language & imagination", image: getSectionImage("Story") },
        { icon: <FaPaintBrush />, title: "Creative Arts", desc: "Drawing & craft activities", image: getSectionImage("Art") },
        { icon: <FaMusic />, title: "Music & Dance", desc: "Expressive movement", image: getSectionImage("Dance") },
      ],
    },
    {
      age: "3 – 4 Years (B Junior)",
      color: "bg-green-500",
      items: [
        { icon: <FaBookOpen />, title: "Phonics", desc: "Early reading skills", image: getSectionImage("Phonics") },
        { icon: <FaBrain />, title: "Numeracy", desc: "Numbers & logic", image: getSectionImage("Math") },
        { icon: <FaPaintBrush />, title: "Creative Expression", desc: "Role play & art", image: getSectionImage("Creative") },
      ],
    },
    {
      age: "5 – 6 Years (B Senior)",
      color: "bg-yellow-500",
      items: [
        { icon: <FaBrain />, title: "Critical Thinking", desc: "Problem solving", image: getSectionImage("Thinking") },
        { icon: <FaBookOpen />, title: "Reading & Writing", desc: "Sentence formation", image: getSectionImage("Reading") },
        { icon: <FaRunning />, title: "Leadership Skills", desc: "Teamwork & confidence", image: getSectionImage("Leadership") },
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="bg-[#FAF7F2] overflow-x-hidden">
      <SEO
        title="Our International Curriculum"
        description="Discover our globally inspired 'CaterFly' curriculum - a play-based learning journey nurturing creativity and independence for every age group."
        url="/curriculum"
        image={sclImg}
      />
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden pt-20 px-4 sm:px-6">
        <motion.img
          src={sclImg}
          alt="Curriculum Hero"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8 }}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager" // Load hero image immediately
        />
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-purple-900/90 via-purple-800/70 to-orange-500/60" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center max-w-4xl"
        >
          <h2 className="text-2xl md:text-5xl font-extrabold text-white mb-2">Our International</h2>
          <h1 className="text-orange-400 text-5xl md:text-7xl font-extrabold mb-6">Curriculum</h1>
          <p className="text-white/90 text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            A globally inspired, play-based learning journey nurturing creativity and confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full sm:w-auto px-8 py-3 rounded-full border-2 border-white text-white font-bold hover:bg-white hover:text-purple-800 transition"
            >
              Explore Journey
            </button>
            <button
              onClick={() => navigate("/admissions")}
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-orange-500 text-white font-bold shadow-lg hover:bg-white hover:text-orange-500 transition"
            >
              Apply Now
            </button>
          </div>
        </motion.div>
      </section>

      {/* ================= PHILOSOPHY SECTION ================= */}
      <section className="py-16 md:py-28 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <OptimizedImage
              src={Img}
              alt="Philosophy"
              className="rounded-3xl shadow-2xl w-full max-w-md mx-auto aspect-[4/5] border-8 border-white"
            />
            <div className="absolute -bottom-6 -right-6 bg-orange-400 p-6 rounded-2xl hidden md:block">
              <p className="text-white font-bold text-xl">Growth &<br />Discovery</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-purple-900 mb-6">
              Curriculum Philosophy <span className="text-orange-500">'CaterFly'</span>
            </h2>
            <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
              <p>
                <span className="font-bold text-orange-500">"CaterFly"</span> combines <span className="font-bold text-orange-500">“Caterpillar” + “Butterfly”</span>, perfectly expressing the Montessori journey.
              </p>
              <p>
                The CaterFly curriculum embodies our child-centered, inquiry-led approach, guiding children through their transformational journey from curiosity to independence.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= SYLLABUS SECTION ================= */}
      <section id="courses" className="py-16 bg-white px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-purple-800">The Syllabus</h2>
            <div className="h-1.5 w-24 bg-orange-400 mx-auto mt-4 rounded-full" />
          </div>

          <div className="space-y-4">
            {syllabusData.map((stage, index) => (
              <div key={index} className="border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className={`w-full flex items-center justify-between p-6 md:p-8 transition-colors ${activeIndex === index ? "bg-orange-50" : "bg-white"}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-10 h-10 rounded-xl ${stage.color} flex items-center justify-center text-white font-bold shadow-md`}>
                      {index + 1}
                    </span>
                    <h3 className="text-lg md:text-2xl font-bold text-purple-900">{stage.age}</h3>
                  </div>
                  <motion.div animate={{ rotate: activeIndex === index ? 180 : 0 }}>
                    <FaChevronDown className="text-purple-800" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 md:px-8 pb-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                        {stage.items.map((item, i) => (
                          <div key={i} className="group bg-[#FAF7F2] rounded-2xl overflow-hidden hover:shadow-md transition-all">
                            {/* Uses the Optimized Component for original images */}
                            <OptimizedImage 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-44 transition-transform duration-500 group-hover:scale-105" 
                            />
                            <div className="p-5">
                              <div className={`${stage.color} w-10 h-10 rounded-full flex items-center justify-center text-white mb-3`}>
                                {item.icon}
                              </div>
                              <h4 className="font-bold text-purple-800 mb-1">{item.title}</h4>
                              <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ================= CTA SECTION ================= */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-purple-800 to-orange-500 rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-full -mr-16 -mt-16 opacity-50" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Unlock Your Child's Potential
            </h2>
            <p className="text-purple-100 text-lg mb-10 max-w-2xl mx-auto">
              Join Bluestone International for a journey filled with joy,
              growth, and self-discovery.
            </p>
            <button
              onClick={() => navigate("/admissions")}
              className="bg-white text-purple-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-400 hover:text-white transition-all transform hover:scale-105"
            >
              Apply for Admission
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
