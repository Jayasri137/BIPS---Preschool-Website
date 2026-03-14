import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMedia } from "../hooks/useMedia";
import {
  FaRupeeSign,
  FaChartLine,
  FaShieldAlt,
  FaPuzzlePiece,
} from "react-icons/fa";

export default function FranchiseOpportunity() {
  const { getSectionImage } = useMedia("Home");
  const dynamicImg = getSectionImage("Franchise_Banner");
  const features = [
    {
      icon: <FaRupeeSign />,
      title: "Investment Requirement",
      desc: "₹15–20 Lakhs* investment depending on location, city, and preschool size (1500+ sq. ft).",
    },
    {
      icon: <FaChartLine />,
      title: "Long-Term Business Growth",
      desc: "A stable, scalable model designed for consistent returns and long-term success.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Trusted Brand Presence",
      desc: "Associate with a preschool brand focused on quality education, safety, and holistic child development.",
    },
    {
      icon: <FaPuzzlePiece />,
      title: "End-to-End Franchise Support",
      desc: "Complete guidance across setup, curriculum, staff training, marketing, and ongoing operations.",
    },
  ];

  return (
    <section className="bg-[#FFF7ED] py-16 px-6 ">
      <div className="flex md:flex-col-reverse">
      <div className="max-w-6xl mx-auto">

        {/* ===== CENTERED TITLE SECTION ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-orange-500 lg:text-2xl font-semibold mb-3 ">
            Franchise Opportunity
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-800 leading-tight">
            Build a <span className="text-orange-500">Successful Preschool</span>{" "}
            Business <br className="hidden md:block" /> with Bluestone
          </h1>
        </motion.div>

        {/* ===== CONTENT SECTION ===== */}
        <div className="lg:grid-cols-2 gap-8 items-center flex flex-col-reverse md:flex-col-reverse lg:flex-row">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-4 grid md:grid-cols-2 lg:grid-cols-1"
          >
            {features.map((item, index) => (  
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="flex gap-4 items-start"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-200 text-orange-500 text-xl shrink-0">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-purple-800 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >

             {/* FIXED RATIO CONTAINER */}
                      <div className="relative w-[260px] md:w-[380px] aspect-square">
            
                        {/* BIG IMAGE */}
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                          <img
                            src={dynamicImg}
                            alt="Kids reading"
                            className="w-full h-full object-cover"
                          />
                        </div>
         {/* ORANGE DOT 1 */}
            <span
              className="absolute bg-orange-400 rounded-full"
              style={{
                width: "24%",
                height: "24%",
                bottom: "-4%",
                left: "7%",
                  background:
          "radial-gradient(circle at 30% 30%, #FDBA74, #F97316)",
              }}
            />

            {/* ORANGE DOT 2 */}
            <span
              className="absolute bg-orange-400 rounded-full"
              style={{
                width: "8%",
                height: "8%",
                bottom: "-12%",
                left: "-5%",
              
           background:
          "radial-gradient(circle at 30% 30%, #FED7AA, #FB923C)",
              }}
            />
          </div>
       
          </motion.div>

        </div>
      </div>
      </div>
    </section>
  );
}