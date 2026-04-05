import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Eye, EyeOff, LogOut, FileText, MessageSquare, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { useAuth } from "../contexts/AuthContext";

export default function AdminDashboardPage() {
  const { user, logout, axiosAuth, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [blogForm, setBlogForm] = useState({ title: "", excerpt: "", content: "", cover_image: "", tags: "", published: true });
  const [editingId, setEditingId] = useState(null);
  const [blogDialogOpen, setBlogDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const api = useCallback(() => axiosAuth(), [axiosAuth]);

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await api().get("/api/blogs?published_only=false");
      setBlogs(res.data);
    } catch (e) { console.error(e); }
  }, [api]);

  const fetchContacts = useCallback(async () => {
    try {
      const res = await api().get("/api/contacts");
      setContacts(res.data);
    } catch (e) { console.error(e); }
  }, [api]);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      navigate("/admin/login");
      return;
    }
    if (user && user.role === "admin") {
      fetchBlogs();
      fetchContacts();
    }
  }, [user, authLoading, navigate, fetchBlogs, fetchContacts]);

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      ...blogForm,
      tags: blogForm.tags.split(",").map(t => t.trim()).filter(Boolean)
    };
    try {
      if (editingId) {
        await api().put(`/api/blogs/${editingId}`, data);
      } else {
        await api().post("/api/blogs", data);
      }
      setBlogDialogOpen(false);
      resetBlogForm();
      fetchBlogs();
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Delete this blog post?")) return;
    try { await api().delete(`/api/blogs/${id}`); fetchBlogs(); } catch (e) { console.error(e); }
  };

  const editBlog = (blog) => {
    setBlogForm({
      title: blog.title,
      excerpt: blog.excerpt || "",
      content: blog.content,
      cover_image: blog.cover_image || "",
      tags: (blog.tags || []).join(", "),
      published: blog.published !== false,
    });
    setEditingId(blog.id);
    setBlogDialogOpen(true);
  };

  const resetBlogForm = () => {
    setBlogForm({ title: "", excerpt: "", content: "", cover_image: "", tags: "", published: true });
    setEditingId(null);
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Delete this contact submission?")) return;
    try { await api().delete(`/api/contacts/${id}`); fetchContacts(); } catch (e) { console.error(e); }
  };

  const markRead = async (id) => {
    try { await api().put(`/api/contacts/${id}/read`); fetchContacts(); } catch (e) { console.error(e); }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><p className="text-[#64748B]">Loading...</p></div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-12" data-testid="admin-dashboard">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading font-bold text-2xl text-[#0F172A]" data-testid="dashboard-title">Admin Dashboard</h1>
            <p className="text-[#64748B] font-body text-sm mt-1">Welcome back, {user?.name || "Admin"}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="rounded-full font-body" data-testid="logout-button">
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-200" data-testid="stat-blogs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f0fdfa] flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#1ab69e]" />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-[#0F172A]">{blogs.length}</p>
                <p className="text-xs text-[#64748B] font-body">Blog Posts</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200" data-testid="stat-contacts">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f0fdfa] flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-[#1ab69e]" />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-[#0F172A]">{contacts.length}</p>
                <p className="text-xs text-[#64748B] font-body">Contact Submissions</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200" data-testid="stat-unread">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f0fdfa] flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#1ab69e]" />
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-[#0F172A]">{contacts.filter(c => !c.read).length}</p>
                <p className="text-xs text-[#64748B] font-body">Unread Messages</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="blogs" className="space-y-6">
          <TabsList className="bg-white border border-slate-200 rounded-xl p-1" data-testid="dashboard-tabs">
            <TabsTrigger value="blogs" className="rounded-lg font-body data-[state=active]:bg-[#1ab69e] data-[state=active]:text-white">
              Blog Posts
            </TabsTrigger>
            <TabsTrigger value="contacts" className="rounded-lg font-body data-[state=active]:bg-[#1ab69e] data-[state=active]:text-white">
              Contact Submissions
            </TabsTrigger>
          </TabsList>

          {/* Blogs Tab */}
          <TabsContent value="blogs">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading font-semibold text-lg text-[#0F172A]">Manage Blog Posts</h2>
              <Dialog open={blogDialogOpen} onOpenChange={(open) => { setBlogDialogOpen(open); if (!open) resetBlogForm(); }}>
                <DialogTrigger asChild>
                  <Button className="bg-[#1ab69e] hover:bg-[#149380] text-white font-body rounded-full" data-testid="create-blog-button">
                    <Plus className="w-4 h-4 mr-2" /> New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="font-heading">{editingId ? "Edit Post" : "Create New Post"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleBlogSubmit} className="space-y-4 mt-4" data-testid="blog-form">
                    <div className="space-y-2">
                      <Label className="font-body text-sm">Title *</Label>
                      <Input value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} required className="rounded-xl" data-testid="blog-title-input" />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-sm">Excerpt</Label>
                      <Textarea value={blogForm.excerpt} onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })} rows={2} className="rounded-xl resize-none" data-testid="blog-excerpt-input" />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-sm">Content (HTML) *</Label>
                      <Textarea value={blogForm.content} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} required rows={8} className="rounded-xl font-mono text-sm" data-testid="blog-content-input" />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-sm">Cover Image URL</Label>
                      <Input value={blogForm.cover_image} onChange={(e) => setBlogForm({ ...blogForm, cover_image: e.target.value })} className="rounded-xl" data-testid="blog-image-input" />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-sm">Tags (comma separated)</Label>
                      <Input value={blogForm.tags} onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })} placeholder="SAP, ERP, Training" className="rounded-xl" data-testid="blog-tags-input" />
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="published" checked={blogForm.published} onChange={(e) => setBlogForm({ ...blogForm, published: e.target.checked })} className="accent-[#1ab69e]" data-testid="blog-published-checkbox" />
                      <Label htmlFor="published" className="font-body text-sm cursor-pointer">Published</Label>
                    </div>
                    <Button type="submit" disabled={loading} className="w-full bg-[#1ab69e] hover:bg-[#149380] text-white font-body rounded-full" data-testid="blog-submit-button">
                      {loading ? "Saving..." : editingId ? "Update Post" : "Create Post"}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-4">
              {blogs.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center">
                  <p className="text-[#64748B] font-body">No blog posts yet. Create your first one!</p>
                </div>
              ) : (
                blogs.map((blog) => (
                  <motion.div key={blog.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-2xl p-6 border border-slate-200 flex items-start gap-4" data-testid={`blog-item-${blog.id}`}>
                    {blog.cover_image && (
                      <img src={blog.cover_image} alt="" className="w-20 h-20 rounded-xl object-cover shrink-0 hidden sm:block" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-heading font-semibold text-base text-[#0F172A] truncate">{blog.title}</h3>
                        <Badge variant={blog.published ? "default" : "secondary"} className={`text-[10px] shrink-0 ${blog.published ? "bg-[#1ab69e] hover:bg-[#149380]" : ""}`}>
                          {blog.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                      <p className="text-[#64748B] font-body text-sm truncate">{blog.excerpt}</p>
                      <div className="flex gap-2 mt-3">
                        {(blog.tags || []).slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-[10px] bg-[#f0fdfa] text-[#1ab69e] px-2 py-0.5 rounded-full font-body">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm" variant="outline" onClick={() => editBlog(blog)} className="rounded-lg" data-testid={`edit-blog-${blog.id}`}>
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deleteBlog(blog.id)} className="rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50" data-testid={`delete-blog-${blog.id}`}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <h2 className="font-heading font-semibold text-lg text-[#0F172A] mb-6">Contact Submissions</h2>
            <div className="space-y-4">
              {contacts.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 border border-slate-200 text-center">
                  <p className="text-[#64748B] font-body">No contact submissions yet.</p>
                </div>
              ) : (
                contacts.map((contact) => (
                  <motion.div key={contact.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`bg-white rounded-2xl p-6 border ${contact.read ? "border-slate-200" : "border-[#1ab69e]/30 bg-[#f0fdfa]/30"}`} data-testid={`contact-item-${contact.id}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-heading font-semibold text-base text-[#0F172A]">{contact.name}</h3>
                          {!contact.read && <Badge className="bg-[#1ab69e] text-[10px]">New</Badge>}
                        </div>
                        <p className="text-[#64748B] font-body text-xs">{contact.email} {contact.phone && `| ${contact.phone}`}</p>
                        {contact.subject && <p className="text-[#334155] font-body text-sm font-medium mt-2">{contact.subject}</p>}
                        <p className="text-[#64748B] font-body text-sm mt-1">{contact.message}</p>
                        <p className="text-[#94A3B8] font-body text-xs mt-2">{new Date(contact.created_at).toLocaleString()}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {!contact.read && (
                          <Button size="sm" variant="outline" onClick={() => markRead(contact.id)} className="rounded-lg" data-testid={`mark-read-${contact.id}`}>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => deleteContact(contact.id)} className="rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50" data-testid={`delete-contact-${contact.id}`}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
