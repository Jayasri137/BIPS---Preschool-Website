import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom"; // 1. Import Link

export default function BlogFeed({ posts = [] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto py-12">
      {posts.map((post) => (
        <motion.div 
          key={post.id}
          whileHover={{ y: -10 }}
          className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-purple-50 group flex flex-col"
        >
          {/* 2. Wrap the Image in a Link */}
          <Link to={`/blogs/${post.slug}`} target="_blank" rel="noopener noreferrer" className="h-56 overflow-hidden block">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            />
          </Link>

          <div className="p-8 flex flex-col flex-grow">
            <span className="bg-orange-100 text-orange-600 px-4 py-1 rounded-full text-xs font-bold uppercase w-fit">
              {post.category}
            </span>
            
            {/* 3. Wrap Title in a Link */}
            <Link to={`/blogs/${post.slug}`} target="_blank" rel="noopener noreferrer">
              <h3 className="text-xl font-bold text-purple-900 mt-4 mb-3 leading-tight hover:text-orange-500 transition">
                {post.title}
              </h3>
            </Link>

            <p className="text-gray-500 text-sm mb-6 line-clamp-2">{post.excerpt}</p>
            
            <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
              <span className="flex items-center gap-2 text-gray-400 text-xs italic">
                <Calendar size={14}/> {post.date}
              </span>
              
              {/* 4. Update Button to a Link */}
              <Link 
                to={`/blogs/${post.slug}`} 
                rel="noopener noreferrer"
                className="text-purple-600 font-bold flex items-center gap-2 group-hover:text-orange-500 transition"
              >
                Read More <ArrowRight size={16}/>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}