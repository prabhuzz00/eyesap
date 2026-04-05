import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import axios from "axios";

const API = process.env.REACT_APP_BACKEND_URL;

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API}/api/blogs/${id}`);
        setBlog(res.data);
      } catch (e) {
        console.error("Failed to fetch blog:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6 md:px-12 animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-3/4 mb-4" />
          <div className="h-4 bg-slate-200 rounded w-1/2 mb-8" />
          <div className="h-64 bg-slate-200 rounded-2xl mb-8" />
          <div className="space-y-3">
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-5/6" />
            <div className="h-4 bg-slate-200 rounded w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen pt-32 pb-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="font-heading font-bold text-2xl text-[#0F172A]">Blog not found</h1>
          <Link to="/blogs" className="text-[#1ab69e] font-body mt-4 inline-block hover:underline">
            <ArrowLeft className="w-4 h-4 inline mr-2" /> Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="blog-detail-page">
      {/* Hero */}
      {blog.cover_image && (
        <section className="relative pt-20 h-[40vh] min-h-[320px] overflow-hidden">
          <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />
        </section>
      )}

      <section className={`${blog.cover_image ? "-mt-24 relative" : "pt-32"} pb-20`}>
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/blogs" className="text-[#1ab69e] font-body text-sm hover:underline flex items-center gap-1 mb-6" data-testid="back-to-blogs">
              <ArrowLeft className="w-4 h-4" /> Back to Blogs
            </Link>

            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] uppercase tracking-wider font-bold text-[#1ab69e] bg-[#f0fdfa] px-3 py-1 rounded-full flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#0F172A] tracking-tighter" data-testid="blog-detail-title">
              {blog.title}
            </h1>

            <div className="flex items-center gap-6 mt-6 text-sm text-[#64748B] font-body border-b border-slate-200 pb-6">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" /> {blog.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {formatDate(blog.created_at)}
              </span>
            </div>

            <div
              className="blog-content mt-8 font-body"
              dangerouslySetInnerHTML={{ __html: blog.content }}
              data-testid="blog-content"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
