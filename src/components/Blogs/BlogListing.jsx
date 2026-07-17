import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, User } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../SEO";
import { Loader2 } from "lucide-react";

export default function BlogFeed() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com";
    try {
      const res = await fetch(`${API_BASE}/blogs`);
      const data = await res.json();
      if (Array.isArray(data)) setBlogs(data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto py-12">
      <SEO 
        title="Blog & News"
        description="Stay updated with the latest news, parenting tips, and educational insights from Bluestone International Preschool."
        url="/blogs"
      />
      {blogs.map((post) => (
        <motion.div 
          key={post.id}
          whileHover={{ y: -10 }}
          className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-purple-50 group flex flex-col"
        >
          <Link to={`/blogs/${post.id}`} className="h-56 overflow-hidden block relative">
            {post.blog_image ? (
              <img 
                src={post.blog_image} 
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-500">
                No Image
              </div>
            )}
          </Link>

          <div className="p-8 flex flex-col flex-grow relative">
            {/* Author Avatar Overlapping */}
            <div className="absolute -top-10 right-8 w-16 h-16 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 flex items-center justify-center z-10">
               {post.author_image ? (
                  <img src={post.author_image} alt={post.author_name} className="w-full h-full object-cover" />
               ) : (
                  <User className="text-gray-400" size={24} />
               )}
            </div>

            <div className="mt-2 mb-2 flex items-center gap-2">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">{post.author_name || "Admin"}</span>
            </div>
            
            <Link to={`/blogs/${post.id}`}>
              <h3 className="text-xl font-bold text-purple-900 mt-2 mb-3 leading-tight hover:text-orange-500 transition line-clamp-2">
                {post.title}
              </h3>
            </Link>

            <p className="text-gray-500 text-sm mb-6 line-clamp-3">{post.description}</p>
            
            <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
              <span className="flex items-center gap-2 text-gray-400 text-xs italic">
                <Calendar size={14}/> {new Date(post.created_at).toLocaleDateString()}
              </span>
              
              <Link 
                to={`/blogs/${post.id}`} 
                className="text-purple-600 font-bold flex items-center gap-2 group-hover:text-orange-500 transition"
              >
                Read More <ArrowRight size={16}/>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
      
      {blogs.length === 0 && (
         <div className="col-span-full text-center py-20">
           <h3 className="text-2xl font-bold text-gray-300">No blogs published yet.</h3>
         </div>
      )}
    </div>
  );
}