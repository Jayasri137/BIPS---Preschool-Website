import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMedia } from "../hooks/useMedia";
import GradientImageCard from "../styles/GradientImageCard";

export default function WhyChooseBluestone() {
  const navigate = useNavigate();
  const { getSectionImage } = useMedia("Home");

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 justify-center text-center grid md:grid-cols-2 md:text-left gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-orange-500 font-semibold text-lg md:text-xl mb-4">
            Why Choose Bluestone
          </p>

          <h2 className="text-3xl md:text-5xl font-extrabold text-purple-800">
            Meeting Every Child <br />
            <span className="text-orange-500">Where They Are</span>
          </h2>

          <p className="mt-6 text-gray-600 lg:text-lg text-[16px] leading-relaxed max-w-xl">
           Bluestone International Preschool is a child-centric early learning institution committed to nurturing young 
           minds in a safe, engaging, and inclusive environment. Rooted in a strong foundation of play-based and experiential 
           learning, our curriculum supports holistic development—cognitive, social, emotional, and physical—during the most 
           formative years of a child’s life. We believe every child is unique and deserves personalized attention,
            guided exploration, and joyful learning experiences.
          </p>

          {/* ✅ BUTTON ROUTING */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/schedule-visit")}
            className="mt-8 px-8 py-3 rounded-full border-2 border-orange-500 text-orange-500 font-semibold hover:bg-orange-500 hover:text-white transition"
          > Schedule a Visit
          </motion.button>
        </motion.div>

        {/* RIGHT GRID */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid text-center grid-cols-2 grid-rows-2 w-full max-w-[520px] mx-auto gap-0"
        >
          {[{
            title: "Play based learning",
            description: "Hands-on activities that encourage curiosity, creativity, and problem-solving.",
            image: getSectionImage("Why_Choose_Us", 0),
            frontColor: "rgba(180,128,15,0.88)",
            gradientFrom: "rgba(255,200,160,0.45)",
            gradientTo: "rgba(255,170,200,0.45)",
            radius: "rounded-tl-[36px] rounded-tr-[36px]",
          },
          {
            title: "Caring Teachers",
            description: "Experienced educators who nurture confidence, kindness, and independence.",
            image: getSectionImage("Why_Choose_Us", 1),
            frontColor: "rgba(15,118,110,0.95)",
            gradientFrom: "rgba(180,230,225,0.45)",
            gradientTo: "rgba(190,210,255,0.45)",
            radius: "rounded-tl-[36px] rounded-tr-[36px]",
          },
          {
            title: "Safe Environment",
            description: "A secure, child-friendly space where children feel happy, protected, and supported.",
            image: getSectionImage("Why_Choose_Us", 2),
            frontColor: "rgba(175,75,38,0.88)",
            gradientFrom: "rgba(255,210,170,0.45)",
            gradientTo: "rgba(255,180,190,0.45)",
            radius: "rounded-bl-[36px] rounded-br-[36px]",
          },
          {
            title: "Holistic Growth",
            description: "Balanced focus on academics, social skills, emotional well-being, and creativity.",
            image: getSectionImage("Why_Choose_Us", 3),
            frontColor: "rgba(30,27,75,0.90)",
            gradientFrom: "rgba(200,200,255,0.45)",
            gradientTo: "rgba(220,190,255,0.45)",
            radius: "rounded-bl-[36px] rounded-br-[36px]",
          }]
          .map((card, index) => (
            <motion.div 
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
            >
              <GradientImageCard {...card} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
