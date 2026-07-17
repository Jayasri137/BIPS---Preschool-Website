import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Calendar,
  ArrowLeft,
  Share2,
  Clock,
  Loader2,
  User
} from "lucide-react";
import SEO from "../../SEO";

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    setLoading(true);
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com";
    try {
      const res = await fetch(`${API_BASE}/blogs`);
      const data = await res.json();
      if (Array.isArray(data)) {
        const currentPost = data.find(p => p.id.toString() === id);
        setPost(currentPost);
        setRelatedBlogs(data.filter(p => p.id.toString() !== id).slice(0, 3));
      }
    } catch (err) {
      console.error("Failed to fetch blog", err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (!post) return;
    const shareData = {
      title: post.title,
      text: `Check out this helpful article: ${post.title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((err) => { /* share error */ });
    } else {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareData.text + " " + shareData.url)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  // Reading Progress Bar Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-bold text-purple-900 mb-4">
          Post Not Found
        </h2>
        <p className="text-gray-500 mb-8">
          The article you are looking for has moved or doesn't exist.
        </p>
        <Link
          to="/blogs"
          className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold shadow-lg"
        >
          Back to All Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <SEO
        title={post.title}
        description={`Read our latest blog post about ${post.title} by ${post.author_name}.`}
        url={`/blogs/${post.id}`}
      />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-orange-500 z-[60] origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-4xl mx-auto px-6 pt-12">
        <Link
          to="/blogs"
          className="flex items-center gap-2 text-purple-600 font-bold mb-8 hover:text-orange-500 transition"
        >
          <ArrowLeft size={20} /> Back to Blogs
        </Link>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-purple-900 mt-6 mb-8 leading-tight italic">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-10 pb-10 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-200">
              {post.author_image ? (
                <img src={post.author_image} alt={post.author_name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold uppercase">
                  {post.author_name ? post.author_name.charAt(0) : "A"}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-purple-900">{post.author_name || "Admin"}</span>
              {post.author_title && (
                <span className="text-xs text-orange-600 font-bold uppercase tracking-wider">{post.author_title}</span>
              )}
            </div>
          </div>
          <span className="flex items-center gap-2">
            <Calendar size={18} /> {new Date(post.created_at).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={18} /> 5 min read
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 mb-16">
        {post.blog_image && (
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            src={post.blog_image}
            className="w-full h-[300px] md:h-[500px] object-cover rounded-[2rem] md:rounded-[3rem] shadow-2xl"
            alt={post.title}
          />
        )}
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <article className="prose prose-lg prose-purple max-w-none">
          <div
            className="text-gray-700 leading-relaxed space-y-6 blog-content whitespace-pre-wrap"
          >
            {post.description}
          </div>

          {/* Author Bio Box */}
          {(post.author_description || post.author_title) && (
            <div className="mt-12 p-8 bg-orange-50/50 border border-orange-100 rounded-3xl flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg shrink-0">
                {post.author_image ? (
                  <img src={post.author_image} alt={post.author_name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-2xl uppercase">
                    {post.author_name ? post.author_name.charAt(0) : "A"}
                  </div>
                )}
              </div>
              <div>
                <h4 className="text-xl font-bold text-purple-900">{post.author_name || "Admin"}</h4>
                {post.author_title && (
                  <p className="text-sm font-bold text-orange-600 uppercase tracking-widest mt-1 mb-3">{post.author_title}</p>
                )}
                {post.author_description && (
                  <p className="text-gray-600 text-sm leading-relaxed">{post.author_description}</p>
                )}
              </div>
            </div>
          )}

          {/* Social Share Section */}
          <div className="mt-12 p-8 bg-purple-50 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-bold text-purple-900">
              Share this with other parents:
            </span>
            <div className="flex gap-4">
              <button
                onClick={handleShare}
                className="flex items-center gap-3 px-6 py-3 bg-white rounded-full text-purple-600 shadow-sm hover:bg-green-500 hover:text-white transition font-bold"
              >
                <Share2 size={20} />
                Share Post
              </button>
            </div>
          </div>
        </article>
      </div>

      {/* Dynamic Related Posts Section */}
      {relatedBlogs.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 mt-24">
          <h2 className="text-3xl font-bold text-purple-900 mb-10">
            Recommended for You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedBlogs.map((related) => (
                <Link
                  key={related.id}
                  to={`/blogs/${related.id}`}
                  className="group"
                >
                  <div className="h-48 rounded-3xl overflow-hidden mb-4 shadow-md bg-gray-100">
                    {related.blog_image ? (
                      <img
                        src={related.blog_image}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        alt={related.title}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform">
                        No Image
                      </div>
                    )}
                  </div>
                  <h4 className="font-bold text-purple-900 group-hover:text-orange-500 transition line-clamp-2">
                    {related.title}
                  </h4>
                </Link>
              ))}
          </div>
        </section>
      )}

      {/* Sticky Bottom CTA */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-8 left-0 right-0 z-50 px-6 flex justify-center pointer-events-none"
      >
        <div className="bg-purple-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-6 pointer-events-auto border border-white/10 backdrop-blur-md">
          <span className="hidden md:block font-medium">
            Want to see our campus?
          </span>
          <Link
            to="/admissions"
            className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold hover:bg-white hover:text-orange-500 transition"
          >
            Book a Tour
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
