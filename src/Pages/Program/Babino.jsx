import { motion } from "framer-motion";
import { FaBrain, FaCommentDots, FaUsers, FaPalette } from "react-icons/fa";
import { GiMuscleUp, GiAchievement } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useMedia } from "../../hooks/useMedia";
import SEO from "../../SEO";

export default function BambinoProgram() {
  const { getSectionImage } = useMedia("Program_Details");
  const { getSectionImage: getProgImage } = useMedia("Programs");

  const nestlersImg = getProgImage("Bambino_Header");
  const girl = getSectionImage("Bambino_Girl");
  const tree = getSectionImage("Bambino_Tree");

  const navigate = useNavigate();
  const skills = [
    {
      icon: <FaBrain className="text-[#1A2E6B] text-2xl" />,
      title: "Early Thinking & Problem-Solving",
      text: "Children explore, observe, and find simple solutions through play-based and hands-on activities that strengthen memory and focus.",
    },
    {
      icon: <FaCommentDots className="text-[#1A2E6B] text-2xl" />,
      title: "Language & Communication Skills",
      text: "Builds vocabulary and confidence as children express thoughts, needs, and emotions through daily interaction and storytelling.",
    },
    {
      icon: <FaUsers className="text-[#1A2E6B] text-2xl" />,
      title: "Social & Emotional Skills",
      text: "Encourages sharing, cooperation, and emotional understanding while interacting with peers and teachers.",
    },
    {
      icon: <GiMuscleUp className="text-[#1A2E6B] text-2xl" />,
      title: "Fine & Gross Motor Skills",
      text: "Strengthens hand control, balance, and coordination through art, movement, and play-based activities.",
    },
    {
      icon: <FaPalette className="text-[#1A2E6B] text-2xl" />,
      title: "Creativity & Imagination",
      text: "Nurtures creativity through music, storytelling, role play, and art-based exploration.",
    },
    {
      icon: <GiAchievement className="text-[#1A2E6B] text-2xl" />,
      title: "Confidence & Daily Independence",
      text: "Helps children develop routines, self-care habits, and confidence in everyday classroom activities.",
    },
  ];
  return (
    <div className="bg-[#FAF7F2] text-gray-900 overflow-hidden">
      <SEO
        title="Bambino Program (3-4 Years)"
        description="The Bambino program for children aged 3–4 years nurtures natural curiosity through play-based and experiential learning."
        url="/program/bambino"
        image={nestlersImg}
      />

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="min-h-[75vh] flex flex-col lg:gap-20 md:flex-row items-center px-6 md:px-16 lg:px-30 py-6 md:py-12 bg-gradient-to-b from-[#5c69ba] to-[#fff]">
        
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-center md:text-left md:w-1/2"
        >
          <p className="text-lg text-orange-600 font-bold mb-2">
            🧸 A Confident Step Into Early Learning
          </p>

          <h1 className="text-4xl md:text-4xl lg:text-5xl font-extrabold text-[#2D2A55] leading-snug">
            Bambino
          </h1>

          <p className="mt-4 text-base md:text-medium text-gray-700 lg:leading-relaxed md:leading-tight">
            Our Bambino program is thoughtfully designed for children aged 3–4 years,
            focusing on building curiosity, communication, and confidence through guided play
            and structured learning experiences.
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
            src={girl}
            alt="Happy Preschool Girl"
            className="relative h-[200px] md:h-[400px] w-auto object-cover md:object-contain drop-shadow-3xl"
          />
        </motion.div>
      </section>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <section className="px-6 md:px-16 lg:px-30 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start bg-white">
        
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
            Building Curiosity Through <span className="text-orange-500">Playful Learning</span>
            </h2>
            <p className="text-gray-700 text-[15px] md:text-[16px] leading-relaxed">
              The Bambino program nurtures curiosity and self-expression during a crucial stage of early childhood. 
              Through a balance of play-based and guided activities, children develop language skills, 
              thinking abilities, and social confidence in a joyful and supportive learning environment.
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
            Program Details – <span className="text-orange-500"> Bambino</span>
          </h3>

          <ul className="space-y-6 text-base text-[80%] md:text-[80%] lg:text-[100%]">
            {[
              ["👶 Age", "3 – 4 Years"],
              ["🕘 Class Timing", "9:30 AM – 12:30 PM"],
              ["📅 Duration", "Academic Year (Jun – Mar)"],
              ["🎨 Activities", "Storytelling, Music, Art & play"],
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
            Enroll Your Kids
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
      Through guided play, interactive activities, and creative exploration, children begin developing 
      early learning skills while building confidence and independence in a joyful environment.
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
        "Recognize letters, numbers, colors, and shapes",
        "Communicate ideas using words and simple sentences",
        "Follow classroom routines and multi-step instructions",
        "Build early number sense",
        "Enjoy stories, rhymes, music, and role play",
        "Develop early problem-solving and thinking skills",
      ].map((item, i) => (
        <motion.li
          key={i}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          className="rounded-xl text-lg font-bold text-gray-700"
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
        <p className="text-orange-500 font-bold text-lg">
          Growing Every Day
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#2D2A55] leading-tight">
          Essential Skills for Early{" "}
          <span className="text-orange-500">Development</span>
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
