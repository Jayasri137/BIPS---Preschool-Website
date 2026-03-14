import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMedia } from "../hooks/useMedia";

export default function Gallery() {
  const { media } = useMedia("Gallery");
  
  // Get dynamic images from "General" section
  const images = media["General"]?.map(img => img.image_url) || [];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-orange-500 text-2xl font-semibold mb-4 mt-14">
            Our Gallery
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-purple-800">
            Moments of Learning & Joy
          </h2>
        </motion.div>

        {/* Mobile Sticky Stack */}
        <div className="md:hidden space-y-24">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.5 }}
              // Added min-height to prevent layout shift during scroll
              className="sticky top-24 rounded-3xl overflow-hidden shadow-xl bg-gray-100 min-h-[50vh]"
            >
              <img
                src={img}
                alt={`Gallery image ${i + 1}`}
                loading="lazy"      // Crucial: Only loads as the user scrolls
                decoding="async"    // Prevents decoding from blocking UI
                className="w-full h-[50vh] object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Desktop / Tablet Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="
            hidden md:grid
            grid-cols-2
            md:grid-cols-4
            gap-4
            auto-rows-[240px]
          "
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              className={`
                rounded-3xl overflow-hidden bg-gray-100
                ${i === 1 || i === 3 ? "md:col-span-2" : "md:col-span-1"}
              `}
            >
              <img
                src={img}
                alt={`Gallery image ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}