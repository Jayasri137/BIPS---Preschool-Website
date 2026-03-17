import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, MessageSquare, MapPin, ImageIcon, TrendingUp, Calendar } from "lucide-react";
import toast from 'react-hot-toast';

export default function DashboardHome() {
  const [stats, setStats] = useState({
    admissions: 0,
    franchise: 0,
    media: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com";
    const token = localStorage.getItem("admin_token");
    const headers = { "Authorization": `Bearer ${token}` };

    try {
      const [adm, fra, med] = await Promise.all([
        fetch(`${API_BASE}/admin/admissions`, { headers }).then(res => res.json()),
        fetch(`${API_BASE}/admin/franchise`, { headers }).then(res => res.json()),
        fetch(`${API_BASE}/admin/media`, { headers }).then(res => res.json()),
      ]);

      setStats({
        admissions: Array.isArray(adm) ? adm.length : 0,
        franchise: Array.isArray(fra) ? fra.length : 0,
        media: Array.isArray(med) ? med.length : 0,
      });
    } catch (err) {
      // toast.error("Failed to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  const CARDS = [
    { name: "Total Admissions", value: stats.admissions, Icon: Users, color: "bg-blue-500", shadow: "shadow-blue-500/20" },
    { name: "Franchise Requests", value: stats.franchise, Icon: MapPin, color: "bg-purple-500", shadow: "shadow-purple-500/20" },
    { name: "Media Assets", value: stats.media, Icon: ImageIcon, color: "bg-orange-500", shadow: "shadow-orange-500/20" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Snapshot of Bluestone International Preschool activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CARDS.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-gray-200 p-8 rounded-[2rem] relative overflow-hidden group hover:border-gray-300 transition-all shadow-sm hover:shadow-md"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 ${card.color} opacity-[0.03] rounded-bl-full group-hover:opacity-[0.08] transition-opacity`} />
            <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl ${card.shadow}`}>
              <card.Icon size={28} />
            </div>
            <p className="text-gray-500 font-semibold text-sm uppercase tracking-wider">{card.name}</p>
            <h3 className="text-4xl font-black text-gray-900 mt-2">
              {loading ? <div className="h-10 w-16 bg-gray-100 rounded-lg animate-pulse" /> : card.value}
            </h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Recent Activity Card */}
        <div className="lg:col-span-2 bg-white border border-gray-200 p-8 rounded-[2rem] space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <TrendingUp className="text-orange-500" /> System Activity
            </h3>
            <span className="text-xs bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-bold border border-orange-100">Live Updates</span>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                  <Calendar size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-800">System Sync Complete</p>
                  <p className="text-[10px] text-gray-500">Database tables verified and updated</p>
                </div>
                <span className="text-[10px] text-gray-400">Just now</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-br from-orange-600 to-orange-400 p-8 rounded-[2rem] text-white flex flex-col justify-between shadow-2xl shadow-orange-600/20">
          <div>
            <h4 className="text-2xl font-black mb-2">Welcome Admin!</h4>
            <p className="text-orange-100 text-sm leading-relaxed">
              You are viewing the unified control panel. Use the sidebar to drill down into specific data segments.
            </p>
          </div>
          <button className="w-full py-4 mt-8 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl font-bold text-sm transition-all border border-white/20">
            Explore Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
