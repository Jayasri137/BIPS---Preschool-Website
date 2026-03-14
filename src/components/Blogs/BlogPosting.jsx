import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Calendar,
  ArrowLeft,
  Share2,
  MessageCircle,
  Clock,
} from "lucide-react";
import { BLOG_POSTS } from "./data"; // 1. Import your actual data

export default function BlogPost() {
  const { slug } = useParams();

  // 2. Find the specific post based on the URL slug

  const post = BLOG_POSTS.find(
    (p) => p.slug.toLowerCase() === slug?.toLowerCase().trim()
  );

  const handleShare = () => {
    const shareData = {
      title: post.title,
      text: `Check out this helpful article: ${post.title}`,
      url: window.location.href, // This gets the current blog link
    };

    // Check if browser supports native sharing (mostly mobile)
    if (navigator.share) {
      navigator
        .share(shareData)
        .catch((err) => console.log("Error sharing", err));
    } else {
      // Fallback: Open WhatsApp with the link
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        shareData.text + " " + shareData.url
      )}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  // 3. Handle cases where the blog post doesn't exist
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
          to={`/blogs/${post.slug}`}
          className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold shadow-lg"
        >
          Back to All Blogs
        </Link>
      </div>
    );
  }

  // Reading Progress Bar Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="bg-white min-h-screen pb-20">
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

        <span className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
          {post.category}
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-purple-900 mt-6 mb-8 leading-tight italic">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-10 pb-10 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold uppercase">
              {post.author.charAt(0)}
            </div>
            <span className="font-bold text-purple-900">{post.author}</span>
          </div>
          <span className="flex items-center gap-2">
            <Calendar size={18} /> {post.date}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={18} /> {post.readTime}
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 mb-16">
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          src={post.image}
          className="w-full h-[300px] md:h-[500px] object-cover rounded-[2rem] md:rounded-[3rem] shadow-2xl"
          alt={post.title}
        />
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <article className="prose prose-lg prose-purple max-w-none">
          {/* 4. This renders the HTML content from your data file */}
          <div
            className="text-gray-700 leading-relaxed space-y-6 blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Social Share Section */}
          <div className="mt-16 p-8 bg-purple-50 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-bold text-purple-900">
              Share this with other parents:
            </span>
            <div className="flex gap-4">
              <button
                onClick={handleShare} // Trigger function here
                className="flex items-center gap-3 px-6 py-3 bg-white rounded-full text-purple-600 shadow-sm hover:bg-green-500 hover:text-white transition font-bold"
              >
                <Share2 size={20} />
                Share Post
              </button>
            </div>
          </div>
        </article>
      </div>

      {/* 5. Dynamic Related Posts Section */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <h2 className="text-3xl font-bold text-purple-900 mb-10">
          Recommended for You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.filter((p) => p.id !== post.id)
            .slice(0, 3)
            .map((related) => (
              <Link
                key={related.id}
                to={`/blogs/${related.slug}`}
                className="group"
              >
                <div className="h-48 rounded-3xl overflow-hidden mb-4 shadow-md">
                  <img
                    src={related.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    alt={related.title}
                  />
                </div>
                <h4 className="font-bold text-purple-900 group-hover:text-orange-500 transition line-clamp-2">
                  {related.title}
                </h4>
              </Link>
            ))}
        </div>
      </section>

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
