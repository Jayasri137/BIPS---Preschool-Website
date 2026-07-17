import { motion } from "framer-motion";
import { FaBrain, FaCommentDots, FaUsers, FaPalette } from "react-icons/fa";
import { GiMuscleUp, GiAchievement } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useMedia } from "../../hooks/useMedia";
import SEO from "../../SEO";

export default function BsrProgram() {
  const { getSectionImage } = useMedia("Program_Details");
  const { getSectionImage: getProgImage } = useMedia("Programs");

  const nestlersImg = getProgImage("Senior_Header");
  const two = getSectionImage("Senior_Boy");
  const tree = getSectionImage("Senior_Tree");

  const navigate = useNavigate();
  const skills = [
    {
      icon: <FaBrain className="text-[#1A2E6B] text-2xl" />,
      title: "Academic Readiness",
      text: "Helps children build confidence in reading, writing, and basic numeracy through structured classroom practice.",
    },
    {
      icon: <FaCommentDots className="text-[#1A2E6B] text-2xl" />,
      title: "Effective Communication Skills",
      text: "Develops clear speaking, listening, and comprehension skills needed for classroom participation.",
    },
    {
      icon: <FaUsers className="text-[#1A2E6B] text-2xl" />,
      title: "Social Maturity & Emotional Confidence",
      text: "Supports emotional regulation, cooperation, responsibility, and respect within group learning environments.",
    },
    {
      icon: <GiMuscleUp className="text-[#1A2E6B] text-2xl" />,
      title: "Writing & Physical Coordination",
      text: "Strengthens pencil control, posture, and motor coordination required for sustained classroom activities.",
    },
    {
      icon: <FaPalette className="text-[#1A2E6B] text-2xl" />,
      title: "Creative Thinking",
      text: "Encourages originality, expression, and imagination through art, storytelling, and role play.",
    },
    {
      icon: <GiAchievement className="text-[#1A2E6B] text-2xl" />,
      title: "Independence & School Discipline",
      text: "Builds focus, responsibility, and self-management skills essential for primary school success.",
    },
  ];
  return (
    <div className="bg-[#FAF7F2] text-gray-900 overflow-hidden">
      <SEO
        title="B Senior Program (5-6 Years)"
        description="Our B Senior program prepares children aged 5–6 years for primary school, emphasizing literacy, numeracy, critical thinking, and social-emotional readiness."
        url="/program/b-senior"
        image={nestlersImg}
      />

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="min-h-[75vh] flex flex-col md:flex-row items-center px-6 md:px-16 lg:px-30 lg:gap-12 py-6 lg:py-12 bg-gradient-to-b from-[#ccce67] to-[#fff]">
        
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-center md:text-left md:w-1/2"
        >
          <p className="text-lg text-orange-600 font-bold leading-tight">
            🧸 Preparing Children for Primary School
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2D2A55] leading-snug">
            B Senior
          </h1>

          <p className="mt-4 text-base md:text-lg text-gray-700 md:leading-tight lg:leading-relaxed">
            Our B Senior program is designed for children aged 5–6 years, focusing on school readiness, 
            confidence, and independence. Through structured learning and engaging activities, children 
            build strong literacy, numeracy, and problem-solving skills.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admissions")}
            className="mt-4 mb-0 px-8 py-3 rounded-full border-2 border-orange-500
                             text-orange-500 font-semibold
                             hover:bg-orange-500 hover:text-white transition"
          >
            Enroll Now
          </motion.button>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative md:flex justify-center items-end md:w-1/2 mt-10 md:mt-0"
        >
          <div className="absolute md:bottom-24 w-60 md:w-80 h-60 md:h-80 bg-white/20 blur-3xl rounded-full" />
          <img
            src={two}
            alt="Happy Preschool Girl"
            className="relative h-[200px] md:h-[400px] w-auto object-cover md:object-contain drop-shadow-3xl"
          />
        </motion.div>
      </section>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <section className="px-6 md:px-16 lg:px-30 py-16 grid grid-cols-1 md:grid-cols-2 lg:gap-25 md:gap-12 items-start bg-white">
        
        <section className="grid gap-10">
          {/* IMAGE */}
          <motion.img
            src={nestlersImg}
            alt="Kids Learning"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl shadow-xl w-full h-[220px] md:h-[300px] object-cover"
          />

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h6 className="text-orange-500 font-bold mb-2">About this Program</h6>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2D2A55] leading-tight mb-4">
             Growing Ready for  <span className="text-orange-500">School</span>
            </h2>
            <p className="text-gray-700 text-[15px] md:text-[16px] leading-relaxed sm:mb-8 md:mb-0">
              The B Senior program prepares children for formal schooling by strengthening academic foundations 
              and life skills. With a structured yet supportive approach, children gain confidence, 
              discipline, and the ability to think independently in a classroom environment.
            </p>
          </motion.div>
        </section>

        {/* DETAILS CARD */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#F0EFEC] rounded-3xl shadow-xl p-8 h-full"
        >
          <h3 className="text-2xl font-extrabold text-[#1A2E6B] mb-8">
            Program Details – <span className="text-orange-500">B Senior</span>
          </h3>

          <ul className="space-y-6 text-base text-[80%] md:text-[80%] lg:text-[100%]">
            {[
              ["👶 Age", "5 – 6 Years"],
              ["🕘 Class Timing", "9:15 AM – 01:30 PM"],
              ["📅 Duration", "Academic Year (Jun – Mar)"],
              ["🎨 Activities", "Reading, Writing & Math"],
              ["👩‍🏫 Teacher–Child Ratio", "1:15"],
              ["🗣 Language", "English"],
              ["🎓 Certification", "Yes"]
            ].map(([label, value], i) => (
              <li key={i} className="flex justify-between">
                <span className="text-[#1A2E6B] font-bold">{label}</span>
                <h6>{value}</h6>
              </li>
            ))}
          </ul>

            <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/admissions")}
            className="w-full bg-orange-500 text-white font-semibold py-3 rounded-full mt-10 hover:bg-orange-400"
          >
            Enroll Your Kid
          </motion.button>
        </motion.div>
      </section>

      {/* ---------------- OUTCOMES ---------------- */}
<section className="bg-[#fff7ea] px-6 md:px-16 lg:px-30 py-16">
     <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 items-center">
  {/* Heading */}
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="mb-10"
  >
    <h6 className="text-orange-500 text-lg font-bold mb-2">Key Learning Outcomes</h6>
    <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2D2A55] leading-tight mb-4">
      What Your Child Will <span className="text-orange-500">Learn</span>
    </h3>
    <p className="text-gray-600 text-base md:text-lg font-medium mb-4">
     Through structured academic learning and guided practice, children gain the skills and confidence needed
      for a smooth transition into primary school.
    </p>
  

  {/* Grid with list + image side by side */}
 

    {/* LIST */}
    <motion.ul
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15 },
        },
      }}
      className="space-y-4"
    >
      {[
        "Read simple words and identify letter–sound relationships",
        "Write letters and words with proper formation",
        "Perform basic number operations and logical comparisons",
        "Follow classroom rules, routines, and task instructions independently",
        "Apply reasoning and problem-solving in guided activities",
       
      ].map((item, i) => (
        <motion.li
          key={i}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          className="rounded-xl text-medium font-bold text-gray-700"
        >
          ✨ {item}
        </motion.li>
      ))}
    </motion.ul>

</motion.div>
    {/* IMAGE RIGHT */}
    <motion.img
      src={tree}
      alt="Learning Tree"
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="rounded-3xl w-[480px] h-[320px] md:h-[480px] object-fit"
    />
  </div>
</section>
 <section className="bg-white px-6 md:px-16 lg:px-30 py-20">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-orange-500 font-semibold text-lg mb-4">
          Preparing for the Next Step
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2D2A55] leading-tight">
         Skills That  
          <span className="text-orange-500"> Prepare Children </span>for Primary School{" "}
        </h2>
      </motion.div>

      {/* GRID CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.07 }}
            className="bg-white rounded-2xl shadow-lg px-4 py-4 border border-gray-100 flex gap-4 items-start hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Icon Container */}
            <div className="bg-[#FFE6B8] w-12 h-12 flex items-center justify-center rounded-xl shadow-sm">
              {skill.icon}
            </div>

            {/* Text */}
            <div>
              <h4 className="font-bold text-[#1A2E6B] text-lg mb-1">
                {skill.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {skill.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    </div>
  );
}
