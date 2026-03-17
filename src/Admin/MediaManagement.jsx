import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, X, Trash2, Edit2, Plus, Image as ImageIcon, Filter, Loader2 } from "lucide-react";
import toast from 'react-hot-toast';
import CropModal from "./CropModal";

const PAGES = ["Home", "About", "Programs", "Admissions", "Gallery", "Contact", "Testimonials", "SummerClub", "Daycare", "Courses", "Program_Details", "General"];
const SECTIONS = {
  Home: ["Hero_Main", "Hero_Side", "Why_Choose_Us", "Franchise_Banner"],
  About: ["Main_Graphic", "Vision_Banner", "Director_Image"],
  Programs: ["Nestlers_Header", "Bambino_Header", "Junior_Header", "Senior_Header"],
  Admissions: ["Background", "Side_Graphic"],
  Gallery: ["General"],
  Contact: ["Side_Graphic"],
  Testimonials: ["User_Avatars"],
  SummerClub: ["Hero_BG", "Main_Graphic", "Activity_1", "Activity_2", "Activity_3"],
  Daycare: ["Header_Image", "Side_Image"],
  Courses: ["Main_Banner", "Program_Banner", "Sensory", "Music", "Motor", "Story", "Art", "Dance", "Phonics", "Math", "Creative"],
  Program_Details: ["Nestlers_Tree", "Nestlers_Play", "Bambino_Tree", "Bambino_Girl", "Junior_Tree", "Junior_Toddler", "Senior_Tree", "Senior_Boy"],
  General: ["Navbar_Logo", "Footer_Logo", "Schedule_Visit_Side", "Parents_Talk_Banner"]
};

export default function MediaManagement() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedPage, setSelectedPage] = useState("All");
  const [file, setFile] = useState(null);
  const [altText, setAltText] = useState("");
  const [targetPage, setTargetPage] = useState("Home");
  const [targetSection, setTargetSection] = useState("Hero_Main");

  // Crop State
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState(null);
  const [editingImageId, setEditingImageId] = useState(null);

  const onFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setCropImageSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(e.target.files[0]);
      setCropModalOpen(true);
    }
  };

  const handleCropComplete = async (croppedBlob) => {
    // Provide a filename to the blob so it acts like a File
    const fileObj = new File([croppedBlob], "cropped.webp", { type: "image/webp" });
    setFile(fileObj);
  };

  const triggerEdit = (img) => {
    setEditingImageId(img.id);
    setTargetPage(img.page_name);
    setTargetSection(img.section_name);
    setAltText(img.image_alt || "");
    setFile(null); // Reset file so user can choose to upload new or keep old

    // Scroll to the upload form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setEditingImageId(null);
    setTargetPage("Home");
    setTargetSection("Hero_Main");
    setAltText("");
    setFile(null);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com";
    const token = localStorage.getItem("admin_token");

    try {
      const res = await fetch(`${API_BASE}/admin/media`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) setMedia(data);
    } catch (err) {
      // Error fetching media
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);

    const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com";
    const token = localStorage.getItem("admin_token");

    const formData = new FormData();
    if (file) formData.append("image", file);
    formData.append("page_name", targetPage);
    formData.append("section_name", targetSection);
    formData.append("image_alt", altText);

    try {
      const url = editingImageId
        ? `${API_BASE}/admin/media/${editingImageId}`
        : `${API_BASE}/admin/media/upload`;

      const method = editingImageId ? "PUT" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        resetForm();
        fetchMedia();
        toast.success(editingImageId ? "Image updated successfully!" : "Image uploaded successfully!");
      } else {
        toast.error(editingImageId ? "Failed to update image" : "Failed to upload image");
      }
    } catch (err) {
      // console.error(err);
      toast.error("An error occurred");
    } finally {
      setUploading(false);
    }
  };

  const performDelete = async (id, toastId) => {
    if (toastId) toast.dismiss(toastId);
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com";
    const token = localStorage.getItem("admin_token");

    try {
      const res = await fetch(`${API_BASE}/admin/media/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (res.ok) {
        fetchMedia();
        toast.success("Image deleted successfully!", { duration: 1500 });
      } else {
        toast.error("Failed to delete image", { duration: 1500 });
      }
    } catch (err) {
      // console.error(err);
      toast.error("An error occurred while deleting", { duration: 1500 });
    }
  };

  const performStatusUpdate = async (img, newStatus, toastId) => {
    if (toastId) toast.dismiss(toastId);
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com";
    const token = localStorage.getItem("admin_token");

    try {
      const res = await fetch(`${API_BASE}/admin/status/media/${img.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        fetchMedia();
        toast.success(`Image set to ${newStatus === 1 ? 'Active' : 'Inactive'}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      // console.error(err);
      toast.error("An error occurred");
    }
  };

  const toggleStatus = (img) => {
    const newStatus = img.status === 1 ? 0 : 1;
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-gray-900">
          Change status to <span className={newStatus === 1 ? "text-green-600" : "text-red-600"}>
            {newStatus === 1 ? 'Active' : 'Inactive'}
          </span>?
        </p>
        <div className="flex gap-2 justify-end mt-1">
          <button
            onClick={() => performStatusUpdate(img, newStatus, t.id)}
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

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-gray-900">Are you sure you want to delete this image?</p>
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

  const filteredMedia = selectedPage === "All"
    ? media
    : media.filter(img => img.page_name === selectedPage);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Management</h1>
          <p className="text-gray-500 text-sm">Upload and manage website images</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Form */}
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm h-fit sticky top-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500">
              <Upload size={20} />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Upload New Media</h2>
          </div>

          <form onSubmit={handleUpload} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Select Page</label>
              <select
                value={targetPage}
                onChange={(e) => {
                  setTargetPage(e.target.value);
                  setTargetSection(SECTIONS[e.target.value][0]);
                }}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/50"
              >
                {PAGES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Select Section</label>
              <select
                value={targetSection}
                onChange={(e) => setTargetSection(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/50"
              >
                {SECTIONS[targetPage]?.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Alt Text</label>
              <input
                type="text"
                placeholder="Brief description..."
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Image File</label>
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onFileSelect}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div className="w-full h-40 border-2 border-dashed border-gray-300 group-hover:border-orange-500/50 rounded-2xl flex flex-col items-center justify-center transition-all bg-gray-50 group-hover:bg-orange-50">
                  {file ? (
                    <p className="text-sm text-orange-600 font-medium">{file.name}</p>
                  ) : (
                    <>
                      <ImageIcon className="text-gray-400 mb-2" size={32} />
                      <p className="text-xs text-gray-500">Click or drag to upload</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={uploading || (!file && !editingImageId)}
                className={`w-full ${editingImageId ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20' : 'bg-orange-600 hover:bg-orange-500 shadow-orange-600/20'} text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50`}
              >
                {uploading ? <Loader2 className="animate-spin" size={20} /> : (editingImageId ? "Update Media" : "Upload Image")}
              </button>

              {editingImageId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Gallery */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setSelectedPage("All")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${selectedPage === "All"
                ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20"
                : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              All Media
            </button>
            {PAGES.map(p => (
              <button
                key={p}
                onClick={() => setSelectedPage(p)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${selectedPage === p
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20"
                  : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {loading ? (
              <div className="col-span-full py-20 flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
                <p className="text-gray-500 text-sm">Loading gallery...</p>
              </div>
            ) : filteredMedia.length === 0 ? (
              <div className="col-span-full py-20 text-center text-gray-500 italic">
                No images found for this category.
              </div>
            ) : filteredMedia.map((img) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img.image_url?.startsWith('data:image') || img.image_url?.startsWith('http') ? img.image_url : `${import.meta.env.VITE_API_BASE_URL || "https://bluestoneinternationalpreschool.com"}${img.image_url}`}
                    alt={img.image_alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-tighter">{img.page_name} - {img.section_name?.replace(/_/g, ' ')}</p>
                    <p className="text-[10px] text-gray-500 truncate max-w-[150px]">{img.image_alt || "No descriptor"}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => toggleStatus(img)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all shadow-sm ${img.status === 1
                          ? "bg-green-100 text-green-700 border border-green-200 hover:bg-green-200"
                          : "bg-red-100 text-red-700 border border-red-200 hover:bg-red-200"
                        }`}
                    >
                      {img.status === 1 ? "Active" : "Inactive"}
                    </button>
                    <div className="flex gap-1">
                      <button
                        onClick={() => triggerEdit(img)}
                        className="p-1.5 bg-blue-50/50 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(img.id)}
                        className="p-1.5 bg-red-50/50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {cropModalOpen && (
        <CropModal
          isOpen={cropModalOpen}
          imageSrc={cropImageSrc}
          onClose={() => {
            setCropModalOpen(false);
            setCropImageSrc(null);
            setEditingImageId(null);
          }}
          onCropComplete={(blob) => {
            setCropModalOpen(false);
            handleCropComplete(blob);
          }}
        />
      )}
    </div>
  );
}
