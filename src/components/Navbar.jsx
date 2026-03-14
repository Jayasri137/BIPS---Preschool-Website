import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useMedia } from "../hooks/useMedia";
import {
  FaHome,
  FaInfoCircle,
  FaBuilding,
  FaSun,
  FaUsers,
  FaHandshake,
  FaNewspaper,
  FaPhoneAlt,
  FaGraduationCap,
  FaJoint,
  FaBookOpen,
  FaIndustry,
} from "react-icons/fa";

export default function Navbar() {
  const { getSectionImage } = useMedia("General");
  const logo = getSectionImage("Navbar_Logo");
  const [menuOpen, setMenuOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const [mobileProgramOpen, setMobileProgramOpen] = useState(false);

  // menuItems now links directly to pages
  const menuItems = ["FRANCHISE", "BLOGS", "CURRICULUM", "CENTRES"];

  const programs = [
    { name: "Nestlers", path: "/program/nestlers" },
    { name: "Bambino", path: "/program/bambino" },
    { name: "B Junior", path: "/program/b-junior" },
    { name: "B Senior", path: "/program/b-senior" },
  ];

  const mobileMenu = [
    { name: "About Us", path: "/about-bluestone", icon: FaInfoCircle },
    { name: "Corporate Daycare", path: "/daycare", icon: FaBuilding },
    { name: "Summer Club", path: "/summer-club", icon: FaSun },
    { name: "Parents Talk", path: "/parents-talk", icon: FaUsers },
    { name: "Partners with Us", path: "/partners", icon: FaHandshake },
    { name: "Media", path: "/media", icon: FaNewspaper },
    { name: "Contact Us", path: "/contact", icon: FaPhoneAlt },
  ];

  const mobilePrimaryMenu = [
    { name: "Home", path: "/", icon: FaHome },
    {
      name: "Programs",
      type: "programs",
      path: "/programs",
      icon: FaGraduationCap,
    },
    { name: "Franchise", path: "/franchise", icon: FaJoint },
    { name: "Blogs", path: "/blogs", icon: FaNewspaper }, // Changed path and icon
    { name: "Curriculum", path: "/curriculum", icon: FaBookOpen },
    { name: "Centres", path: "/centres", icon: FaIndustry },
  ];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/">
            <img src={logo} alt="Bluestone Preschool" className="h-40 w-40" />
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <nav className="hidden md:flex md:flex-row-reverse md:text-sm lg:text-lg items-center gap-5">
            <div
              className="relative"
              onMouseEnter={() => setProgramOpen(true)}
              onMouseLeave={() => setProgramOpen(false)}
            >
              <span className="cursor-pointer font-semibold text-purple-900 hover:text-orange-400">
                PROGRAMS
              </span>
              <AnimatePresence>
                {programOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="absolute left-0 top-full mt-4 w-56 rounded-2xl bg-white shadow-xl overflow-hidden"
                  >
                    {programs.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="block px-6 py-3 text-purple-900 hover:bg-orange-50 hover:text-orange-500 transition"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {menuItems.map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="font-semibold text-purple-900 hover:text-orange-400 transition uppercase"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              to="/admissions"
              className="px-5 py-2 border-2 border-orange-400 text-orange-500 font-bold rounded-full hover:bg-orange-400 hover:text-white transition"
            >
              ADMISSION
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="text-3xl text-purple-900 bg-amber-500 rounded-full px-4 py-3"
          >
            ☰
          </button>
        </div>
      </div>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 right-0 z-50 h-full lg:w-[22%] md:w-[28%] sm:w-[80%] bg-white shadow-2xl rounded-l-3xl overflow-y-auto"
            >
              <div className="flex items-center justify-between px-6 py-0">
                <img
                  src={logo}
                  alt="Bluestone"
                  className="h-20 md:h-30 lg:h-40"
                />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl text-purple-900"
                >
                  ✕
                </button>
              </div>

              <div className="px-6">
                <div className="my-0 border-gray-200 " />
                <div className="md:hidden flex flex-col gap-3 text-[14px] font-bold text-purple-900">
                  {mobilePrimaryMenu.map((item) => {
                    const Icon = item.icon;

                    if (item.type === "programs") {
                      return (
                        <div key={item.name}>
                          <button
                            onClick={() =>
                              setMobileProgramOpen(!mobileProgramOpen)
                            }
                            className="flex items-center justify-between w-full hover:text-orange-500 transition"
                          >
                            <span className="flex items-center gap-3">
                              <Icon className="text-orange-400" /> PROGRAMS
                            </span>
                            <span>{mobileProgramOpen ? "−" : "+"}</span>
                          </button>
                          <AnimatePresence>
                            {mobileProgramOpen && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                className="ml-4 mt-2 flex flex-col gap-2 overflow-hidden border-l border-orange-100 pl-4"
                              >
                                {programs.map((p) => (
                                  <Link
                                    key={p.name}
                                    to={p.path}
                                    onClick={() => setMenuOpen(false)}
                                    className="hover:text-orange-500 py-1 font-medium"
                                  >
                                    {p.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-4 hover:text-orange-500"
                      >
                        <Icon className="text-orange-400" />
                        {item.name.toUpperCase()}
                      </Link>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-3 text-[16px] font-bold text-purple-900 pt-3">
                  {mobileMenu.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-4 hover:text-orange-500"
                      >
                        <Icon className="text-orange-400 text-lg" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>

                <Link
                  to="/admissions"
                  onClick={() => setMenuOpen(false)}
                  className="mt-8 mb-10 block text-center px-4 py-3 rounded-full bg-orange-500 text-white font-bold hover:bg-orange-600 transition shadow-lg"
                >
                  ENROLL NOW
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
