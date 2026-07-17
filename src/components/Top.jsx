import { Phone, Clock, Facebook, Instagram, Youtube } from "lucide-react";
import { motion } from "framer-motion";

export default function TopBar() {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-purple-800 text-white text-xs sm:text-sm"
    >
      <div
        className="
          max-w-7xl mx-auto
          px-4 sm:px-6
          py-2
          flex flex-col
          sm:flex-row
          sm:justify-between
          sm:items-center
          gap-2 sm:gap-0
        "
      >
        {/* LEFT */}
        <div className="flex flex-row sm:flex-row  gap-6 sm:text-left">

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <Phone size={14} className="sm:size-[16px]" />
            <a
              href="tel:+123456789"
              className="hover:text-orange-400 transition"
            >
              +91 99405 12066
            </a>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1 sm:gap-2"
          >
            <Clock size={14} className="sm:size-[16px]" />
            <span className="text-[#D08407]">Opening:</span>
            <span>9:00am – 04:00pm</span>
          </motion.div>
        </div>

        {/* RIGHT */}
        <div className="hidden sm:flex justify-center items-center gap-3">
          <span className="hidden sm:block">Follow us:</span>

          {/* WhatsApp */}
          <motion.a
            href="https://wa.me/9940512066"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-7 h-7 flex items-center justify-center bg-white text-green-600 rounded-full cursor-pointer shadow"
          >
            <Phone size={14} /> {/* WhatsApp icon replacement */}
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://www.instagram.com/bluestoneips?igsh=cDMxYWM2Ym1keWNw"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-7 h-7 flex items-center justify-center bg-white text-pink-600 rounded-full cursor-pointer shadow"
          >
            <Instagram size={14} />
          </motion.a>

          {/* YouTube */}
          <motion.a
            href="https://www.youtube.com/@Bluestone-q9s1w"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-7 h-7 flex items-center justify-center bg-white text-red-600 rounded-full cursor-pointer shadow"
          >
            <Youtube size={14} />
          </motion.a>

          {/* Facebook */}
          <motion.a
            href="https://www.facebook.com/bipschool"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-7 h-7 flex items-center justify-center bg-white text-blue-600 rounded-full cursor-pointer shadow"
          >
            <Facebook size={14} />
          </motion.a>
        </div>

      </div>
    </motion.div>
  );
}
