import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle, XCircle, Hourglass } from "lucide-react";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    fetch(`http://localhost:5000/api/bookings/user/${user.uid}`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-24">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold mb-2 text-gray-900">
            My Bookings
          </h1>
          <p className="text-gray-600">
            Track your service history and upcoming appointments.
          </p>
        </motion.div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow animate-pulse"
              >
                <div className="h-5 bg-gray-200 rounded w-1/3 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/5" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && bookings.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            No bookings found.
          </div>
        )}

        {/* Booking Cards */}
        <div className="space-y-6">
          {bookings.map((b, i) => (
            <motion.div
              key={b._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-3xl shadow hover:shadow-lg transition p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                {/* Left */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {b.serviceName}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {b.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {b.time}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  {b.status === "Approved" && (
                    <span className="flex items-center gap-1 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                      <CheckCircle size={14} /> Approved
                    </span>
                  )}

                  {b.status === "Cancelled" && (
                    <span className="flex items-center gap-1 bg-red-100 text-red-600 px-4 py-1 rounded-full text-sm font-semibold">
                      <XCircle size={14} /> Cancelled
                    </span>
                  )}

                  {b.status === "Pending" && (
                    <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full text-sm font-semibold">
                      <Hourglass size={14} /> Pending
                    </span>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
