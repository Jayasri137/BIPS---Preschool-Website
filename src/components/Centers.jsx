import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaMailBulk,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useMedia } from "../hooks/useMedia";
import SEO from "../SEO";

/**
 * OptimizedImage Component
 * Handles smooth fade-in and skeleton states for high-res assets
 */
const OptimizedImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-purple-50 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        onLoad={() => setIsLoaded(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default function Centers() {
  const navigate = useNavigate();
  const { getSectionImage, media } = useMedia("Centers");
  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const heroImg = getSectionImage("Flagship_Hero");
  const galleryImages = media["General"]?.map(img => img.image_url) || [];

  useEffect(() => {
    const fetchCenters = async () => {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com";
      try {
        const res = await fetch(`${API_BASE}/centers`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setCenters(data);
          if (data.length > 0) setSelectedCenter(data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch centers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCenters();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="w-12 h-12 border-4 border-purple-900/30 border-t-purple-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (centers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <p className="text-gray-500 font-medium italic">No centers found.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] overflow-hidden">
      <SEO 
        title="Our Centers"
        description="Visit our preschool centers in Salem, Elampillai, and Konganapuram. Experience our nurturing, internationally inspired preschool environment."
        url="/centres"
      />
      {/* ================= HERO ================= */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <motion.img
          src={heroImg}
          alt="Our Centers"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-purple-700/80 to-orange-500/80" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-4xl text-center"
        >
          <h2 className="text-2xl md:text-5xl font-extrabold text-white mb-2 uppercase tracking-wide">
            Discover Our
          </h2>
          <h1 className="text-orange-500 text-5xl md:text-7xl font-black mb-6 drop-shadow-lg">
            Preschool Centers
          </h1>

          <p className="text-white/90 text-base md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Spreading joyful learning across multiple locations. Find a Bluestone International Preschool near you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.04 }}
              onClick={() => document.getElementById("center-selector")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3 rounded-full bg-orange-500 text-white font-bold shadow-lg hover:bg-white hover:text-orange-500 transition"
            >
              Select a Center
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ================= CENTER SELECTOR ================= */}
      <section id="center-selector" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {centers.map((c) => (
            <motion.button
              key={c.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedCenter(c);
                document.getElementById("center-details")?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-md ${
                selectedCenter.id === c.id 
                ? "bg-purple-900 text-white" 
                : "bg-white text-purple-900 hover:bg-purple-50"
              }`}
            >
              {c.name}
            </motion.button>
          ))}
        </div>

        {/* ================= CENTER DETAILS ================= */}
        <div id="center-details" className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-purple-900">{selectedCenter.name}</h2>
            <div className="w-20 h-1.5 bg-orange-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
            {/* Info Card */}
            <motion.div 
              key={selectedCenter.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-orange-500 rounded-[2.5rem] shadow-2xl p-6 sm:p-10 space-y-8 flex flex-col justify-center text-white"
            >
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="mt-1 text-white/80" size={24} />
                <div>
                  <h4 className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Address</h4>
                  <p className="font-medium leading-relaxed">{selectedCenter.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FaPhoneAlt className="mt-1 text-white/80" size={22} />
                <div>
                  <h4 className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Phone</h4>
                  <a href={`tel:${selectedCenter.phone.replace(/\s+/g, '')}`} className="text-xl font-bold hover:underline">
                    {selectedCenter.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FaMailBulk className="mt-1 text-white/80" size={22} />
                <div className="min-w-0">
                  <h4 className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Email</h4>
                  <a href={`mailto:${selectedCenter.email}`} className="break-all font-medium hover:underline">
                    {selectedCenter.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FaClock className="mt-1 text-white/80" size={22} />
                <div>
                  <h4 className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Hours</h4>
                  <p className="font-medium">{selectedCenter.hours}</p>
                </div>
              </div>
            </motion.div>

            {/* Google Map */}
            <motion.div 
              key={`${selectedCenter.id}-map`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px] lg:h-auto border-8 border-white bg-gray-100"
            >
              <iframe
                title={`${selectedCenter.name} Location`}
                src={selectedCenter.mapSrc || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15632.449764724838!2d77.8385!3d11.5786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDM0JzQzLjAiTiA3N8KwNTAnMTguNiJF!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin"}
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>

        {/* ================= IMAGE GALLERY ================= */}
        <div className="mb-24">
          <h3 className="text-2xl md:text-3xl font-extrabold text-purple-900 text-center mb-10">
            {selectedCenter ? `Explore ${selectedCenter.name} Campus` : "Explore Our Campus"}
          </h3>
          
          {media[selectedCenter?.name] && media[selectedCenter?.name].length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {media[selectedCenter.name].map(img => img.image_url).map((img, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} className="group relative shadow-lg rounded-3xl overflow-hidden">
                  <OptimizedImage src={img} alt={`Gallery ${i}`} className="aspect-square" />
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 font-medium italic">No images available for this center yet.</p>
          )}
        </div>

        {/* ================= WHY PARENTS LOVE US ================= */}
        <div className="mb-24">
          <h3 className="text-2xl md:text-3xl font-extrabold text-purple-900 text-center mb-12">
            Why Parents Love Bluestone
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {["International Curriculum", "Caring Educators", "Safe Child-Friendly Campus", "Holistic Development"].map((text, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, backgroundColor: "#fef3c7" }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-purple-100 text-center font-bold text-purple-900 transition-colors"
              >
                {text}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= ADMISSION CTA ================= */}
        <div className="text-center bg-gradient-to-r from-purple-800 to-orange-500 rounded-[3rem] p-10 sm:p-20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6">Growing With Love 🌱</h3>
            <p className="text-purple-100 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              We are committed to expanding our reach, bringing quality early childhood education to more families.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/admissions")}
              className="px-12 py-4 rounded-full bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 transition-all shadow-xl"
            >
              Apply for Admission
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}