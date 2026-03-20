import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useMedia } from "../hooks/useMedia";
import SEO from "../SEO";
import { Shield, BarChart3, Users, Laptop, Camera, HeartPulse } from 'lucide-react';

const benefits = [
  {
    title: "Retention & Loyalty",
    desc: "Companies with childcare support see a 20% higher retention rate among mid-to-senior level talent.",
    icon: <Users className="w-8 h-8 text-orange-600" />
  },
  {
    title: "Reduced Absenteeism",
    desc: "Our 'Backup Care' program ensures your team is at work even when their primary care falls through.",
    icon: <Shield className="w-8 h-8 text-orange-600" />
  },
  {
    title: "Tax Advantages",
    desc: "Leverage government incentives for corporate childcare contributions to optimize your benefits budget.",
    icon: <BarChart3 className="w-8 h-8 text-orange-600" />
  }
];

const techFeatures = [
  { 
    title: "The Bluestone Website", 
    icon: <Laptop className="text-white" />, 
    desc: "Real-time updates on naps, meals, and learning activities directly to the employee's phone." 
  },
  { 
    title: "HD Live Stream", 
    icon: <Camera className="text-white" />, 
    desc: "Secure end-to-end encrypted video feeds for parents to peek in anytime." 
  },
  { 
    title: "Health Monitoring", 
    icon: <HeartPulse className="text-white" />, 
    desc: "Daily contactless temperature checks and health logging for every child." 
  }
];

export default function Daycare() {
  const { getSectionImage } = useMedia("Daycare");
  const school = getSectionImage("Header_Image");
  const group = getSectionImage("Side_Image");
  return (
    <div className="bg-white text-[#222A41]">
      <SEO 
        title="Daycare Services"
        description="Our daycare services provide a safe, caring, and structured environment where children learn, play, and grow under expert supervision."
        url="/daycare"
      />
      
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center bg-gradient-to-r from-purple-900/90 via-purple-700/80 to-orange-500/80 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src={school} 
            alt="Modern Office" 
            className="w-full h-full object-cover" 
          />
        </div>
        {/* Constrained Container */}
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">
            Bluestone Daycare: <br /><span className="text-orange-400">Bright Futures Start Here!</span>
          </h1>
          <p className="text-medium lg:text-xl text-white/70 max-w-2xl mb-8">
           Bluestone International Provides trusted caregivers, thoughtful routines, and a nurturing atmosphere, we help every child grow happily while parents focus on their day with confidence.
          </p>
          {/* <motion.button
          whileHover={{ scale: 1.04 }}
           className="px-8 py-3 rounded-full bg-orange-400 text-white font-bold shadow-lg hover:bg-white hover:text-orange-400 transition">
            Request Partnership Proposal 
          </motion.button> */}
        </div>
      </section>

      {/* Tech Enabled Section */}
      <section className="py-24 bg-white text-purple-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6">A Tech-Enabled <span className="text-orange-500">Safe Heaven</span></h2>
              <p className="text-gray-800 mb-10 text-medium">
                At our daycare, children enjoy a warm, family-like atmosphere where they feel truly valued and secure. Every space is thoughtfully designed and childproofed, with strict safety and hygiene protocols so kids can explore freely.<br/>
                Each day is designed with your child’s growth in mind, ensuring parents can work with true peace of mind. Many parents find that seeing their child learn, play, and smile in a safe, nurturing setting gives them confidence and calm throughout the day.
              </p>
              <div className="space-y-8">
                {techFeatures.map((f, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="bg-orange-600 p-3 rounded-xl shrink-0">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{f.title}</h4>
                      <p className="text-gray-800">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative w-full">
              <div className="absolute -inset-4 bg-orange-600/20 blur-3xl rounded-full"></div>
              <img 
                src={group}
                className="rounded-[2rem] relative z-10 border border-gray-200 shadow-2xl w-full object-cover" 
                alt="Security Monitoring"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-[#FFF7ED] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-bold uppercase tracking-widest text-purple-800 mb-10">Trusted By Industry Giants</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-60">
            {/* Using a cleaner flex-group for the logos */}
            {/* <div className="text-2xl md:text-3xl font-black italic tracking-tighter">MICROSOFT</div>
            <div className="text-2xl md:text-3xl font-black italic tracking-tighter">DELOITTE</div>
            <div className="text-2xl md:text-3xl font-black italic tracking-tighter">ACCENTURE</div>
            <div className="text-2xl md:text-3xl font-black italic tracking-tighter">ADOBE</div>
            <div className="text-2xl md:text-3xl font-black italic tracking-tighter">GOOGLE</div> */}
          </div>
        </div>
      </section>
      
    </div>
  );
}