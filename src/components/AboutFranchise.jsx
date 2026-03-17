import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { AlertCircle, CheckCircle, X, Loader2 } from "lucide-react";
import {
  FaSchool,
  FaChartLine,
  FaHandsHelping,
  FaBookReader,
  FaChalkboardTeacher,
  FaBullhorn,
  FaCogs,
  FaChevronLeft,
  FaChevronRight,
  FaRupeeSign,
  FaClock,
} from "react-icons/fa";

import { useMedia } from "../hooks/useMedia";

/* ================= MANUAL CAROUSEL ================= */
function ManualCarousel({ items }) {
  const ref = useRef(null);
  const scroll = (dir) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: dir === "next" ? 340 : -340,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll("prev")}
        className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-purple-800 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={() => scroll("next")}
        className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-purple-800 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
      >
        <FaChevronRight />
      </button>

      <div
        ref={ref}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-6 scroll-smooth"
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="min-w-[300px] sm:min-w-[320px] bg-white rounded-3xl p-10 shadow-lg flex flex-col items-center text-center"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
              style={{
                backgroundColor: item.color,
                color: "white",
                fontSize: "1.8rem",
              }}
            >
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-gray-700 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Franchise() {
  const { getSectionImage } = useMedia("Home");
  const heroImg = getSectionImage("Franchise_Hero");
  const franchiseImg = getSectionImage("Franchise_Growth");
  const franImg = getSectionImage("Franchise_Enquiry");

  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  // VALIDATION LOGIC
  const validate = () => {
    let tempErrors = {};
    if (!formValues.fullName.trim())
      tempErrors.fullName = "Full Name is required*";

    // Email Validation
    if (!formValues.email.trim()) {
      tempErrors.email = "Email is required*";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    // Phone Validation
    if (!formValues.phone.trim()) {
      tempErrors.phone = "Phone number is required*";
    } else if (formValues.phone.length < 10) {
      tempErrors.phone = "Enter a valid 10-digit number";
    }

    if (!formValues.city.trim()) tempErrors.city = "Target City is required*";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // BLOCK ALPHABETS: Only update if value is numeric or empty
    if (name === "phone") {
      if (value !== "" && !/^\d+$/.test(value)) return;
      if (value.length > 10) return; // Prevent more than 10 digits
    }

    setFormValues({ ...formValues, [name]: value });

    // Clear error message when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trigger validation on click
    if (!validate()) return;

    setIsSubmitting(true);
    setSuccess("");

    const API_BASE = "https://bluestoneinternationalpreschool.com/api";

    try {
      const response = await fetch(`${API_BASE}/franchise`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (response.ok) {
        setSuccess("success");
        setFormValues({
          fullName: "",
          email: "",
          phone: "",
          city: "",
          message: "",
        });
      } else {
        setSuccess("error");
      }
    } catch (error) {
      setSuccess("connection_error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSuccess(""), 5000);
    }
  };

  const items = [
    {
      icon: <FaSchool />,
      title: "End-to-End School Setup",
      desc: "Site planning, interiors, safety norms, branding & launch.",
      color: "#8B5CF6",
    },
    {
      icon: <FaBookReader />,
      title: "International Curriculum",
      desc: "Play-based global curriculum & learning kits.",
      color: "#EC4899",
    },
    {
      icon: <FaChalkboardTeacher />,
      title: "Teacher Training",
      desc: "Recruitment, onboarding & continuous development.",
      color: "#F59E0B",
    },
    {
      icon: <FaBullhorn />,
      title: "Marketing & Admissions",
      desc: "Launch campaigns, digital creatives & lead generation.",
      color: "#10B981",
    },
    {
      icon: <FaCogs />,
      title: "Operations & ERP",
      desc: "ERP, SOPs, fee management & parent communication.",
      color: "#3B82F6",
    },
    {
      icon: <FaHandsHelping />,
      title: "Lifetime Mentorship",
      desc: "Audits, performance reviews & expansion support.",
      color: "#EF4444",
    },
  ];

  const roi = [
    {
      title: "Initial Investment",
      value: "₹15–25 Lakhs",
      icon: <FaRupeeSign />,
    },
    { title: "Breakeven Period", value: "18–24 Months", icon: <FaClock /> },
    { title: "Annual ROI", value: "35–45%", icon: <FaChartLine /> },
  ];

  const processSteps = [
    {
      step: "Submit Enquiry",
      desc: "Share your basic details and interest in starting a preschool franchise.",
    },
    {
      step: "Discussion & Location Review",
      desc: "Our experts evaluate your location, budget, and market potential.",
    },
    {
      step: "Agreement & Onboarding",
      desc: "Sign the franchise agreement and get onboarded into our system.",
    },
    {
      step: "School Setup & Training",
      desc: "Infrastructure setup, curriculum planning, and staff training begin.",
    },
    {
      step: "Marketing & Admissions",
      desc: "Launch marketing campaigns and start student admissions with our support.",
    },
    {
      step: "Grand Opening 🎉",
      desc: "Your preschool opens successfully with full operational support.",
    },
  ];

  const scrollToEnquiry = () => {
    document
      .getElementById("franchise-enquiry")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* FLOATING SUCCESS/ERROR ALERT */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-24 right-6 z-[999] flex items-center gap-4 p-5 rounded-2xl shadow-2xl border-l-8 bg-white max-w-sm"
            style={{
              borderLeftColor: success === "success" ? "#22c55e" : "#ef4444",
            }}
          >
            <div
              className={`p-2 rounded-full ${success === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
            >
              {success === "success" ? (
                <CheckCircle size={24} />
              ) : (
                <AlertCircle size={24} />
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-purple-900">
                {success === "success"
                  ? "Application Sent!"
                  : "Submission Failed"}
              </h4>
              <p className="text-xs text-gray-500">
                {success === "success"
                  ? "We will contact you soon."
                  : "Check your internet or form fields."}
              </p>
            </div>
            <button
              onClick={() => setSuccess("")}
              className="text-gray-300 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative h-[85vh] flex items-center justify-center">
        <img
          src={heroImg}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-purple-700/80 to-orange-500/80" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <h1 className="text-3xl md:text-6xl font-extrabold text-white mb-6">
            <span className="text-orange-400"> Franchise </span>Opportunity
          </h1>
          <p className="text-white/90 text-sm md:text-lg mb-10">
            Build a future-ready international preschool with strong systems &
            support.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.button
              whileHover={{ scale: 1.04 }}
              onClick={scrollToEnquiry}
              className="px-8 py-3 rounded-full bg-transparent border border-white text-white font-bold shadow-lg hover:bg-white hover:text-purple-900 transition"
            >
              Apply for Franchise
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              onClick={() =>
                document
                  .getElementById("why")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 rounded-full bg-orange-500 text-white font-bold shadow-lg hover:bg-white hover:text-orange-400 transition"
            >
              Why Partner With Us
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* HIGHLIGHT SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-purple-800 mb-6">
              Why Our Franchise Model Stands Out
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Our franchise system is designed for entrepreneurs who want a
              low-risk, high-impact opportunity. We provide end-to-end support,
              from site selection to teacher training and marketing.
            </p>
            <ul className="space-y-4 text-gray-700 font-semibold">
              <li>✔ Comprehensive operational support</li>
              <li>✔ Proven international curriculum</li>
              <li>✔ Continuous mentorship and audits</li>
              <li>✔ Scalable multi-center growth opportunities</li>
            </ul>
            <button
              onClick={scrollToEnquiry}
              className="mt-8 px-8 py-3 rounded-full bg-orange-400 text-white font-bold shadow-lg hover:bg-orange-600 transition"
            >
              Become a Franchise Partner
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src={franchiseImg}
              alt="Growth"
              className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* WHAT WE PROVIDE (CAROUSEL) */}
      <section className="py-24 bg-[#FFF7ED]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-purple-800 text-center mb-14">
            What We Provide
          </h2>
          <ManualCarousel items={items} />
        </div>
      </section>

      {/* ENQUIRY & PROCESS */}
      <section
        id="franchise-enquiry"
        className="py-28 bg-gradient-to-r from-purple-800 to-orange-500"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* FORM */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl"
            >
              <h3 className="text-3xl font-black text-purple-900 mb-2 text-center">
                Partner With Us
              </h3>
              <p className="text-gray-500 text-center mb-8 text-sm font-medium">
                Fields marked with (*) are mandatory
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    name="fullName"
                    value={formValues.fullName}
                    onChange={handleChange}
                    placeholder="Full Name *"
                    className={`w-full px-6 py-4 rounded-2xl bg-gray-50 border outline-none transition-all ${errors.fullName ? "border-red-500 ring-4 ring-red-500/10" : "border-gray-200 focus:ring-2 focus:ring-purple-500"}`}
                  />
                  {errors.fullName && (
                    <span className="text-red-600 text-[11px] font-bold uppercase ml-2 mt-1 block">
                      {errors.fullName}
                    </span>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      placeholder="Email Address *"
                      className={`w-full px-6 py-4 rounded-2xl bg-gray-50 border outline-none transition-all ${errors.email ? "border-red-500 ring-4 ring-red-500/10" : "border-gray-200 focus:ring-2 focus:ring-purple-500"}`}
                    />
                    {errors.email && (
                      <span className="text-red-600 text-[11px] font-bold uppercase ml-2 mt-1 block">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div>
                    <input
                      name="phone"
                      value={formValues.phone}
                      onChange={handleChange}
                      placeholder="Phone Number *"
                      className={`w-full px-6 py-4 rounded-2xl bg-gray-50 border outline-none transition-all ${errors.phone ? "border-red-500 ring-4 ring-red-500/10" : "border-gray-200 focus:ring-2 focus:ring-purple-500"}`}
                    />
                    {errors.phone && (
                      <span className="text-red-600 text-[11px] font-bold uppercase ml-2 mt-1 block">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    name="city"
                    value={formValues.city}
                    onChange={handleChange}
                    placeholder="Proposed City *"
                    className={`w-full px-6 py-4 rounded-2xl bg-gray-50 border outline-none transition-all ${errors.city ? "border-red-500 ring-4 ring-red-500/10" : "border-gray-200 focus:ring-2 focus:ring-purple-500"}`}
                  />
                  {errors.city && (
                    <span className="text-red-600 text-[11px] font-bold uppercase ml-2 mt-1 block">
                      {errors.city}
                    </span>
                  )}
                </div>
                <textarea
                  name="message"
                  value={formValues.message}
                  onChange={handleChange}
                  placeholder="Your Message (Optional)"
                  rows="3"
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-all"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 rounded-2xl bg-orange-500 text-white font-black text-lg hover:bg-orange-600 transition-all shadow-xl flex justify-center items-center gap-3 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" /> Processing...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </form>
            </motion.div>

            {/* TIMELINE */}
            <div>
              <h2 className="text-4xl font-extrabold text-white mb-10">
                Franchise Process
              </h2>
              <div className="relative space-y-8">
                <div className="absolute left-7 top-0 h-full w-[3px] bg-white/20 rounded-full" />
                {processSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="relative flex items-start gap-8"
                  >
                    <div className="relative z-10 w-14 h-14 rounded-full bg-white border-4 border-orange-400 text-purple-800 font-extrabold flex items-center justify-center shadow-lg shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {step.step}
                      </h4>
                      <p className="text-black font-medium text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT & ROI */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-purple-800 text-center mb-16">
            Investment & ROI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {roi.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="relative bg-gradient-to-br from-purple-500 to-orange-300 border border-gray-100 rounded-3xl p-12 text-center shadow-sm hover:shadow-2xl transition-all"
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-3xl bg-orange-500 text-white text-4xl mb-6 mx-auto shadow-lg">
                  {item.icon}
                </div>
                <h4 className="text-purple-800 font-black uppercase text-xs tracking-widest mb-2">
                  {item.title}
                </h4>
                <p className="text-3xl font-black text-gray-900">
                  {item.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-r from-purple-800 to-orange-400 rounded-[3rem] p-16 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-black mb-6">Start Your Journey</h2>
              <p className="text-purple-200 text-lg mb-10 max-w-2xl mx-auto font-medium">
                Partner with a trusted international preschool brand and build a
                future-ready educational institution.
              </p>
              <button
                onClick={scrollToEnquiry}
                className="px-12 py-5 rounded-full bg-orange-500 text-white font-black text-xl hover:scale-105 transition shadow-2xl"
              >
                Enquire Now
              </button>
            </div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
