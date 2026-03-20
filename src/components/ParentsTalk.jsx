import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Quote,
  Star,
  UserCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useMedia } from "../hooks/useMedia";
import Testimonials from "../Section/Testimonials";
import { useNavigate } from "react-router-dom";
import SEO from "../SEO";

const videoTestimonials = [
  {
    id: 1,
    parentName: "Mrs. Anjali Sharma",
    childGrade: "Nestlers",
    thumbnail:
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    parentName: "Mr. Rajesh Khanna",
    childGrade: "B-Junior",
    thumbnail:
      "https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    parentName: "Mrs. Priya Das",
    childGrade: "B-Senior",
    thumbnail:
      "https://images.unsplash.com/photo-1544333346-ce7b60bb3ae1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    parentName: "Mr. Amit Verma",
    childGrade: "Bambino",
    thumbnail:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800",
  },
];

const writtenTestimonials = [
  {
    text: "The curriculum at Bluestone is truly international. My daughter has become so much more confident.",
    author: "Sneha Reddy",
    relation: "Mother of Aavya",
    stars: 5,
  },
  {
    text: "Safety was my biggest concern. Seeing the CCTV access made me choose Bluestone without a doubt.",
    author: "Vikram Malhotra",
    relation: "Father of Reyansh",
    stars: 5,
  },
  {
    text: "The teachers are incredibly patient and caring. I see a daily improvement in my son's social skills.",
    author: "Karan Singh",
    relation: "Father of Kabir",
    stars: 5,
  },
  {
    text: "Innovative teaching methods! My child actually looks forward to going to school every morning.",
    author: "Meera Iyer",
    relation: "Mother of Diya",
    stars: 5,
  },
];

export default function ParentTalks() {
  const { getSectionImage } = useMedia("General");
  const sclImg = getSectionImage("Parents_Talk_Banner");
  const navigate = useNavigate();

  // Video Pagination State
  const [videoPage, setVideoPage] = useState(0);
  const videosPerPage = 2;
  const totalVideoPages = Math.ceil(videoTestimonials.length / videosPerPage);

  const displayedVideos = videoTestimonials.slice(
    videoPage * videosPerPage,
    (videoPage + 1) * videosPerPage
  );

  return (
    <div className="bg-white min-h-screen">
      <SEO 
        title="Hear from our Happy Parents"
        description="Discover why parents trust Bluestone International Preschool through real experiences, feedback, and success stories from our happy families."
        url="/parents-talk"
      />
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <motion.img
          src={sclImg}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-purple-700/80 to-orange-500/80" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6"
        >
          <span className="text-orange-300 font-bold tracking-widest uppercase text-lg">
            Voices of our Community
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mt-4">
            Parents <span className="text-orange-500">Talk</span>
          </h1>
          <p className="text-white max-w-2xl mx-auto text-lg mt-4">
            Hear directly from the families who make Bluestone Preschool their
            second home.
          </p>{" "}
        </motion.div>
      </section>

      {/* ================= AUTO-SCROLLING TESTIMONIALS WITH FOG EFFECT ================= */}
      <section>
        <Testimonials />
      </section>

      {/* ================= VIDEO SECTION WITH PAGINATION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <h2 className="text-3xl font-bold text-purple-900 flex items-center gap-3">
            <Play className="fill-orange-500 text-orange-500" /> Video Stories
          </h2>

          {/* Pagination Controls */}
          <div className="flex items-center gap-4">
            <button
              disabled={videoPage === 0}
              onClick={() => setVideoPage((prev) => prev - 1)}
              className="p-3 rounded-full border-2 border-purple-100 text-purple-900 disabled:opacity-30 hover:bg-purple-50 transition"
            >
              <ChevronLeft size={24} />
            </button>
            <span className="font-bold text-purple-900">
              0{videoPage + 1} / 0{totalVideoPages}
            </span>
            <button
              disabled={videoPage === totalVideoPages - 1}
              onClick={() => setVideoPage((prev) => prev + 1)}
              className="p-3 rounded-full border-2 border-purple-100 text-purple-900 disabled:opacity-30 hover:bg-purple-50 transition"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
          <AnimatePresence mode="wait">
            {displayedVideos.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                whileHover={{ y: -10 }}
                className="relative group cursor-pointer rounded-[2.5rem] overflow-hidden shadow-2xl bg-black aspect-video"
              >
                <img
                  src={video.thumbnail}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity"
                  alt={video.parentName}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/90 to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white text-xl font-bold">
                        {video.parentName}
                      </h4>
                      <p className="text-orange-400 font-medium">
                        {video.childGrade}
                      </p>
                    </div>
                    <div className="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                      <Play fill="white" size={24} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-800  to-orange-500 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <h2 className="text-3xl font-bold mb-4 relative z-10">
            Be Part of Our Success Story
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admissions")}
            className="mt-10 px-10 py-4 rounded-full bg-orange-500 text-white font-bold text-lg hover:bg-orange-600 transition-all shadow-xl"
          >
            Book a School Tour
          </motion.button>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl" />
        </div>
      </section>
    </div>
  );
}
