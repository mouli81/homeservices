import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchBookings = async () => {
    const res = await fetch("http://localhost:5000/api/bookings");
    const data = await res.json();
    setBookings(data);
  };

  const approveBooking = async (id) => {
    await fetch(`http://localhost:5000/api/bookings/${id}/approve`, {
      method: "PUT",
    });
    setBookings((prev) =>
      prev.map((b) =>
        b._id === id ? { ...b, status: "Approved" } : b
      )
    );
  };

  const cancelBooking = async (id) => {
    await fetch(`http://localhost:5000/api/bookings/${id}/cancel`, {
      method: "PUT",
    });
    setBookings((prev) =>
      prev.map((b) =>
        b._id === id ? { ...b, status: "Cancelled" } : b
      )
    );
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-1">Bookings</h1>
        <p className="text-gray-500">
          Track and manage all service bookings
        </p>
      </div>

      {/* Responsive Table */}
      <div className="bg-white rounded-3xl shadow overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">

          <thead className="bg-slate-50 text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">Service</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Time</th>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {bookings.map((b) => (
              <motion.tr
                key={b._id}
                whileHover={{ backgroundColor: "#f8fafc" }}
                className="transition"
              >
                {/* Service */}
                <td className="px-6 py-4 font-medium whitespace-nowrap">
                  {b.serviceName}
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {b.date}
                  </div>
                </td>

                {/* Time */}
                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {b.time}
                  </div>
                </td>

                {/* Customer */}
                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    {b.customerName || "User"}
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      b.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : b.status === "Approved"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  {b.status === "Pending" && (
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => approveBooking(b._id)}
                        className="inline-flex items-center gap-1 text-green-600 font-semibold hover:text-green-700"
                      >
                        <CheckCircle size={16} />
                        Approve
                      </button>

                      <button
                        onClick={() => cancelBooking(b._id)}
                        className="inline-flex items-center gap-1 text-red-500 font-semibold hover:text-red-600"
                      >
                        <XCircle size={16} />
                        Cancel
                      </button>
                    </div>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Hint */}
      <p className="text-xs text-gray-400 md:hidden">
        👉 Swipe horizontally to view all columns
      </p>

    </div>
  );
}
