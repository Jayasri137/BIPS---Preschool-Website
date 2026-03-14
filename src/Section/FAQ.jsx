import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "What teaching methodology does Bluestone Preschool use?",
    answer:
      "We use a play-based and experiential learning approach that encourages curiosity, creativity, and independent thinking in young children.",
  },
  {
    question: "What are the school timings?",
    answer:
      "Our preschool operates in flexible half-day and full-day programs depending on the age group and selected curriculum.",
  },
  {
    question: "Do you provide daycare facilities?",
    answer:
      "Yes, we offer safe and nurturing daycare services with age-appropriate activities, supervised by trained caregivers.",
  },
  {
    question: "How are teachers trained at Bluestone Preschool?",
    answer:
      "All our teachers undergo regular training in early childhood education, child psychology, classroom safety, and modern teaching practices.",
  },
  {
    question: "What is the student-to-teacher ratio?",
    answer:
      "We maintain a low student-to-teacher ratio to ensure personalized attention and effective learning for every child.",
  },
  {
    question: "Do you focus on extracurricular activities?",
    answer:
      "Yes, we include music, dance, art, storytelling, physical play, and sensory activities as part of our holistic development program.",
  },
  {
    question: "How do you handle children with special needs?",
    answer:
      "We follow an inclusive approach and work closely with parents to support children based on their individual developmental needs.",
  },
  {
    question: "What safety and hygiene measures are followed?",
    answer:
      "We follow strict hygiene protocols, regular sanitization, child-safe infrastructure, and health monitoring to ensure a safe environment.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-[#FFF7ED] py-20 px-6">
      <div className="max-w-7xl mx-auto text-center lg:text-left">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-orange-500 text-2xl font-semibold mb-3">
            Need Help?
          </p>

          <h2 className="text-3xl md:text-5xl lg:text-5xl font-extrabold text-purple-800">
            Frequently Asked{" "}
            <span className="text-orange-500">Questions</span>
          </h2>
        </motion.div>

        {/* FAQ GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm p-4"
            >
              {/* QUESTION */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left"
              >
                <span className="text-[#1F2B6C] font-semibold text-lg">
                  {faq.question}
                </span>

                <span className="w-5 h-5 flex items-center text-sm justify-center rounded-md bg-orange-500 text-white">
                  {activeIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </button>

              {/* ANSWER */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-gray-600 text-left leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
