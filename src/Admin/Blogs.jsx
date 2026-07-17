import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Plus, Pencil, Trash2, X, ChevronLeft, ChevronRight, Save, Loader2,
  Image as ImageIcon, BookOpen, User
} from "lucide-react";
import toast from 'react-hot-toast';
import CropModal from "./CropModal";

export default function BlogsDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const tableRef = useRef(null);

  // Crop State
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState(null);
  const [currentCropTarget, setCurrentCropTarget] = useState(""); // 'blog_image' or 'author_image'

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com";
    const token = localStorage.getItem("admin_token");

    try {
      const res = await fetch(`${API_BASE}/admin/blogs`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setBlogs(data);
    } catch (err) {
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingItem({
      title: "",
      description: "",
      author_name: "",
      author_title: "",
      author_description: "",
      author_image: "",
      blog_image: ""
    });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-gray-900">Are you sure you want to delete this blog?</p>
        <div className="flex gap-2 justify-end mt-1">
          <button
            onClick={() => performDelete(id, t.id)}
            className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-all shadow-sm"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 3000,
      position: 'top-center',
      style: { background: '#fee2e2', border: '1px solid #ef4444', color: '#7f1d1d' }
    });
  };

  const performDelete = async (id, toastId) => {
    if (toastId) toast.dismiss(toastId);
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com";
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`${API_BASE}/admin/blogs/${id}`, {
        method: 'DELETE',
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        fetchBlogs();
        toast.success("Blog deleted successfully");
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com";
    const token = localStorage.getItem("admin_token");
    
    const method = editingItem.id ? 'PUT' : 'POST';
    const url = editingItem.id ? `${API_BASE}/admin/blogs/${editingItem.id}` : `${API_BASE}/admin/blogs`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editingItem)
      });
      if (res.ok) {
        setShowModal(false);
        fetchBlogs();
        toast.success(`Blog ${editingItem.id ? 'updated' : 'added'} successfully`);
      } else {
        toast.error(`Failed to ${editingItem.id ? 'update' : 'add'} blog`);
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleStatus = async (item) => {
    const newStatus = item.status === 1 ? 0 : 1;
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com";
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`${API_BASE}/admin/status/blogs/${item.id}`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchBlogs();
        toast.success(`Blog ${newStatus === 1 ? 'activated' : 'deactivated'}`);
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // Image Upload Logic
  const handleImageSelect = (e, targetField) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setCropImageSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(e.target.files[0]);
      setCurrentCropTarget(targetField);
      setCropModalOpen(true);
    }
    e.target.value = null; // Reset input
  };

  const handleCropComplete = (croppedBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(croppedBlob);
    reader.onloadend = () => {
      const base64data = reader.result;
      setEditingItem(prev => ({
        ...prev,
        [currentCropTarget]: base64data
      }));
      setCropModalOpen(false);
      setCurrentCropTarget("");
    };
  };

  // Filter and Pagination Logic
  const filteredData = blogs.filter(item =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (tableRef.current) tableRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
          <p className="text-gray-500 text-sm">Manage articles, news, and insights</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-xl text-xs font-bold text-white transition-all shadow-md"
          >
            <Plus size={16} /> Add Blog
          </button>
        </div>
      </div>

      <div ref={tableRef} className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">Details</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">Author</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-orange-500" />
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <BookOpen className="w-12 h-12 text-gray-300" />
                      <p className="text-sm font-medium">No blogs found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-14 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                          {item.blog_image ? (
                            <img src={item.blog_image} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <ImageIcon size={20} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 line-clamp-1">{item.title}</p>
                          <p className="text-xs text-gray-500 line-clamp-1 mt-1">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                          {item.author_image ? (
                            <img src={item.author_image} alt={item.author_name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <User size={16} />
                            </div>
                          )}
                        </div>
                        <p className="text-sm font-bold text-gray-700">{item.author_name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleStatus(item)}
                          className={`relative w-10 h-5 rounded-full transition-all p-1 flex items-center ${item.status === 1 ? 'bg-green-100' : 'bg-red-100'}`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full transition-all shadow-sm ${item.status === 1 ? 'bg-green-500 ml-5' : 'bg-red-500 ml-0.5'}`} />
                        </button>
                        <span className={`text-[10px] font-black uppercase tracking-tighter ${item.status === 1 ? 'text-green-600' : 'text-red-600'}`}>
                          {item.status === 1 ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(item)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
            <p className="text-xs text-gray-500 font-medium">
              Showing <span className="font-bold text-gray-900">{indexOfFirstItem + 1}</span> to <span className="font-bold text-gray-900">{Math.min(indexOfLastItem, filteredData.length)}</span> of <span className="font-bold text-gray-900">{filteredData.length}</span> results
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-white hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm bg-white"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all shadow-sm ${
                    currentPage === page
                      ? 'bg-orange-600 text-white border border-orange-600'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-white hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm bg-white"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingItem.id ? 'Edit Blog' : 'Add New Blog'}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">Fill out the details below.</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-400 hover:bg-white hover:text-gray-900 rounded-xl transition-all shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column - Content */}
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-widest block mb-2">Blog Title</label>
                      <input
                        type="text"
                        required
                        value={editingItem.title}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
                        placeholder="e.g. Benefits of Early Learning"
                      />
                    </div>
                    
                    <div>
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-widest block mb-2">Description / Content</label>
                      <textarea
                        required
                        value={editingItem.description}
                        onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all min-h-[250px] resize-y"
                        placeholder="Write the blog content here..."
                      />
                    </div>
                  </div>

                  {/* Right Column - Images & Author */}
                  <div className="space-y-6">
                    <div className="bg-orange-50/50 rounded-2xl p-5 border border-orange-100">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-widest block mb-4">Blog Image</label>
                      <div className="flex flex-col gap-4">
                        {editingItem.blog_image && (
                          <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm border border-orange-200 group">
                            <img src={editingItem.blog_image} alt="Blog Cover" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <label className="cursor-pointer bg-white text-orange-600 px-4 py-2 rounded-lg text-xs font-bold shadow-lg hover:bg-orange-50 transition-colors">
                                Change Image
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageSelect(e, 'blog_image')} />
                              </label>
                            </div>
                          </div>
                        )}
                        {!editingItem.blog_image && (
                          <label className="cursor-pointer border-2 border-dashed border-orange-300 rounded-xl p-8 flex flex-col items-center justify-center gap-3 text-orange-500 hover:bg-orange-100/50 hover:border-orange-400 transition-all">
                            <ImageIcon size={32} />
                            <div className="text-center">
                              <p className="text-sm font-bold text-gray-900">Upload Blog Image</p>
                              <p className="text-xs text-gray-500 mt-1">Click to browse (cropped to fit)</p>
                            </div>
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageSelect(e, 'blog_image')} />
                          </label>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100">
                      <h3 className="text-sm font-bold text-gray-900 mb-4 border-b border-blue-200 pb-2">Author Information</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Author Name</label>
                          <input
                            type="text"
                            required
                            value={editingItem.author_name}
                            onChange={(e) => setEditingItem({ ...editingItem, author_name: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-blue-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            placeholder="e.g. Jane Doe"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Author Title/Role</label>
                          <input
                            type="text"
                            value={editingItem.author_title || ""}
                            onChange={(e) => setEditingItem({ ...editingItem, author_title: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-blue-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            placeholder="e.g. Senior Educator"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Author Description</label>
                          <textarea
                            value={editingItem.author_description || ""}
                            onChange={(e) => setEditingItem({ ...editingItem, author_description: e.target.value })}
                            className="w-full px-4 py-2.5 bg-white border border-blue-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all min-h-[80px] resize-y"
                            placeholder="Brief bio about the author..."
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Author Avatar</label>
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden bg-white border-2 border-blue-200 shrink-0 shadow-sm flex items-center justify-center text-gray-400 relative group">
                              {editingItem.author_image ? (
                                <>
                                  <img src={editingItem.author_image} alt="Author" className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                    <label className="cursor-pointer w-full h-full flex items-center justify-center">
                                      <Pencil size={14} className="text-white" />
                                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageSelect(e, 'author_image')} />
                                    </label>
                                  </div>
                                </>
                              ) : (
                                <User size={24} />
                              )}
                            </div>
                            <label className="cursor-pointer text-xs font-bold text-blue-600 bg-blue-100 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                              {editingItem.author_image ? 'Change Avatar' : 'Upload Avatar'}
                              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageSelect(e, 'author_image')} />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2.5 rounded-xl text-gray-600 font-bold hover:bg-gray-100 transition-all text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={18} />}
                    {isSubmitting ? 'Saving...' : 'Save Blog'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Crop Modal */}
      {cropModalOpen && (
        <CropModal
          isOpen={cropModalOpen}
          imageSrc={cropImageSrc}
          onClose={() => {
            setCropModalOpen(false);
            setCropImageSrc(null);
            setCurrentCropTarget("");
          }}
          onCropComplete={(blob) => {
            handleCropComplete(blob);
          }}
        />
      )}
    </div>
  );
}
