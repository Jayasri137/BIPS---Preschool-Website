import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, RefreshCw, X } from "lucide-react";
import SEO from "../SEO";
import Captcha from "../components/Captcha";

export default function ContactSection({ showSEO = false }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    domain: "Preschool",
    category: "Website Enquiry",
    interested_in: "General Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(""); // "success" | "error" | "connection_error" | "captcha_error" | ""
  const [currentCaptcha, setCurrentCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaGenerate = useCallback((code) => {
    setCurrentCaptcha(code);
    setUserCaptcha("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userCaptcha !== currentCaptcha) {
      setSuccess("captcha_error");
      setTimeout(() => setSuccess(""), 5000);
      return;
    }

    setLoading(true);
    setSuccess("");


    const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com";
    const API_BASE_URL_PORTAL = "https://bluestoneinternationalpreschool.com/bgoi_portal";

    try {
      const res = await fetch(`${API_BASE_URL_PORTAL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess("success");
        setFormData({
          name: "",
          phone: "",
          email: "",
          domain: "Preschool",
          category: "Website Enquiry",
          interested_in: "General Inquiry",
          message: ""
        });
        setUserCaptcha("");
      } else {
        setSuccess("error");
      }
    } catch (err) {
      // console.error("Fetch error:", err);
      setSuccess("connection_error");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(""), 5000);
    }
  };

  return (
    <section className="w-full md:h-full relative">
      {showSEO && (
        <SEO
          title="Contact Bluestone International Preschool | Kindergarten in Edappadi"
          description="Get in touch with Bluestone International Preschool in Edappadi for admissions, programs, and daycare details. We’re here to support your child’s early learning journey."
          url="/contact"
        />
      )}

      {/* 1. REUSED FLOATING NOTIFICATION */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-24 right-6 z-[100] flex items-center gap-4 p-5 rounded-2xl shadow-2xl border-l-8 bg-white max-w-sm"
            style={{ borderLeftColor: success === "success" ? "#22c55e" : "#ef4444" }}
          >
            <div className={`p-2 rounded-full ${success === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
              {success === "success" ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
            </div>
            <div>
              <h4 className="font-bold text-[#222A41]">
                {success === "success" ? "Message Sent!" : "Submission Failed"}
              </h4>
              <p className="text-xs text-gray-500">
                {success === "success"
                  ? "We'll get back to you shortly."
                  : success === "captcha_error"
                  ? "Invalid CAPTCHA code. Please try again."
                  : "Please check your connection and try again."}
              </p>
            </div>
            <button onClick={() => setSuccess("")} className="ml-auto text-gray-300">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 h-full">

        {/* LEFT – CONTACT FORM */}
        <div className="bg-[#222A41] text-white px-8 lg:px-36 py-14 flex items-center">
          <div className="w-full max-w-xl">
            <p className="text-2xl tracking-wide mb-3 text-orange-400">Get in Touch</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-10">Contact Us</h2>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Full Name"
                  className="w-full bg-[#3A4158] text-white px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="Phone Number"
                  className="w-full bg-[#3A4158] text-white px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#3A4158] text-white px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
              </div>

              {/* Program Selection mapped to interested_in */}
              <div className="mb-6">
                <select
                  name="interested_in"
                  value={formData.interested_in}
                  onChange={handleChange}
                  className="w-full bg-[#3A4158] text-gray-300 px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Nestlers">Nestlers</option>
                  <option value="Bambino">Bambino</option>
                  <option value="B Junior">B Junior</option>
                  <option value="B Senior">B Senior</option>
                </select>
              </div>

              {/* Message */}
              <div className="mb-6">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="3"
                  className="w-full bg-[#3A4158] text-white px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
              </div>

              {/* Captcha Section */}
              <div className="mb-10 space-y-4">
                <Captcha onCaptchaGenerate={handleCaptchaGenerate} variant="dark" />
                <input
                  type="text"
                  placeholder="Enter Captcha Code"
                  value={userCaptcha}
                  onChange={(e) => setUserCaptcha(e.target.value)}
                  className="w-full bg-[#3A4158] text-white px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 transition"
                  required
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 text-white py-4 rounded-full font-bold text-lg hover:bg-orange-500 transition shadow-lg disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT – GOOGLE MAP */}
        <div className="w-full h-[400px] md:h-full relative">
          <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3909.007952729669!2d77.894973!3d11.5512869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x860136d551614371%3A0x6643a2ac8117ad05!2sBluestone%20International%20Pre-school!5e0!3m2!1sen!2sin!4v1777717269449!5m2!1sen!2sin"
            title="School Location"
            className="w-full h-full border-0 transition-all duration-700"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </section>
  );
}