import { motion } from "framer-motion";
import { FaCalendarCheck, FaChild, FaSchool } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMedia } from "../hooks/useMedia";
import SEO from "../SEO";


export default function ScheduleVisit() {
  const { getSectionImage } = useMedia("General");
  const school = getSectionImage("Schedule_Visit_Side");
  return (
    <section className="bg-[#FFF7ED] min-h-screen">
      <SEO 
        title="Schedule a Visit"
        description="Experience our joyful learning environment firsthand. Book a visit to Bluestone International Preschool today."
        url="/schedule-visit"
      />

      {/* HERO */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#74207E] to-purple-900">
        <div className="relative min-h-[85vh] flex items-start justify-center overflow-hidden pt-24 md:pt-38 px-4 sm:px-6 lg:px-8">
<div
    className="absolute inset-0 bg-cover bg-center scale-110"
    style={{
      backgroundImage: `url(${school})`,  
    }}
  />
   <div className="absolute inset-0 bg-gradient-to-br 
    from-purple-900/70 
    via-purple-700/80 
    to-orange-500/70" />


          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 max-w-6xl mx-auto px-6 text-center"
          >
            <p className="text-orange-400 text-xl font-semibold mb-3">
              Visit Our Campus
            </p>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">
              Schedule a <span className="text-orange-400">School Visit</span>
            </h1>

            <p className="mt-6 text-white/90 text-xl text-center">
              Experience our joyful learning environment, meet our educators,
              and see how Bluestone nurtures young minds.
            </p>

            {/* <div className="flex gap-8 mt-8 ">
              <div className="flex items-center gap-2">
                <FaChild className="text-orange-400" />
                <span>Safe & Caring</span>
              </div>
              <div className="flex items-center gap-2">
                <FaSchool className="text-orange-400" />
                <span>Global Curriculum</span>
              </div>
            </div> */}
          </motion.div>

          {/* IMAGE COLLAGE */}
         
        </div>
      </div>

      {/* BENEFITS */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8 text-center">
        {[
          {
            icon: <FaCalendarCheck />,
            title: "Easy Scheduling",
            desc: "Book your visit instantly with our live calendar.",
          },
          {
            icon: <FaChild />,
            title: "Child-Friendly Campus",
            desc: "Designed for safety, creativity, and exploration.",
          },
          {
            icon: <FaSchool />,
            title: "Meet Our Educators",
            desc: "Interact with trained teachers and staff.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="bg-white p-8 rounded-3xl shadow-lg"
          >
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-orange-100 text-orange-500 text-2xl mb-4">
              {item.icon}
            </div>
            <h3 className="font-bold text-lg text-[#1F2B6C] mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CAL.COM EMBED */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="bg-orange-400 text-white p-6 text-center">
            <h2 className="text-2xl font-bold">
              Book Your Visit
            </h2>
            <p className="text-white/90 mt-1">
              Select a date & time that works best for you
            </p>
          </div>

          {/* Cal.com iframe */}
          <div className="h-[750px]">
            <iframe
              src="https://cal.com/bluestone-igcmyt/pre-school"       
              width="100%"
              height="100%"
              frameBorder="0"
              title="Schedule a Visit"
              className="rounded-b-3xl"
            />
          </div>
        </motion.div>
      </div>

    </section>
  );
}
