import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Mail, Phone, MapPin, Trash2, Building2, Pencil, History, X, Clock, User, ChevronLeft, ChevronRight } from "lucide-react";
import toast from 'react-hot-toast';

export default function FranchiseDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyLogs, setHistoryLogs] = useState([]);
  const [selectedRecordName, setSelectedRecordName] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com";
    const token = localStorage.getItem("admin_token");

    try {
      const res = await fetch(`${API_BASE}/admin/franchise`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setEnquiries(data);
    } catch (err) {
      // Error fetching enquiries
    } finally {
      setLoading(false);
    }
  };

  const fetchRecordHistory = async (id, name) => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com";
    const token = localStorage.getItem("admin_token");
    setSelectedRecordName(name);
    try {
      const res = await fetch(`${API_BASE}/admin/history/FRANCHISE/${id}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      setHistoryLogs(data);
      setShowHistoryModal(true);
    } catch (err) {
      // Error fetching history
    }
  };

  const performDelete = async (id, toastId) => {
    if (toastId) toast.dismiss(toastId);
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com";
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`${API_BASE}/admin/franchise/${id}`, {
        method: 'DELETE',
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        fetchEnquiries();
        toast.success("Franchise enquiry deleted successfully", { duration: 1500 });
      } else {
        toast.error("Failed to delete enquiry", { duration: 1500 });
      }
    } catch (err) {
      // console.error(err);
      toast.error("An error occurred", { duration: 1500 });
    }
  };

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-gray-900">Are you sure you want to delete this franchise inquiry?</p>
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
      style: {
        background: '#fee2e2',
        border: '1px solid #ef4444',
        color: '#7f1d1d'
      }
    });
  };

  const performStatusUpdate = async (item, newStatus, toastId) => {
    if (toastId) toast.dismiss(toastId);
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com";
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`${API_BASE}/admin/status/franchise/${item.id}`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchEnquiries();
        toast.success(`Status changed to ${newStatus === 1 ? 'Active' : 'Inactive'}`);
      } else {
        toast.error("Failed to alter status");
      }
    } catch (err) {
      // console.error(err);
      toast.error("An error occurred");
    }
  };

  const toggleStatus = (item) => {
    const newStatus = item.status === 1 ? 0 : 1;
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-gray-900">
          Change status to <span className={newStatus === 1 ? "text-green-600" : "text-red-600"}>
            {newStatus === 1 ? 'Active' : 'Inactive'}
          </span>?
        </p>
        <div className="flex gap-2 justify-end mt-1">
          <button
            onClick={() => performStatusUpdate(item, newStatus, t.id)}
            className={`px-3 py-1.5 text-white text-xs font-bold rounded-lg transition-all shadow-sm ${newStatus === 1 ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
              }`}
          >
            Confirm
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
      duration: 4000,
      position: 'top-center',
      style: {
        background: '#fff',
        border: '1px solid #e5e7eb',
        padding: '12px'
      }
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com";
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`${API_BASE}/admin/franchise/${editingItem.id}`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editingItem)
      });
      if (res.ok) {
        setShowEditModal(false);
        fetchEnquiries();
        toast.success("Enquiry updated successfully");
      } else {
        toast.error("Failed to update enquiry");
      }
    } catch (err) {
      // console.error(err);
      toast.error("An error occurred");
    }
  };

  // Filter and Pagination Logic
  const filteredData = enquiries.filter(item =>
    item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = itemsPerPage === 'all' ? 1 : Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * (itemsPerPage === 'all' ? filteredData.length : itemsPerPage);
  const indexOfFirstItem = indexOfLastItem - (itemsPerPage === 'all' ? filteredData.length : itemsPerPage);
  const currentItems = itemsPerPage === 'all' ? filteredData : filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (tableRef.current) tableRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Franchise Enquiries</h1>
          <p className="text-gray-500 text-sm">Review potential franchise partners</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-gray-200 shadow-sm">
            <span className="text-xs text-gray-500 font-bold uppercase whitespace-nowrap">Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(e.target.value === 'all' ? 'all' : Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-transparent text-xs font-bold text-gray-900 outline-none cursor-pointer"
            >
              <option value={10} className="bg-white">10</option>
              <option value={20} className="bg-white">20</option>
              <option value={50} className="bg-white">50</option>
              <option value={100} className="bg-white">100</option>
              <option value="all" className="bg-white">All</option>
            </select>
          </div>
        </div>
      </div>

      <div ref={tableRef} className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search partners..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-900 focus:ring-2 focus:ring-purple-500/50 outline-none w-full transition-all"
            />
          </div>
        </div>

        <div
          className="overflow-x-auto relative"
          style={{ maxHeight: itemsPerPage > 10 || itemsPerPage === 'all' ? '70vh' : 'auto' }}
        >
          <table className="w-full text-left">
            <thead className="sticky top-0 z-10 bg-gray-50 shadow-sm border-b border-gray-200">
              <tr className="text-gray-500 text-xs uppercase tracking-widest">
                <th className="px-6 py-4 font-semibold text-[10px] uppercase">Partner Details</th>
                <th className="px-6 py-4 font-semibold text-[10px] uppercase">Contact</th>
                <th className="px-6 py-4 font-semibold text-[10px] uppercase">Location</th>
                <th className="px-6 py-4 font-semibold text-[10px] uppercase">Status</th>
                <th className="px-6 py-4 font-semibold text-[10px] uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                      <p>Loading franchise inquiries...</p>
                    </div>
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center text-gray-500 italic">No partners found.</td>
                </tr>
              ) : currentItems.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${item.status === 1 ? 'bg-purple-100 text-purple-600' : 'bg-gray-200 text-gray-600'
                        }`}>
                        <Building2 size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 mb-0.5">{item.fullName}</p>
                        <p className="text-[10px] text-gray-500 uppercase font-black tracking-tighter">Franchise Inquiry</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-[11px] text-gray-600">
                      <span className="flex items-center gap-1.5"><Mail size={12} className="text-purple-500" /> {item.email}</span>
                      <span className="flex items-center gap-1.5"><Phone size={12} className="text-purple-500" /> {item.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-600">
                      <MapPin size={12} className="text-purple-500" /> {item.city}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleStatus(item)}
                        className={`relative w-8 h-4 rounded-full transition-all p-0.5 flex items-center ${item.status === 1 ? 'bg-green-100' : 'bg-red-100'
                          }`}
                      >
                        <div className={`w-3 h-3 rounded-full transition-all shadow-sm ${item.status === 1 ? 'bg-green-500 ml-4' : 'bg-red-500 ml-0'
                          }`} />
                      </button>
                      <span className={`text-[10px] font-black uppercase tracking-tighter ${item.status === 1 ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {item.status === 1 ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditingItem(item);
                          setShowEditModal(true);
                        }}
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
                      <button
                        onClick={() => fetchRecordHistory(item.id, item.fullName)}
                        className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-all"
                        title="View History"
                      >
                        <History size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {itemsPerPage !== 'all' && totalPages > 1 && (
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

              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-all shadow-sm ${currentPage === i + 1
                        ? "bg-purple-600 text-white"
                        : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

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
        {showEditModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-lg rounded-3xl border border-gray-200 shadow-2xl p-8 overflow-y-auto max-h-[90vh] no-scrollbar"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Edit Franchise Enquiry</h3>
                <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600"><X /></button>
              </div>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 font-bold uppercase">Full Name</label>
                  <input
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 outline-none focus:border-purple-500/50"
                    value={editingItem.fullName}
                    onChange={e => setEditingItem({ ...editingItem, fullName: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 font-bold uppercase">Email</label>
                    <input
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 outline-none focus:border-purple-500/50"
                      value={editingItem.email}
                      onChange={e => setEditingItem({ ...editingItem, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 font-bold uppercase">Phone</label>
                    <input
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 outline-none focus:border-purple-500/50"
                      value={editingItem.phone}
                      onChange={e => setEditingItem({ ...editingItem, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 font-bold uppercase">City</label>
                    <input
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 outline-none focus:border-purple-500/50"
                      value={editingItem.city}
                      onChange={e => setEditingItem({ ...editingItem, city: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-gray-500 font-bold uppercase">Status</label>
                    <select
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 outline-none cursor-pointer focus:border-orange-500/50"
                      value={editingItem.status ?? 1}
                      onChange={e => setEditingItem({ ...editingItem, status: Number(e.target.value) })}
                    >
                      <option value={1} className="bg-white">Active</option>
                      <option value={0} className="bg-white">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-gray-500 font-bold uppercase">Message</label>
                  <textarea
                    rows="3"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 outline-none focus:border-purple-500/50 resize-none"
                    value={editingItem.message}
                    onChange={e => setEditingItem({ ...editingItem, message: e.target.value })}
                  />
                </div>
                <div className="flex gap-3 mt-4">
                  <button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-bold text-sm text-white transition-all shadow-md">Save Changes</button>
                  <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-bold text-sm text-gray-600 transition-all border border-gray-200">Cancel</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showHistoryModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-lg rounded-3xl border border-gray-200 shadow-2xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Record History</h3>
                  <p className="text-xs text-gray-500">Audit trail for: {selectedRecordName}</p>
                </div>
                <button onClick={() => setShowHistoryModal(false)} className="text-gray-400 hover:text-gray-600"><X /></button>
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar border-l border-gray-200 ml-2">
                {historyLogs.length === 0 ? (
                  <div className="text-center py-10 text-gray-500 italic">No history available for this record.</div>
                ) : historyLogs.map((log) => (
                  <div key={log.id} className="relative pl-6 pb-4">
                    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-purple-500 shadow-md shadow-purple-500/30" />
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase ${log.action_type === 'DELETE' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                          }`}>
                          {log.action_type}
                        </span>
                        <span className="text-[10px] text-gray-500 flex items-center gap-1">
                          <Clock size={10} /> {new Date(log.created_at).toLocaleString()}
                        </span>
                      </div>

                      <div className="text-xs text-gray-600 mt-1">
                        {log.details.startsWith('Changed: ') ? (
                          <div className="space-y-2 mt-2">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Detailed Changes:</p>
                            {log.details.replace('Changed: ', '').split(', ').map((change, idx) => {
                              const parts = change.split(': ');
                              if (parts.length < 2) return <li key={idx} className="text-[11px] list-disc ml-2">{change}</li>;
                              const field = parts[0];
                              const values = parts[1];
                              const [oldVal, newVal] = values.split(' ➔ ');
                              return (
                                <div key={idx} className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                                  <p className="text-[10px] text-orange-600 font-bold uppercase mb-1">{field.replace(/([A-Z])/g, ' $1')}</p>
                                  <div className="flex items-center gap-2 text-[11px]">
                                    <span className="text-gray-400 line-through">{oldVal?.replace(/'/g, '') || 'N/A'}</span>
                                    <span className="text-gray-400">➔</span>
                                    <span className="text-green-600 font-medium">{newVal?.replace(/'/g, '') || 'N/A'}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="py-1">{log.details}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
                        <User size={10} /> By: <span className="text-gray-800 font-bold">{log.admin_name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowHistoryModal(false)}
                className="w-full mt-6 bg-gray-100 hover:bg-gray-200 border border-gray-200 py-3 rounded-xl font-bold text-sm text-gray-600 transition-all"
              >
                Close History
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
