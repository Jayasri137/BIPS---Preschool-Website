import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMedia } from "../hooks/useMedia";
import SEO from "../SEO";

export default function Programs({ showSEO = false }) {
  const navigate = useNavigate();
  const { getSectionImage } = useMedia("Programs");

  const programs = [
    {
      title: "NESTLERS",
      desc: "Our Nestlers program provides a safe, caring, and stimulating environment where children take their first steps into structured learning. Through sensory play, music, movement, and guided exploration, children develop fine and gross motor skills, early social interaction, and emotional security.",
      age: "2 – 3 Years",
      time: "9:00 - 04:00",
      img: getSectionImage("Nestlers_Header"),
      arrowColor: "bg-red-400",
      link: "/program/nestlers"
    },
    {
      title: "BAMBINO",
      desc: "The Bambino program nurtures natural curiosity through play-based and experiential learning.Foundational language skills, early numeracy concepts, and self-confidence are developed in a joyful and engaging classroom environment. Activities are designed to enhance logical thinking, early writing skills, and social responsibility.",
      age: "3 – 4 Years",
      time: "9:00 - 04:00",
      img: getSectionImage("Bambino_Header"),
      arrowColor: "bg-blue-500",
      link: "/program/bambino"
    },
    {
      title: "B JUNIOR",
      desc: "B Junior offers a balanced blend of guided instruction and exploratory play. Children begin structured learning in literacy and numeracy while continuing to develop problem-solving skills, collaboration, and creativity. Activities are designed to enhance logical thinking, early writing skills, and social responsibility.",
      age: "4 – 5 Years",
      time: "9:00 - 04:00",
      img: getSectionImage("Junior_Header"),
      arrowColor: "bg-green-500",
      link: "/program/b-junior"
    },
    {
      title: "B SENIOR",
      desc: "The B Senior program equips children with the academic, social, and emotional readiness required for primary school. Emphasis is placed on literacy, numeracy, critical thinking, and communication skills, along with values such as responsibility, empathy, and independence. Learning is structured, engaging, and developmentally appropriate.",
      age: "5 – 6 Years",
      time: "9:00 - 04:00",
      img: getSectionImage("Senior_Header"),
      arrowColor: "bg-yellow-300",
      link: "/program/b-senior"
    }
  ];


  /* ---------------- RESPONSIVE CARD COUNT ---------------- */
  const [cardsPerView, setCardsPerView] = useState(3);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth < 540) setCardsPerView(1);      // mobile
      else if (window.innerWidth < 780) setCardsPerView(2);
      else if (window.innerWidth < 1200) setCardsPerView(3);// tablet
      else setCardsPerView(4);                              // desktop
    };

    updateCards();
    window.addEventListener("resize", updateCards);
    return () => window.removeEventListener("resize", updateCards);
  }, []);

  const maxIndex = Math.max(programs.length - cardsPerView, 0);

  const next = () => setIndex((prev) => Math.min(prev + 1, maxIndex));
  const prev = () => setIndex((prev) => Math.max(prev - 1, 0));

  const visibleCards = programs.slice(index, index + cardsPerView);

  return (
    <section className="py-20 bg-white">
      {showSEO && (
        <SEO
          title="Our Programs"
          description="Explore our specialized early childhood programs: Nestlers, Bambino, B Junior, and B Senior, designed for holistic development."
          url="/program"
        />
      )}
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-orange-500 text-2xl font-semibold mb-3">
            Our Programs
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-purple-800">
            Learning by Age Group
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">

          {/* Prev Button */}
          <button
            onClick={prev}
            disabled={index === 0}
            className="lg:hidden absolute left-0 top-1/2 -translate-y-1 z-10
                       w-12 h-12 rounded-full bg-purple-800 text-white text-2xl
                       flex items-center justify-center
                       disabled:opacity-30"
          >
            ‹‹
          </button>

          {/* Cards */}
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="grid gap-8 px-5"
            style={{
              gridTemplateColumns: `repeat(${cardsPerView}, minmax(0, 1fr))`
            }}
          >
            {visibleCards.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-lg overflow-hidden
                           hover:shadow-2xl transition group"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-56 object-cover
                               group-hover:scale-110 transition duration-500"
                  />
                  {/* Arrow */}

                  <motion.button
                    whileHover={{ scale: 1.20 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(item.link)}
                    className={`absolute right-4 top-4 lg:top-7/8 translate-y-1
              w-12 h-12 rounded-full ${item.arrowColor}
              flex items-center justify-center cursor-pointer
              text-white text-xl font-bold shadow-lg`}
                  >
                    →
                  </motion.button>
                </div>

                {/* Content */}
                <div className="p-6 pt-10">
                  <h3 className="text-xl font-bold text-purple-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-[12px] mb-6">
                    {item.desc}
                  </p>
                  <div className="flex justify-between  text-sm font-semibold">
                    <span>
                      Age: <span className="text-orange-500">{item.age}</span>
                    </span>
                    <span>
                      Time: <span className="text-orange-500">{item.time}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Next Button */}
          <button
            onClick={next}
            disabled={index === maxIndex}
            className="lg:hidden absolute right-0 top-1/2 -translate-y-1 z-10
                       w-12 h-12 rounded-full bg-purple-800 text-white text-2xl
                       flex items-center justify-center
                       disabled:opacity-30"
          >
            ››
          </button>

        </div>
      </div>
    </section>
  );
}
