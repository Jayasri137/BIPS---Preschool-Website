import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useRef, useEffect } from "react";
import {
  AlertCircle, CheckCircle, X, Loader2, PlayCircle, Plus, Minus, ChevronRight
} from "lucide-react";
import {
  FaGraduationCap,
  FaCalendarAlt,
  FaChartLine,
  FaHandsHelping,
  FaBookReader,
  FaChalkboardTeacher,
  FaBullhorn,
  FaCogs,
  FaLaptopCode,
  FaMobileAlt,
  FaRupeeSign,
  FaCheck,
  FaImages
} from "react-icons/fa";
import { FaMale, FaFemale } from "react-icons/fa";
import TestimonialCard from "../styles/TestimonialCards";

import { useMedia } from "../hooks/useMedia";
import SEO from "../SEO";
import Captcha from "./Captcha";

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
        className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10 bg-purple-800 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
      >
        <span className="text-xl">{"<"}</span>
      </button>
      <button
        onClick={() => scroll("next")}
        className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 bg-purple-800 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
      >
        <span className="text-xl">{">"}</span>
      </button>

      <div
        ref={ref}
        className="flex gap-6 overflow-x-auto scrollbar-hide pb-6 scroll-smooth px-4"
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="min-w-[300px] sm:min-w-[320px] bg-white rounded-[2rem] p-8 shadow-xl flex flex-col items-center text-center border border-gray-100"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-md"
              style={{
                backgroundColor: item.color,
                color: "white",
                fontSize: "2rem",
              }}
            >
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-purple-900">{item.title}</h3>
            {item.list ? (
              <ul className="text-gray-600 text-sm space-y-2 text-left w-full mt-2">
                {item.list.map((li, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <FaCheck className="text-green-500 mt-1 shrink-0" size={12} />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-sm">{item.desc}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const FAQItem = ({ faq, index, activeIndex, toggleFAQ }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100"
  >
    <button
      onClick={() => toggleFAQ(index)}
      className="w-full flex justify-between items-center text-left"
    >
      <span className="text-purple-900 font-bold text-lg pr-4">
        {faq.question}
      </span>
      <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-orange-100 text-orange-500">
        {activeIndex === index ? <Minus size={18} /> : <Plus size={18} />}
      </span>
    </button>
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
);

export default function Franchise() {
  const { getSectionImage } = useMedia("Home");
  const { media: galleryMedia } = useMedia("Gallery");
  const heroImg = getSectionImage("Franchise_Hero");

  // Get dynamic images from "General" section for the Gallery
  const galleryImages = galleryMedia["General"]?.map(img => img.image_url) || [];

  // State
  const [formValues, setFormValues] = useState({
    fullName: "",
    phone: "",
    city: "",
    email: "",
    investmentBudget: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [currentCaptcha, setCurrentCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [franchiseReviews, setFranchiseReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com";

  useEffect(() => {
    // Show popup after a brief delay
    const timer = setTimeout(() => setShowPopup(true), 800);

    const fetchFranchiseReviews = async () => {
      try {
        const res = await fetch(`${API_BASE}/testimonials?type=franchise`);
        if (!res.ok) throw new Error("Failed to fetch testimonials");
        const data = await res.json();
        const franchiseData = Array.isArray(data)
          ? data.filter(item => item.testimonial_type?.toLowerCase?.() === "franchise")
          : [];
        setFranchiseReviews(franchiseData);
      } catch (error) {
        console.error("Failed to load franchise testimonials:", error);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchFranchiseReviews();
    return () => clearTimeout(timer);
  }, []);

  const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input name="fullName" value={formValues.fullName} onChange={handleChange} placeholder="Name *" className={`w-full px-4 py-2.5 rounded-xl bg-gray-50 border outline-none text-sm ${errors.fullName ? "border-red-500" : "border-gray-200 focus:border-purple-500"}`} />
        {errors.fullName && <span className="text-red-500 text-[11px] ml-2">{errors.fullName}</span>}
      </div>
      <div>
        <input name="phone" value={formValues.phone} onChange={handleChange} placeholder="Mobile Number *" className={`w-full px-4 py-2.5 rounded-xl bg-gray-50 border outline-none text-sm ${errors.phone ? "border-red-500" : "border-gray-200 focus:border-purple-500"}`} />
        {errors.phone && <span className="text-red-500 text-[11px] ml-2">{errors.phone}</span>}
      </div>
      <div>
        <input name="city" value={formValues.city} onChange={handleChange} placeholder="City *" className={`w-full px-4 py-2.5 rounded-xl bg-gray-50 border outline-none text-sm ${errors.city ? "border-red-500" : "border-gray-200 focus:border-purple-500"}`} />
        {errors.city && <span className="text-red-500 text-[11px] ml-2">{errors.city}</span>}
      </div>
      <div>
        <input name="email" value={formValues.email} onChange={handleChange} placeholder="Email *" className={`w-full px-4 py-2.5 rounded-xl bg-gray-50 border outline-none text-sm ${errors.email ? "border-red-500" : "border-gray-200 focus:border-purple-500"}`} />
        {errors.email && <span className="text-red-500 text-[11px] ml-2">{errors.email}</span>}
      </div>
      <div>
        <select name="investmentBudget" value={formValues.investmentBudget} onChange={handleChange} className={`w-full px-4 py-2.5 rounded-xl bg-gray-50 border outline-none text-sm text-gray-600 ${errors.investmentBudget ? "border-red-500" : "border-gray-200 focus:border-purple-500"}`}>
          <option value="">Select Investment Budget *</option>
          <option value="15-20 Lakhs">₹15 Lakhs - ₹20 Lakhs</option>
          <option value="20-30 Lakhs">₹20 Lakhs - ₹30 Lakhs</option>
          <option value="30+ Lakhs">₹30+ Lakhs</option>
        </select>
        {errors.investmentBudget && <span className="text-red-500 text-[11px] ml-2">{errors.investmentBudget}</span>}
      </div>
      
      <div className="pt-1">
        <Captcha onCaptchaGenerate={handleCaptchaGenerate} variant="light" />
        <input type="text" placeholder="Enter Captcha Code *" value={userCaptcha} onChange={(e) => setUserCaptcha(e.target.value)} className="w-full mt-2 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-purple-500 text-sm" required />
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full py-3 mt-1 rounded-xl bg-orange-500 text-white font-bold text-base hover:bg-orange-600 transition shadow-lg flex justify-center items-center gap-2">
        {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Submitting...</> : "Submit"}
      </button>
    </form>
  );

  const handleCaptchaGenerate = useCallback((code) => {
    setCurrentCaptcha(code);
    setUserCaptcha("");
  }, []);

  const validate = () => {
    let tempErrors = {};
    if (!formValues.fullName.trim()) tempErrors.fullName = "Name is required*";

    if (!formValues.phone.trim()) {
      tempErrors.phone = "Mobile Number is required*";
    } else if (formValues.phone.length < 10) {
      tempErrors.phone = "Enter a valid 10-digit number";
    }

    if (!formValues.city.trim()) tempErrors.city = "City is required*";

    if (!formValues.email.trim()) {
      tempErrors.email = "Email is required*";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      tempErrors.email = "Please enter a valid email";
    }

    if (!formValues.investmentBudget.trim()) tempErrors.investmentBudget = "Investment Budget is required*";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (value !== "" && !/^\d+$/.test(value)) return;
      if (value.length > 10) return;
    }
    setFormValues({ ...formValues, [name]: value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (userCaptcha !== currentCaptcha) {
      setSuccess("captcha_error");
      setTimeout(() => setSuccess(""), 5000);
      return;
    }

    setIsSubmitting(true);
    setSuccess("");
    const API_BASE = "https://bluestoneinternationalpreschool.com/api";
    
    // Prepare CRM Payload
    const crmPayload = {
      name: formValues.fullName,
      email: formValues.email,
      phone: formValues.phone,
      message: `City: ${formValues.city}\nInvestment Budget: ${formValues.investmentBudget}`,
      domain: "Bluestone Preschool",
      category: "Franchise Enquiry",
      interested_in: "Preschool Franchise"
    };

    try {
      // Existing API Call
      const response = await fetch(`${API_BASE}/franchise`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      // Push to Central CRM
      try {
        const crmUrl = import.meta.env.DEV ? "/bgoi_portal/api/contact" : "https://bluestoneinternationalpreschool.com/bgoi_portal/api/contact";
        await fetch(crmUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(crmPayload),
        });
      } catch (crmErr) {
        console.error("Failed to sync with CRM:", crmErr);
      }

      if (response.ok) {
        setSuccess("success");
        setFormValues({ fullName: "", phone: "", city: "", email: "", investmentBudget: "" });
        setShowPopup(false);
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

  const scrollToEnquiry = () => {
    document.getElementById("franchise-enquiry")?.scrollIntoView({ behavior: "smooth" });
  };

  const formattedFranchise = franchiseReviews.map(t => ({
    ...t,
    image: t.image_url ? (t.image_url.startsWith('http') ? t.image_url : `${API_BASE}${t.image_url}`) : (t.gender === 'male' ? FaMale : FaFemale),
    bg: t.bg_color || '#FFE3D3'
  }));

  // Content Data
  const whyInvestIcons = [
    { icon: <FaChartLine />, title: "Growing Demand", desc: "Constant need for quality early education." },
    { icon: <FaCalendarAlt />, title: "Recurring Admissions", desc: "Yearly intake ensures consistent revenue." },
    { icon: <FaCogs />, title: "Low Complexity", desc: "Simple operational model compared to other businesses." },
    { icon: <FaChartLine />, title: "Scalable Business", desc: "Long-term scalability and expansion potential." },
    { icon: <FaHandsHelping />, title: "Social Impact", desc: "Shape the future of children meaningfully." },
  ];

  const whyChooseCards = [
    {
      title: "Proven Preschool Model",
      color: "#8B5CF6",
      icon: <FaGraduationCap />,
      list: ["Play-based curriculum", "Complete Academic Support", "Books & Curriculum", "Teacher Manuals"]
    },
    {
      title: "Marketing Support",
      color: "#F59E0B",
      icon: <FaBullhorn />,
      list: ["Digital Marketing", "Local Campaigns", "Admissions Support"]
    },
    {
      title: "Staff Training",
      color: "#EC4899",
      icon: <FaChalkboardTeacher />,
      list: ["Teacher Recruitment", "Comprehensive Training", "Operational SOPs"]
    },
    {
      title: "Business Guidance",
      color: "#10B981",
      icon: <FaChartLine />,
      list: ["Location Selection", "Interior Planning", "Launch Support"]
    },
    {
      title: "Continuous Support",
      color: "#3B82F6",
      icon: <FaHandsHelping />,
      list: ["Monthly Reviews", "Academic Updates", "Marketing Assistance"]
    }
  ];

  const whatYouGet = [
    { icon: <FaCheck />, title: "Brand License" },
    { icon: <FaBookReader />, title: "Preschool Curriculum" },
    { icon: <FaLaptopCode />, title: "ERP Software" },
    { icon: <FaCheck />, title: "Website Listing" },
    { icon: <FaBullhorn />, title: "Admission Marketing" },
    { icon: <FaChalkboardTeacher />, title: "Teacher Training" },
    { icon: <FaMobileAlt />, title: "Parent App" },
    { icon: <FaCalendarAlt />, title: "Annual Academic Calendar" },
    { icon: <FaImages />, title: "Digital Marketing Creatives" },
    { icon: <FaHandsHelping />, title: "Ongoing Support" },
  ];

  const processSteps = [
    { title: "Enquiry", icon: <FaMobileAlt />, desc: "Fill the form or call us to express your interest." },
    { title: "Consultation", icon: <FaHandsHelping />, desc: "Detailed discussion with our franchise experts." },
    { title: "Location Approval", icon: <FaCheck />, desc: "Site visit and feasibility study of your chosen area." },
    { title: "Agreement", icon: <FaBookReader />, desc: "Signing the official franchise agreement." },
    { title: "School Setup", icon: <FaCogs />, desc: "Interiors, staff recruitment & comprehensive training." },
    { title: "Grand Opening", icon: <FaBullhorn />, desc: "Launch marketing, admissions and inauguration." }
  ];

  const faqs = [
    { question: "How much investment is required?", answer: "The initial investment required is ₹15 Lakhs, depending on the location and setup size." },
    { question: "What area is needed?", answer: "A minimum of 1500-2000 sq.ft of built-up area is recommended for a standard preschool setup." },
    { question: "Do I need teaching experience?", answer: "No prior education experience is required. We provide complete training and operational SOPs to help you run the preschool successfully." },
    { question: "How long does setup take?", answer: "The typical setup time from agreement to launch is around 45 to 60 days." },
    { question: "Do you help with admissions?", answer: "Yes, we provide extensive marketing support, digital campaigns, and admission strategies to ensure a successful launch." },
    { question: "What is the expected ROI?", answer: "Our proven model usually yields an ROI of 35-45% annually, with breakeven typically achieved within 18-24 months." },
  ];

  return (
    <div className="bg-white overflow-hidden">
      <SEO
        title="Start Your Own Preschool | Bluestone Franchise"
        description="Build a Profitable Preschool Business with Complete Setup, Curriculum, Marketing & Training Support. Investment Starts from ₹15 Lakhs."
        url="/franchise"
      />

      {/* FLOATING SUCCESS/ERROR ALERT */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-24 right-6 z-[9999] flex items-center gap-4 p-5 rounded-2xl shadow-2xl border-l-8 bg-white max-w-sm"
            style={{ borderLeftColor: success === "success" ? "#22c55e" : "#ef4444" }}
          >
            <div className={`p-2 rounded-full ${success === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
              {success === "success" ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-purple-900">
                {success === "success" ? "Application Sent!" : "Submission Failed"}
              </h4>
              <p className="text-xs text-gray-500">
                {success === "success" ? "We will contact you soon." : success === "captcha_error" ? "Invalid CAPTCHA." : "Please try again."}
              </p>
            </div>
            <button onClick={() => setSuccess("")} className="text-gray-300 hover:text-gray-600">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* POPUP FORM MODAL */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 shadow-2xl max-w-md w-full relative"
            >
              <button 
                onClick={() => setShowPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition bg-gray-100 rounded-full p-2"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl md:text-2xl font-black text-purple-900 mb-2 text-center pr-8">
                Start Your Preschool Journey!
              </h3>
              <p className="text-center text-gray-500 text-sm mb-5">
                Fill the form to get our franchise brochure.
              </p>
              {renderForm()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-10 lg:pt-0">
        <img src={heroImg || "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=2000"} className="absolute inset-0 w-full h-full object-cover" alt="Hero" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 via-purple-900/90 to-purple-900/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="text-white pt-10 lg:pt-0">
            <h1 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
              Start Your Own Preschool with <span className="text-orange-400">Bluestone</span>
            </h1>
            <p className="text-lg lg:text-xl text-purple-100 mb-8 font-medium">
              Build a Profitable Preschool Business with Complete Setup, Curriculum, Marketing & Training Support.
            </p>

            <div className="space-y-3 mb-10">
              {["Investment Starts from ₹15 Lakhs", "Complete Business Setup", "No Education Experience Required", "Marketing & Admissions Support"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 w-fit px-4 py-2 rounded-lg border border-white/20 backdrop-blur-sm">
                  <FaCheck className="text-green-400" />
                  <span className="font-semibold text-sm lg:text-base">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="/BIPS PROFILE (1).pdf" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-orange-500 text-white font-bold shadow-xl hover:bg-orange-600 transition flex items-center gap-2">
                👉 Get Franchise Brochure
              </a>
              <button onClick={() => setShowPopup(true)} className="px-8 py-4 rounded-full bg-white text-purple-900 font-bold shadow-xl hover:bg-gray-100 transition flex items-center gap-2">
                👉 Schedule a Free Consultation
              </button>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} id="franchise-enquiry" className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20 max-w-md ml-auto w-full">
            <h3 className="text-xl md:text-2xl font-black text-purple-900 mb-5 text-center">Franchise Enquiry Form</h3>
            {renderForm()}
          </motion.div>
        </div>
      </section>

      {/* 2. WHY INVEST IN PRESCHOOL */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-purple-900 mb-16">
            Why Preschool is One of India's <span className="text-orange-500">Fastest Growing</span> Businesses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {whyInvestIcons.map((item, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center border border-gray-100">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
                  {item.icon}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE BLUESTONE (Cards) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black text-center text-purple-900 mb-16">Why Choose Bluestone?</h2>
          <ManualCarousel items={whyChooseCards} />
        </div>
      </section>

      {/* 4. INVESTMENT DETAILS */}
      <section className="py-24 bg-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl font-black mb-12">Investment Details</h2>
          <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-orange-400 to-orange-600 p-1 md:p-2 rounded-[3rem] shadow-2xl">
            <div className="bg-white text-gray-900 rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-purple-900 mb-2">Franchise Investment</h3>
                <div className="text-5xl md:text-6xl font-black text-orange-500 mb-4">₹15 Lakhs<span className="text-xl text-gray-400 font-normal">*</span></div>
                <p className="text-gray-500 font-medium">Estimated setup cost for a premium preschool center.</p>
              </div>
              <div className="bg-gray-50 rounded-3xl p-8 w-full md:w-1/2">
                <h4 className="font-bold text-lg mb-4 text-purple-900">Includes:</h4>
                <ul className="space-y-3 font-semibold text-gray-700">
                  {["Branding", "Curriculum", "Teacher Training", "Marketing Kit", "Launch Support", "Operations Manual"].map((inc, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="bg-green-100 p-1 rounded-full text-green-600"><FaCheck size={12} /></div>
                      {inc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. WHAT YOU GET */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-center text-purple-900 mb-16">What You Get</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {whatYouGet.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition">
                <div className="text-orange-500 text-3xl mb-4">{item.icon}</div>
                <h4 className="font-bold text-sm text-gray-800">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BUSINESS PROCESS (Enhanced UI) */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-200/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-purple-900 mb-6"
          >
            How It Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-500 mb-20 max-w-2xl mx-auto font-medium"
          >
            Your path to owning a Bluestone Preschool is simple, transparent, and fully supported at every step.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group"
              >
                <div className="bg-white rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-100/50 h-full flex flex-col items-start text-left relative overflow-hidden group-hover:-translate-y-2">
                  {/* Step Number Watermark */}
                  <div className="absolute -right-6 -bottom-6 text-[10rem] font-black text-gray-50 leading-none group-hover:text-orange-50 transition-colors duration-500 select-none pointer-events-none">
                    {i + 1}
                  </div>
                  
                  <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 relative z-10">
                    {step.icon}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-purple-900 mb-3 relative z-10">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed relative z-10 text-sm md:text-base">{step.desc}</p>
                </div>
                
                {/* Connecting Arrow for Desktop */}
                {i % 3 !== 2 && i !== processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-7 text-gray-300 -translate-y-1/2 z-20">
                    <ChevronRight size={32} strokeWidth={3} className="text-orange-300 opacity-50" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SUCCESS NUMBERS */}
      <section className="py-20 bg-gradient-to-r from-orange-400 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { num: "50+", label: "Happy Families" },
              { num: "5+", label: "Centres" },
              { num: "4", label: "Programs" },
              { num: "100%", label: "Support from Setup to Launch" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-5xl md:text-7xl font-black mb-2">{stat.num}</div>
                <div className="text-sm md:text-lg font-bold opacity-90 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-purple-900 mb-16">Franchise Owner Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviewsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-left relative overflow-hidden">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-6" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-8" />
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gray-200" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-3 bg-gray-200 rounded w-1/3" />
                    </div>
                  </div>
                </div>
              ))
            ) : formattedFranchise.length > 0 ? (
              formattedFranchise.slice(0, 6).map((item, i) => (
                <div key={item.id || i} className="flex justify-center">
                  <TestimonialCard testimonial={item} />
                </div>
              ))
            ) : (
              [
                { name: "Priya S.", city: "Coimbatore", growth: "We achieved 100+ admissions in our first year!", img: "https://i.pravatar.cc/150?img=1" },
                { name: "Rahul M.", city: "Chennai", growth: "The support from location selection to launch was phenomenal.", img: "https://i.pravatar.cc/150?img=11" },
                { name: "Anita K.", city: "Madurai", growth: "Best decision I made. The curriculum is top-notch.", img: "https://i.pravatar.cc/150?img=5" }
              ].map((review, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-left relative overflow-hidden">
                  <div className="text-orange-300 text-6xl absolute -top-2 -left-2 opacity-50">"</div>
                  <p className="text-gray-700 italic font-medium mb-8 relative z-10">"{review.growth}"</p>
                  <div className="flex items-center gap-4">
                    <img src={review.img} alt={review.name} className="w-14 h-14 rounded-full object-cover shadow-sm" />
                    <div>
                      <h4 className="font-bold text-purple-900">{review.name}</h4>
                      <p className="text-sm text-gray-500">{review.city}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 9. GALLERY */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black text-center text-purple-900 mb-16">Life at Bluestone</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.length > 0 ? (
              galleryImages.slice(0, 5).map((img, i) => (
                <img 
                  key={i}
                  src={img} 
                  alt={`Life at Bluestone ${i + 1}`} 
                  className={`rounded-2xl w-full h-48 object-cover hover:scale-105 transition duration-300 ${
                    i === 1 || i === 3 ? "md:col-span-2" : i === 4 ? "col-span-2" : ""
                  }`} 
                />
              ))
            ) : (
              <>
                <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80" alt="Classroom" className="rounded-2xl w-full h-48 object-cover hover:scale-105 transition duration-300" />
                <img src="https://images.unsplash.com/photo-1545607572-c2834b673238?auto=format&fit=crop&w=600&q=80" alt="Kids Learning" className="rounded-2xl w-full h-48 object-cover hover:scale-105 transition duration-300 md:col-span-2" />
                <img src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80" alt="Activities" className="rounded-2xl w-full h-48 object-cover hover:scale-105 transition duration-300" />
                <img src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80" alt="Events" className="rounded-2xl w-full h-48 object-cover hover:scale-105 transition duration-300 md:col-span-2" />
                <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80" alt="Infrastructure" className="rounded-2xl w-full h-48 object-cover hover:scale-105 transition duration-300 col-span-2" />
              </>
            )}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-black text-center text-purple-900 mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} activeIndex={activeFAQ} toggleFAQ={(idx) => setActiveFAQ(activeFAQ === idx ? null : idx)} />
            ))}
          </div>
        </div>
      </section>

      {/* 11. STRONG CTA SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-900"></div>
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 text-white">
          <h2 className="text-4xl md:text-6xl font-black mb-6">Ready to Start Your Own Preschool?</h2>
          <p className="text-xl md:text-2xl text-purple-200 mb-12 font-medium">Become a Bluestone Franchise Partner Today.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/BIPS PROFILE (1).pdf" target="_blank" rel="noopener noreferrer" className="px-10 py-5 rounded-full bg-orange-500 text-white font-black text-xl hover:bg-orange-600 hover:scale-105 transition shadow-2xl">
              Get Franchise Brochure
            </a>
            <a href="tel:+919876543210" className="px-10 py-5 rounded-full bg-white text-purple-900 font-black text-xl hover:bg-gray-100 hover:scale-105 transition shadow-2xl flex justify-center items-center gap-2">
              📞 Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
