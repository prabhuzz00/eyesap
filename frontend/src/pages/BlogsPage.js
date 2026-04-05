import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag, User } from "lucide-react";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL;

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: "easeOut" }
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${API}/api/blogs`);
        setBlogs(res.data);
      } catch (e) {
        console.error("Failed to fetch blogs:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    } catch {
      return dateStr;
    }
  };

  return (
    <div data-testid="blogs-page">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#0F172A] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#1ab69e] rounded-full blur-[128px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="uppercase tracking-[0.2em] text-xs font-bold text-[#1ab69e] font-body">Insights</span>
            <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tighter mt-4" data-testid="blogs-title">
              Our Blog
            </h1>
            <p className="text-slate-400 font-body mt-6 max-w-xl text-lg leading-relaxed">
              Stay updated with the latest insights, trends, and best practices in SAP and enterprise technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
                  <div className="h-48 bg-slate-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 rounded w-full" />
                    <div className="h-3 bg-slate-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#64748B] font-body text-lg">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, i) => (
                <motion.div key={blog.id} {...fadeUp} transition={{ delay: i * 0.1 }}>
                  <Link to={`/blogs/${blog.id}`} className="group block" data-testid={`blog-card-${i}`}>
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full">
                      {blog.cover_image && (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={blog.cover_image}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {blog.tags.slice(0, 2).map((tag, j) => (
                              <span key={j} className="text-[10px] uppercase tracking-wider font-bold text-[#1ab69e] bg-[#f0fdfa] px-2 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <h3 className="font-heading font-semibold text-lg text-[#0F172A] mb-2 line-clamp-2 group-hover:text-[#1ab69e] transition-colors">
                          {blog.title}
                        </h3>
                        <p className="text-[#64748B] font-body text-sm leading-relaxed line-clamp-2 mb-4">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-[#64748B] font-body">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" /> {blog.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {formatDate(blog.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
