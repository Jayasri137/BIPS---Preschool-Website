import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  AlertCircle,
  ClipboardList,
  UserCheck,
  CalendarDays,
  X,
  Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMedia } from "../hooks/useMedia";
import SEO from "../SEO";

export default function Admissions() {
  const navigate = useNavigate();
  const { getSectionImage } = useMedia("Admissions");

  const dynamicBoyImg = getSectionImage("Side_Graphic");
  const dynamicBgImg = getSectionImage("Background");
  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    email: "",
    studentName: "", // New Field
    dob: "",         // New Field
    gender: "",      // New Field
    program: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // 1. UPDATED VALIDATION LOGIC
  const validateForm = () => {
    let newErrors = {};

    if (!formData.parentName.trim()) newErrors.parentName = "Parent name is required";
    if (!formData.studentName.trim()) newErrors.studentName = "Student name is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Please select gender";

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.program) newErrors.program = "Please select a program";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccess("");

    const API_BASE = "https://bluestoneinternationalpreschool.com/api";

    try {
      const res = await fetch(`${API_BASE}/admissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess("success");
        setFormData({ parentName: "", phone: "", email: "", studentName: "", dob: "", gender: "", program: "", message: "" });
      } else {
        setSuccess("error");
      }
    } catch (err) {
      setSuccess("connection_error");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(""), 5000);
    }
  };

  const ErrorMsg = ({ field }) => (
    <AnimatePresence>
      {errors[field] && (
        <motion.p
          initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
          className="text-[10px] text-red-500 font-bold ml-2 uppercase tracking-tight mt-1"
        >
          {errors[field]}
        </motion.p>
      )}
    </AnimatePresence>
  );

  const inputClass = (field) => `w-full px-5 py-3 rounded-xl bg-gray-50 border outline-none transition-all text-sm ${errors[field] ? "border-red-500 ring-4 ring-red-500/10" : "border-gray-200 focus:border-purple-500"}`;

  return (
    <div className="overflow-x-hidden font-sans">
      <SEO
        title="Admissions & Enrollment"
        description="Enroll your child at Bluestone International Preschool. Follow our easy online enquiry and enrollment process for premium early education."
        url="/admissions"
      />

      {/* SUCCESS NOTIFICATION */}
      <AnimatePresence>
        {success && (
          <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} className="fixed top-24 right-6 z-[999] flex items-center gap-4 p-5 rounded-2xl shadow-2xl border-l-8 bg-white max-w-sm" style={{ borderLeftColor: success === "success" ? "#22c55e" : "#ef4444" }}>
            <div className={`p-2 rounded-full ${success === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
              {success === "success" ? <CheckCircle size={24} /> : <AlertCircle size={24} />}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-purple-900">{success === "success" ? "Enquiry Sent!" : "Oops!"}</h4>
              <p className="text-xs text-gray-500">{success === "success" ? "We've received your details and will call you soon." : "Please check your fields and try again."}</p>
            </div>
            <button onClick={() => setSuccess("")} className="text-gray-300 hover:text-gray-600"><X size={18} /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative min-h-[90vh] w-full flex items-center justify-center px-4 py-16" style={{ backgroundImage: `url(${dynamicBgImg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/95 via-purple-800/90 to-orange-500/80"></div>

        <div className="relative z-10 max-w-7xl w-full grid lg:grid-cols-2 gap-10 items-center">

          {/* ENHANCED FORM CARD */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center lg:justify-start">
            <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] shadow-2xl p-6 md:p-8 w-full max-w-lg border-[6px] border-yellow-400 relative">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-black text-purple-900">Admission Form 🎒</h2>
                <p className="text-sm text-gray-500 italic">Enter parent & student details below</p>
              </div>

              <div className="space-y-4">
                {/* --- Section: Parent Info --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input type="text" name="parentName" placeholder="Parent Name *" value={formData.parentName} onChange={handleChange} className={inputClass("parentName")} />
                    <ErrorMsg field="parentName" />
                  </div>
                  <div>
                    <input type="tel" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleChange} className={inputClass("phone")} />
                    <ErrorMsg field="phone" />
                  </div>
                </div>

                <div>
                  <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} className={inputClass("email")} />
                  <ErrorMsg field="email" />
                </div>

                {/* --- Section: Student Info --- */}
                <div className="pt-2 border-t border-dashed border-gray-200">
                  <p className="text-[11px] font-bold text-purple-400 uppercase tracking-widest mb-3">Student Details</p>
                  <div>
                    <input type="text" name="studentName" placeholder="Student Full Name *" value={formData.studentName} onChange={handleChange} className={inputClass("studentName")} />
                    <ErrorMsg field="studentName" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-gray-400 ml-2">Date of Birth *</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={inputClass("dob")} />
                    <ErrorMsg field="dob" />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 ml-2">Gender *</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass("gender")}>
                      <option value="">Select</option>
                      <option>Boy</option>
                      <option>Girl</option>
                      <option>Other</option>
                    </select>
                    <ErrorMsg field="gender" />
                  </div>
                </div>

                <div>
                  <select name="program" value={formData.program} onChange={handleChange} className={inputClass("program")}>
                    <option value="">Apply for Program *</option>
                    <option>Nestler (6m+)</option>
                    <option>Bambino (2-3y)</option>
                    <option>B Junior (3-4y)</option>
                    <option>B Senior (4-5y)</option>
                  </select>
                  <ErrorMsg field="program" />
                </div>

                <textarea name="message" placeholder="Additional comments (optional)..." rows="2" value={formData.message} onChange={handleChange} className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-purple-500 outline-none text-sm resize-none" />
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-black text-lg shadow-lg disabled:opacity-70 flex items-center justify-center gap-2">
                {loading ? <><Loader2 className="animate-spin" /> Processing...</> : "Submit Application"}
              </motion.button>
            </form>
          </motion.div>

          {/* IMAGE */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="hidden lg:flex flex-col items-center justify-center relative">
            <motion.img animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} src={dynamicBoyImg} alt="Happy Child" className="h-[500px] xl:h-[580px] object-contain drop-shadow-2xl" />
          </motion.div>
        </div>
      </section>

      {/* ENROLLMENT PROCESS SECTION */}
      <section className="py-20 bg-[#FAF9F6]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-purple-900 mb-12">Enrollment Made Easy</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <ClipboardList />, title: "1. Online Enquiry", desc: "Submit the registration form with parent & student details." },
              { icon: <UserCheck />, title: "2. Personal Meet", desc: "Visit our campus for a tour and a friendly interaction session." },
              { icon: <CalendarDays />, title: "3. Confirmation", desc: "Submit documents and start the journey!" },
            ].map((step, i) => (
              <div key={i} className="p-10 bg-white rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-gray-100">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}