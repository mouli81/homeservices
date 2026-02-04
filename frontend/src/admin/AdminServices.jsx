import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  ImageIcon,
  Edit3,
  X,
} from "lucide-react";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  //  Edit state
  const [editingService, setEditingService] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editImage, setEditImage] = useState(null);

  //  Fetch services
  const fetchServices = async () => {
    const res = await fetch("http://localhost:5000/api/services");
    const data = await res.json();
    setServices(data);
    setInitialLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  //  Add service
  const addService = async () => {
    if (!name || !desc || !image) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("image", image);

    try {
      setLoading(true);
      await fetch("http://localhost:5000/api/services", {
        method: "POST",
        body: formData,
      });

      setName("");
      setDesc("");
      setImage(null);
      fetchServices();
    } catch {
      alert("Failed to add service");
    } finally {
      setLoading(false);
    }
  };

  //  Delete service
  const deleteService = async (id) => {
    await fetch(`http://localhost:5000/api/services/${id}`, {
      method: "DELETE",
    });
    fetchServices();
  };

  //  Update service (with image)
  const updateService = async () => {
    if (!editName || !editDesc) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", editName);
    formData.append("desc", editDesc);

    if (editImage) {
      formData.append("image", editImage);
    }

    await fetch(
      `http://localhost:5000/api/services/${editingService._id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    setEditingService(null);
    setEditImage(null);
    fetchServices();
  };

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold">Services</h1>
        <span className="text-sm text-gray-500">
          Manage all available services
        </span>
      </div>

      {/* Add Service */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow p-6 space-y-4"
      >
        <h2 className="font-semibold text-lg flex items-center gap-2">
          <Plus size={18} /> Add New Service
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            placeholder="Service Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
          />

          <input
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500"
          />

          <label className="flex items-center gap-3 border p-3 rounded-xl cursor-pointer text-gray-500 hover:bg-slate-50">
            <ImageIcon size={18} />
            <span className="text-sm">
              {image ? image.name : "Upload image"}
            </span>
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </div>

        <button
          onClick={addService}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Add Service"}
        </button>
      </motion.div>

      {/* Services Table */}
      <div className="bg-white rounded-3xl shadow overflow-x-auto">
        <table className="w-full min-w-[650px]">
          <thead className="bg-slate-50 text-sm text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">Service</th>
              <th className="px-6 py-4 text-left">Image</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {initialLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4">
                      <div className="h-4 w-32 bg-slate-200 rounded animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-12 w-20 bg-slate-200 rounded animate-pulse" />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="h-4 w-24 bg-slate-200 rounded ml-auto animate-pulse" />
                    </td>
                  </tr>
                ))
              : services.map((s) => (
                  <motion.tr
                    key={s._id}
                    whileHover={{ backgroundColor: "#f8fafc" }}
                  >
                    <td className="px-6 py-4 font-medium">{s.name}</td>

                    <td className="px-6 py-4">
                      <img
                        src={s.image}
                        alt={s.name}
                        className="h-14 w-24 object-cover rounded-lg"
                      />
                    </td>

                    <td className="px-6 py-4 text-right space-x-4">
                      <button
                        onClick={() => {
                          setEditingService(s);
                          setEditName(s.name);
                          setEditDesc(s.desc);
                          setEditImage(null);
                        }}
                        className="inline-flex items-center gap-1 text-blue-600 font-medium"
                      >
                        <Edit3 size={16} /> Edit
                      </button>

                      <button
                        onClick={() => deleteService(s._id)}
                        className="inline-flex items-center gap-1 text-red-500 font-medium"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editingService && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md space-y-5"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">Edit Service</h2>
                <button onClick={() => setEditingService(null)}>
                  <X />
                </button>
              </div>

              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="border p-3 w-full rounded-xl"
              />

              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                className="border p-3 w-full rounded-xl"
                rows={3}
              />

              <img
                src={editingService.image}
                alt="Current"
                className="h-28 w-full object-cover rounded-xl border"
              />

              <label className="flex items-center gap-3 border p-3 rounded-xl cursor-pointer text-gray-500 hover:bg-slate-50">
                <ImageIcon size={18} />
                <span className="text-sm">
                  {editImage ? editImage.name : "Replace image (optional)"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setEditImage(e.target.files[0])}
                />
              </label>

              <div className="flex gap-3">
                <button
                  onClick={() => setEditingService(null)}
                  className="w-1/2 border py-3 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={updateService}
                  className="w-1/2 bg-blue-600 text-white py-3 rounded-xl font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
