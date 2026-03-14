import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useMedia } from "../hooks/useMedia";
import CloudLogo from "../styles/cloud";
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Footer() {
  const { getSectionImage } = useMedia("General");
  const logo = getSectionImage("Footer_Logo");
  return (
    <footer className="bg-[#74207E] text-white w-full">
      {/* MAIN */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="
        max-w-7xl mx-auto px-6 sm:px-8 py-14 lg:py-20
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_3fr]
        gap-12 md:gap-16 lg:gap-20
        "
      >
        {/* BRAND */}
        <motion.div
          variants={item}
          className="flex flex-col md:items-start text-center md:text-left"
        >
          <div className="w-48 md:w-50">
            <CloudLogo logo={logo} />
          </div>

          <p className="mt-6 max-w-xs md:max-w-sm text-white/90 leading-relaxed text-[15px] md:text-base">
            Nurturing young minds through joyful learning, care, and creativity.
          </p>
        </motion.div>

        {/* LINKS */}
        <div
          className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-10 sm:gap-12 lg:gap-14
          text-center md:text-left
          "
        >
          {/* EXPLORE */}
          <motion.div variants={item}>
            <h4 className="font-semibold text-lg mb-4 sm:mb-6 text-white">
              Explore
            </h4>
            <ul className="space-y-2 text-white/60 text-[15px] sm:text-[16px]">
              <li>
                <Link
                  to="/about-bluestone"
                  className="hover:text-orange-400 transition"
                >
                  About Bluestone
                </Link>
              </li>
              <li>
                <Link
                  to="/curriculum"
                  className="hover:text-orange-400 transition"
                >
                  Curriculum
                </Link>
              </li>
              <li>
                <Link
                  to="/daycare"
                  className="hover:text-orange-400 transition"
                >
                  Day Care Program
                </Link>
              </li>
              <li>
                <Link
                  to="/parents-talk"
                  className="hover:text-orange-400 transition"
                >
                  Parents Talk
                </Link>
              </li>
              <li>
                <Link
                  to="/reviews"
                  className="hover:text-orange-400 transition"
                >
                  Partner Reviews
                </Link>
              </li>
              <li>
                <Link
                  to="/centres"
                  className="hover:text-orange-400 transition"
                >
                  Centres
                </Link>
              </li>
              <li>
                <Link
                  to="/presence"
                  className="hover:text-orange-400 transition"
                >
                  Our Presence
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* MORE */}
          <motion.div variants={item}>
            <h4 className="font-semibold text-lg mb-4 sm:mb-6 text-white">
              More
            </h4>
            <ul className="space-y-2 text-white/60 text-[15px] sm:text-[16px]">
              {/* <li><Link to="/courses" className="hover:text-orange-400 transition">Courses</Link></li> */}
              <li>
                <Link to="/blogs" className="hover:text-orange-400 transition">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/media" className="hover:text-orange-400 transition">
                  Media
                </Link>
              </li>
              <li>
                <Link
                  to="/franchise"
                  className="hover:text-orange-400 transition"
                >
                  Franchise
                </Link>
              </li>
              <li>
                <Link
                  to="/partner"
                  className="hover:text-orange-400 transition"
                >
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link
                  to="/admissions"
                  className="hover:text-orange-400 transition"
                >
                  Admission
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-orange-400 transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* CONTACT */}
          <motion.div variants={item}>
            <h4 className="font-semibold text-lg mb-4 sm:mb-6 text-white">
              Contact
            </h4>

            <ul className="space-y-3 text-white/60 text-[15px] sm:text-[16px]">
              <li>
                <a
                  href="mailto:info@bluestoneinternationalpreschool.com"
                  target="_blank"
                  className="hover:text-orange-400 transition break-words block"
                >
                  info@bluestoneinternationalpreschool.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919940512066"
                  className="hover:text-orange-400 transition"
                >
                  +91 99405 12066
                </a>
              </li>
              <li className="map">
                <a
                  href="https://maps.app.goo.gl/FexVPGPbVhqABGgo6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition block break-words"
                >
                  No. 9/179/1, Vettukadu, Erumaipatti PO, Idappadi TK, Salem, Tamil
                  Nadu – 637102
                </a>
              </li>
            </ul>

            {/* SOCIAL ICONS */}
            <div className="flex flex-wrap gap-4 sm:gap-5 mt-6 justify-center md:justify-start">
              <a
                href="https://www.instagram.com/bluestoneips?igsh=cDMxYWM2Ym1keWNw"
                target="_blank"
                className="text-white/60 hover:text-orange-400 transition transform hover:scale-110"
              >
                <FaInstagram size={22} />
              </a>
              <a
                href="https://wa.me/919940512066"
                target="_blank"
                className="text-white/60 hover:text-orange-400 transition transform hover:scale-110"
              >
                <FaWhatsapp size={22} />
              </a>
              <a
                href="https://www.facebook.com/bipschool"
                target="_blank"
                className="text-white/60 hover:text-orange-400 transition transform hover:scale-110"
              >
                <FaFacebookF size={22} />
              </a>
              <a
                href="https://www.youtube.com/@Bluestone-q9s1w"
                target="_blank"
                className="text-white/60 hover:text-orange-400 transition transform hover:scale-110"
              >
                <FaYoutube size={22} />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="border-t border-white/20" />

      {/* Footer Bottom */}
      <div
        className="
        max-w-7xl mx-auto px-6 sm:px-8 py-5
        text-center md:text-left text-[13px] sm:text-[14px]
        text-white/80
      "
      >
        © 2026 Bluestone International Preschool. All rights reserved.
      </div>
    </footer>
  );
}
