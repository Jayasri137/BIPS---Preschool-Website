import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMedia } from "../hooks/useMedia";
import SEO from "../SEO";

export default function About({ showSEO = false }) {
  const navigate = useNavigate();
  const { getSectionImage } = useMedia("About");

  const dynamicMain = getSectionImage("Main_Graphic");
  const dynamicSmall1 = getSectionImage("Vision_Banner"); // Reusing for small circle 1
  const dynamicSmall2 = getSectionImage("Director_Image"); // Reusing for small circle 2

  return (
    <section className="py-24 bg-[#FFF7ED] overflow-hidden">
      {showSEO && (
        <SEO
          title="About Us"
          description="Learn about Bluestone International Preschool's mission, vision, and our commitment to providing premium early childhood education."
          url="/about"
        />
      )}
      <div className="max-w-7xl mx-auto justify-center text-center px-8 grid lg:grid-cols-2 lg:text-left gap-16 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-orange-500 text-xl px-10 font-semibold mb-4">
            About Bluestone
          </p>

          <h2 className="text-3xl md:text-4xl md:text-5xl font-extrabold text-purple-800 leading-tight">
            Nurturing{" "}
            <span className="text-orange-500">Curious Minds</span> for a
            Brighter Tomorrow
          </h2>

          <p className="mt-6 text-gray-600 leading-relaxed">
          At Bluestone International Preschool, recognized as the Best Preschool in Edappadi, we firmly believe that early childhood is the cornerstone of lifelong learning and personal growth. Our innovative approach seamlessly blends joyful play, boundless creativity, and thoughtfully structured learning experiences, empowering young children to thrive academically, socially, and emotionally. Nestled in a safe, stimulating, and nurturing environment, we foster holistic development through age-appropriate activities that spark curiosity, build confidence, and cultivate essential life skills.
         <br/> As the Best Preschool in Edappadi, Bluestone isn't just a school; it's a vibrant community where tomorrow's leaders are shaped today, equipped with resilience, empathy, and a lifelong passion for learning. Join us in laying the foundation for your child's extraordinary future.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/about-bluestone")}
            className="mt-8 mb-8 px-8 py-3 rounded-full border-2 border-orange-500
                             text-orange-500 font-semibold
                             hover:bg-orange-500 hover:text-white transition"
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* RIGHT IMAGE CLUSTER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          {/* FIXED RATIO CONTAINER */}
          <div className="relative w-[380px] md:w-[420px] aspect-square">

            {/* BIG IMAGE */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <img
                src={dynamicMain}
                alt="Children reading books together at Bluestone International Preschool"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            {/* TOP SMALL CIRCLE */}
            <div
              className="absolute rounded-full overflow-hidden border-4 border-white shadow-md"
              style={{
                width: "26%",
                height: "26%",
                top: "-5%",
                left: "7%",
              }}
            >
              <img
                src={dynamicSmall1}
                alt="Preschooler participating in creative learning activities"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            {/* LEFT SMALL CIRCLE */}
            <div
              className="absolute rounded-full overflow-hidden border-4 border-white shadow-md"
              style={{
                width: "18%",
                height: "18%",
                top: "45%",
                left: "-7%",
              }}
            >
              <img
                src={dynamicSmall2}
                alt="Group of kids playing and developing social skills"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            {/* ORANGE DOT 1 */}
            <span
              className="absolute bg-orange-400 rounded-full"
              style={{
                width: "12%",
                height: "12%",
                bottom: "5%",
                right: "12%",
                background:
                  "radial-gradient(circle at 30% 30%, #FDBA74, #F97316)",
              }}
            />

            {/* ORANGE DOT 2 */}
            <span
              className="absolute bg-orange-400 rounded-full"
              style={{
                width: "8%",
                height: "8%",
                top: "28%",
                right: "-2%",
                background:
                  "radial-gradient(circle at 30% 30%, #FDBA74, #F97316)",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}