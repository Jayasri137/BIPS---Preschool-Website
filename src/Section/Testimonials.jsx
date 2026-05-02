import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TestimonialCard from "../styles/TestimonialCards";
import { FaFemale, FaMale } from "react-icons/fa";
import SEO from "../SEO";

export default function Testimonials({ showSEO = false }) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com";
      try {
        const res = await fetch(`${API_BASE}/testimonials`);
        const data = await res.json();
        if (Array.isArray(data)) {
          // Format data for TestimonialCard
          const formattedData = data.map(t => ({
            ...t,
            image: t.image_url ? t.image_url : (t.gender === 'male' ? FaMale : FaFemale),
            bg: t.bg_color
          }));
          setTestimonials(formattedData);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) return null; // Or a skeleton
  if (testimonials.length === 0) return null;
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="py-20 bg-white relative overflow-hidden"
    >
      {showSEO && (
        <SEO 
          title="Parents' Testimonials"
          description="Hear from parents about their experience with Bluestone International Preschool and our commitment to excellence."
          url="/testimonials"
        />
      )}
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-orange-500 text-2xl font-semibold mb-2"
        >
          What Parents Say
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-5xl font-extrabold text-purple-800"
        >
          Trusted by <span className="text-orange-500">Parents</span>, Loved
          <br className="hidden md:block" /> by{" "}
          <span className="text-orange-500">Children</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="max-w-4xl mx-auto mt-4 text-[18px] text-gray-600"
        >
          At Bluestone International Preschool, we believe early childhood is the foundation of lifelong learning. 
          Our approach blends play, creativity, and structured learning.
        </motion.p>

        {/* SCROLLER */}
        <div className="relative mt-16 overflow-hidden">
          {/* FOG OVERLAYS */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-white to-transparent" />

          <div className="testimonial-track">
            {/* Double the array for seamless looping */}
            {[...testimonials, ...testimonials, ...testimonials].map((item, index) => (
              <div key={index} className="testimonial-item">
                <TestimonialCard testimonial={item} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .testimonial-track {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: scroll-left 40s linear infinite;
          will-change: transform;
        }

        .testimonial-track:hover {
          animation-play-state: paused;
        }

        .testimonial-item {
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .testimonial-item:hover {
          transform: translateY(-8px) scale(1.02);
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        @media (max-width: 768px) {
          .testimonial-track {
            animation-duration: 25s;
          }
        }
      `}</style>
    </motion.section>
  );
}