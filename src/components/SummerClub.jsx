import React, { useState } from "react";
import {
  Sun,
  Palette,
  Leaf,
  FlaskConical,
  Book,
  Utensils,
  CookingPot,
  CalendarCheck,
  ShieldCheck,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMedia } from "../hooks/useMedia";
import { motion, AnimatePresence } from "framer-motion";

const summerActivities = [
  {
    icon: <Sun size={28} />,
    title: "Splash & Play",
    desc: "Daily water games and sensory fun to beat the heat.",
  },
  {
    icon: <Palette size={28} />,
    title: "Art Explorers",
    desc: "Unleash creativity with outdoor painting, crafts, and sculpture.",
  },
  {
    icon: <Leaf size={28} />,
    title: "Nature Navigators",
    desc: "Explore our garden, learn about plants, and meet mini-beasts.",
  },
  {
    icon: <FlaskConical size={28} />,
    title: "Young Scientists",
    desc: "Hands-on experiments making science exciting and understandable.",
  },
  {
    icon: <Book size={28} />,
    title: "Storybook Adventures",
    desc: "Immersive storytelling, puppet shows, and drama games.",
  },
  {
    icon: <CookingPot size={28} />,
    title: "Culinary Creators",
    desc: "Fun, simple cooking and baking workshops for little chefs.",
  },
];

const faqData = [
  {
    question: "What are the age groups for the Summer Club?",
    answer:
      "Our club is designed for children aged 2 to 5 years, with activities tailored for each age group.",
  },
  {
    question: "What should my child bring each day?",
    answer:
      "Children should bring a change of clothes, sunscreen, and a hat. All meals and activity materials are provided.",
  },
  {
    question: "Are the educators certified?",
    answer:
      "Yes, all our Summer Club educators are fully certified Bluestone staff, experienced in early childhood development.",
  },
  {
    question: "What are the enrollment options?",
    answer:
      "We offer flexible weekly and bi-weekly enrollment options. Full summer packages are also available.",
  },
];

export default function SummerClub() {
  const { getSectionImage } = useMedia("SummerClub");
  const heroBg = getSectionImage("Hero_BG");
  const summer = getSectionImage("Main_Graphic");
  const activity1 = getSectionImage("Activity_1");
  const activity2 = getSectionImage("Activity_2");
  const activity3 = getSectionImage("Activity_3");

  const [openFAQ, setOpenFAQ] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      {/* 1. Hero Section */}
      <section
        className="relative min-h-[85vh] bg-cover bg-center flex items-center justify-center p-6"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-purple-700/80 to-orange-500/80 backdrop-brightness-75"></div>
        <div className="relative z-10 text-center text-white max-w-7xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-7xl font-extrabold leading-tight drop-shadow-lg"
          >
            Dive into a Summer of{" "}
            <span className="text-orange-400">Discovery!</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-sm md:text-xl font-light mx-auto drop-shadow-md"
          >
            Bluestone International Summer Club—where learning meets adventure
            for young minds aged 2-5.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() =>
                document
                  .getElementById("summer")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white text-white font-bold hover:bg-white hover:text-purple-900 transition-all"
            >
              Explore Adventures
            </button>
            <button
              onClick={() => navigate("/admissions")}
              className="px-8 py-3 rounded-full bg-orange-500 text-white font-bold shadow-lg hover:bg-white hover:text-orange-500 transition-all"
            >
              Apply for Admission
            </button>
          </div>
        </div>
      </section>

      {/* 2. Activity Highlights */}
      <section id="summer" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black text-center text-purple-900 mb-16">
            Our Summer Adventures
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {summerActivities.map((activity, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-2xl border border-gray-100 hover:border-purple-200 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-900 group-hover:text-white transition-all duration-300">
                  {activity.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-purple-900 group-hover:text-orange-500">
                  {activity.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{activity.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Advantage Section */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-black text-purple-900 mb-8 leading-tight">
                The Bluestone <br />
                <span className="text-orange-500">Summer Edge</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: <CalendarCheck size={28} />,
                    title: "Flexible Scheduling",
                    desc: "Choose weekly or monthly blocks that align with your family vacations.",
                  },
                  {
                    icon: <Heart size={28} />,
                    title: "Nurturing Environment",
                    desc: "Every child is treated like family in our secure, loving campus.",
                  },
                  {
                    icon: <ShieldCheck size={28} />,
                    title: "Global Educators",
                    desc: "Led by internationally trained experts in early childhood pedagogy.",
                  },
                  {
                    icon: <Utensils size={28} />,
                    title: "Organic Meals",
                    desc: "Chef-prepared, nutrient-dense meals to fuel active summer days.",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-5">
                    <div className="bg-white p-4 rounded-2xl text-orange-600 shadow-sm shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-purple-900 mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-500 leading-snug">
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative w-full">
              <div className="absolute -inset-4 bg-orange-400/20 blur-3xl rounded-full"></div>
              <img
                src={summer}
                className="rounded-[3rem] relative z-10 border-[12px] item-center  border-white shadow-2xl w-[480px] h-[420px]"
                alt="Happy Kids"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3.5. Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-black text-center text-purple-900 mb-12">
            Typical Day at Club
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { time: "09:00 AM", task: "Welcome Circle" },
              { time: "10:30 AM", task: "Splash Play" },
              { time: "12:30 PM", task: "Organic Lunch" },
              { time: "02:00 PM", task: "STEM Workshop" },
              { time: "04:00 PM", task: "Farewell" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-100 p-6 rounded-[2rem] text-center"
              >
                <p className="text-orange-500 font-black text-lg mb-1">
                  {item.time}
                </p>
                <p className="text-gray-600 text-sm font-bold uppercase tracking-wide">
                  {item.task}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Gallery */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-purple-900 mb-4">
              Capturing the <span className="text-orange-500">Magic</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Take a peek at the discoveries created at Bluestone Summer Club.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[450px]">
            <div className="md:col-span-2 md:row-span-2 overflow-hidden rounded-[2.5rem] shadow-lg">
              <img
                src={heroBg}
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
                alt="Gallery"
              />
            </div>
            <div className="md:col-span-1 overflow-hidden rounded-[2.5rem] shadow-lg">
              <img
                src={activity1}
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
                alt="Gallery"
              />
            </div>
            <div className="md:col-span-1 overflow-hidden rounded-[2.5rem] shadow-lg">
              <img
                src={activity2}
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
                alt="Gallery"
              />
            </div>
            <div className="md:col-span-2 overflow-hidden rounded-[2.5rem] shadow-lg">
              <img
                src={activity3}
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
                alt="Gallery"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="py-24 bg-[#FAF7F2]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-black text-center text-purple-900 mb-12">
            Summer FAQ
          </h2>
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
              >
                <button
                  className="flex justify-between items-center w-full text-left font-bold text-lg text-purple-900"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  {item.question}
                  <span className="text-orange-500 text-2xl">
                    {openFAQ === index ? "−" : "+"}
                  </span>
                </button>
                {openFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-gray-500 pt-4 border-t border-gray-50 leading-relaxed"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-orange-500 to-purple-700 rounded-[3.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-6">
                Ready for <span className="text-orange-400">Endless Fun?</span>
              </h2>
              <p className="text-xl max-w-2xl mx-auto mb-10 text-purple-100">
                Limited spots available! Give them an unforgettable
                international summer experience.
              </p>
              <button
                onClick={() => navigate("/admissions")}
                className="bg-orange-500 text-white px-12 py-4 rounded-full font-black text-xl hover:bg-white hover:text-orange-600 transition-all shadow-xl"
              >
                Enroll Your Child Today!
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
