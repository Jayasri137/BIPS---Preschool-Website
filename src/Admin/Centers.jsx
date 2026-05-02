import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Plus, MapPin, Phone, Mail, Clock,
  Trash2, Pencil, X, ChevronLeft, ChevronRight, Save, Loader2
} from "lucide-react";
import toast from 'react-hot-toast';

export default function CentersDashboard() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchCenters();
  }, []);

  const fetchCenters = async () => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com";
    const token = localStorage.getItem("admin_token");

    try {
      const res = await fetch(`${API_BASE}/admin/centers`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setCenters(data);
    } catch (err) {
      toast.error("Failed to fetch centers");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingItem({
      name: "",
      address: "",
      phone: "",
      email: "",
      hours: "Mon – Fri : 9:00 AM – 4:00 PM",
      mapSrc: ""
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
        <p className="text-sm font-semibold text-gray-900">Are you sure you want to delete this center?</p>
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
      const res = await fetch(`${API_BASE}/admin/centers/${id}`, {
        method: 'DELETE',
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        fetchCenters();
        toast.success("Center deleted successfully");
      } else {
        toast.error("Failed to delete center");
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
    const url = editingItem.id ? `${API_BASE}/admin/centers/${editingItem.id}` : `${API_BASE}/admin/centers`;

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
        fetchCenters();
        toast.success(`Center ${editingItem.id ? 'updated' : 'added'} successfully`);
      } else {
        toast.error(`Failed to ${editingItem.id ? 'update' : 'add'} center`);
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
      const res = await fetch(`${API_BASE}/admin/status/centers/${item.id}`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchCenters();
        toast.success(`Center ${newStatus === 1 ? 'activated' : 'deactivated'}`);
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // Filter and Pagination Logic
  const filteredData = centers.filter(item =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.address?.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-bold text-gray-900">Centers Management</h1>
          <p className="text-gray-500 text-sm">Manage preschool locations and contact details</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-purple-900 hover:bg-purple-800 rounded-xl text-xs font-bold text-white transition-all shadow-md"
          >
            <Plus size={16} /> Add New Center
          </button>
        </div>
      </div>

      <div ref={tableRef} className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search centers..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-900 focus:ring-2 focus:ring-purple-500/50 outline-none w-full transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-gray-500 text-[10px] uppercase tracking-widest">
                <th className="px-6 py-4 font-black">Center Name</th>
                <th className="px-6 py-4 font-black">Location & Address</th>
                <th className="px-6 py-4 font-black">Contact</th>
                <th className="px-6 py-4 font-black">Status</th>
                <th className="px-6 py-4 font-black text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-purple-900/30 border-t-purple-900 rounded-full animate-spin" />
                      <p className="text-gray-500 text-sm">Loading centers...</p>
                    </div>
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center text-gray-500 italic">
                    No centers found.
                  </td>
                </tr>
              ) : currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-gray-900">{item.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2 max-w-xs">
                      <MapPin size={14} className="text-purple-600 mt-1 shrink-0" />
                      <p className="text-[11px] text-gray-600 leading-relaxed">{item.address}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-[11px] text-gray-600">
                      <span className="flex items-center gap-1.5"><Phone size={12} className="text-purple-600" /> {item.phone}</span>
                      <span className="flex items-center gap-1.5"><Mail size={12} className="text-purple-600" /> {item.email}</span>
                      <span className="flex items-center gap-1.5"><Clock size={12} className="text-purple-600" /> {item.hours}</span>
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
                    <div className="flex items-center justify-end gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 rounded-xl hover:bg-blue-50 text-blue-600 transition-all"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-xl hover:bg-red-50 text-red-600 transition-all"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="p-6 border-t border-gray-200 flex items-center justify-between bg-gray-50">
            <p className="text-xs text-gray-500 font-medium">
              Showing <span className="text-gray-900 font-bold">{indexOfFirstItem + 1}</span> to <span className="text-gray-900 font-bold">{Math.min(indexOfLastItem, filteredData.length)}</span> of <span className="text-gray-900 font-bold">{filteredData.length}</span> entries
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-2xl rounded-3xl border border-gray-200 shadow-2xl p-8 overflow-y-auto max-h-[90vh] no-scrollbar"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">{editingItem.id ? 'Edit Center' : 'Add New Center'}</h3>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600"><X /></button>
              </div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-full space-y-2">
                  <label className="text-xs text-gray-500 font-bold uppercase">Center Name</label>
                  <input
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 outline-none focus:border-purple-500/50"
                    value={editingItem.name}
                    onChange={e => setEditingItem({ ...editingItem, name: e.target.value })}
                    placeholder="e.g. Salem Center"
                  />
                </div>
                <div className="col-span-full space-y-2">
                  <label className="text-xs text-gray-500 font-bold uppercase">Full Address</label>
                  <textarea
                    required
                    rows="2"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 outline-none focus:border-purple-500/50 resize-none"
                    value={editingItem.address}
                    onChange={e => setEditingItem({ ...editingItem, address: e.target.value })}
                    placeholder="Enter full address..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 font-bold uppercase">Phone</label>
                  <input
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 outline-none focus:border-purple-500/50"
                    value={editingItem.phone}
                    onChange={e => setEditingItem({ ...editingItem, phone: e.target.value })}
                    placeholder="+91 00000 00000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 font-bold uppercase">Email</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 outline-none focus:border-purple-500/50"
                    value={editingItem.email}
                    onChange={e => setEditingItem({ ...editingItem, email: e.target.value })}
                    placeholder="info@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 font-bold uppercase">Working Hours</label>
                  <input
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 outline-none focus:border-purple-500/50"
                    value={editingItem.hours}
                    onChange={e => setEditingItem({ ...editingItem, hours: e.target.value })}
                    placeholder="Mon – Fri : 9:00 AM – 4:00 PM"
                  />
                </div>
                <div className="col-span-full space-y-2">
                  <label className="text-xs text-gray-500 font-bold uppercase">Google Map Embed URL (src)</label>
                  <input
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 outline-none focus:border-purple-500/50"
                    value={editingItem.mapSrc}
                    onChange={e => setEditingItem({ ...editingItem, mapSrc: e.target.value })}
                    placeholder="https://www.google.com/maps/embed?..."
                  />
                </div>
                <div className="col-span-full flex gap-3 mt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1 bg-purple-900 hover:bg-purple-800 py-3 rounded-xl font-bold text-sm text-white transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    {editingItem.id ? 'Save Changes' : 'Add Center'}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)} 
                    className="flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-bold text-sm text-gray-600 border border-gray-200 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
