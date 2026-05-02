import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  MapPin,
  Image as ImageIcon, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  ChevronRight
} from "lucide-react";
import { Toaster } from 'react-hot-toast';

const NAV_ITEMS = [
  { name: "Admin Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { name: "Student Admissions", icon: Users, path: "/admin/dashboard/admissions" },
  { name: "Franchise Form", icon: MapPin, path: "/admin/dashboard/franchise" },
  { name: "Centers Management", icon: MapPin, path: "/admin/dashboard/centers" },
  { name: "Testimonials", icon: MessageSquare, path: "/admin/dashboard/testimonials" },
  { name: "Media Management", icon: ImageIcon, path: "/admin/dashboard/media" },
];

export default function AdminDashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) navigate("/admin/login");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 overflow-hidden font-sans">
      <Toaster position="top-right" toastOptions={{ duration: 1500, style: { background: '#fff', color: '#1f2937', border: '1px solid #f3f4f6', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' } }} />
      {/* Sidebar Overlay (Mobile) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 280 : 80,
          x: 0 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed lg:relative top-0 left-0 h-full bg-white border-r border-gray-200 z-50 flex flex-col shadow-xl overflow-hidden"
        style={{
          // On mobile, use x for hiding, on desktop use width for collapsing
          x: typeof window !== 'undefined' && window.innerWidth < 1024 && !isSidebarOpen ? -280 : 0
        }}
      >
        <div className="p-5 flex items-center gap-3 overflow-hidden">
          <div className="flex-shrink-0 w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <span className="text-white font-black text-xl">B</span>
          </div>
          <motion.h2 
            animate={{ opacity: isSidebarOpen ? 1 : 0, x: isSidebarOpen ? 0 : -20 }}
            className="text-xl font-bold bg-gradient-to-r from-purple-800 to-orange-500 bg-clip-text text-transparent whitespace-nowrap"
          >
            Bluestone Admin
          </motion.h2>
        </div>

        <nav className="flex-1 px-3 mt-4 space-y-2 overflow-y-auto no-scrollbar">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-4 px-3.5 py-3.5 rounded-2xl transition-all group relative ${
                  isActive 
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" 
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                }`}
              >
                <div className="flex-shrink-0">
                  <item.icon size={22} className={isActive ? "text-white" : "group-hover:text-orange-500 transition-colors"} />
                </div>
                <motion.span 
                  animate={{ opacity: isSidebarOpen ? 1 : 0, x: isSidebarOpen ? 0 : -10 }}
                  className="font-medium whitespace-nowrap"
                >
                  {item.name}
                </motion.span>
                {isActive && isSidebarOpen && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-gray-100 mb-2">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-3.5 py-4 rounded-2xl text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all group"
          >
            <div className="flex-shrink-0">
              <LogOut size={22} className="group-hover:rotate-12 transition-transform" />
            </div>
            <motion.span 
              animate={{ opacity: isSidebarOpen ? 1 : 0, x: isSidebarOpen ? 0 : -10 }}
              className="font-medium whitespace-nowrap"
            >
              Logout
            </motion.span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-all"
            >
              <Menu size={20} />
            </button>
            <div className="h-6 w-[1px] bg-gray-200 hidden md:block" />
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
              <span className="hover:text-gray-800 cursor-pointer transition-colors">Admin</span>
              <ChevronRight size={14} />
              <span className="text-gray-800 font-medium capitalize">
                {location.pathname.split("/").pop()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-orange-500/50 outline-none w-64 transition-all text-gray-800"
              />
            </div>
            <button className="relative p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-all">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-800">Administrator</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Super User</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-orange-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-8 no-scrollbar bg-gray-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
