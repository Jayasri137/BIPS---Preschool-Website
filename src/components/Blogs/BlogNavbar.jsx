import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

export default function BlogNavbar() {
  return (
    <nav className="h-16 border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 flex items-center justify-between">
      <Link to="/blogs" className="flex items-center gap-2 text-purple-900 font-bold hover:text-orange-500 transition">
        <ArrowLeft size={20} /> Back to Blog Feed
      </Link>
      
      <div className="flex items-center gap-4">
        <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition">
          <Home size={20} className="text-gray-600" />
        </Link>
        <Link to="/admissions" className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold">
          Enroll Now
        </Link>
      </div>
    </nav>
  );
}