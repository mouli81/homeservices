import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  RotateCcw,
  BadgeCheck,
} from "lucide-react";

export default function BookService() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  //  Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  //  Fetch service
  useEffect(() => {
    fetch(`http://localhost:5000/api/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch(() => alert("Failed to load service"));
  }, [id]);

  //  Submit booking (UNCHANGED)
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to book a service");
      navigate("/login");
      return;
    }

    if (!address || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          serviceId: id,
          serviceName: service.name,
          address,
          date,
          time,
          customerName: user.displayName || user.email,
        }),
      });

      alert("Booking confirmed!");
      navigate("/my-bookings");
    } catch {
      alert("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  /*  Skeleton Loader */
  if (!service) {
    return (
      <section className="min-h-screen py-24 bg-slate-50 flex justify-center">
        <div className="w-full max-w-xl px-6 animate-pulse">
          <div className="h-6 w-24 bg-slate-300 rounded mb-4" />
          <div className="h-10 w-3/4 bg-slate-300 rounded mb-6" />
          <div className="bg-white p-8 rounded-3xl shadow space-y-4">
            <div className="h-12 bg-slate-200 rounded" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 bg-slate-200 rounded" />
              <div className="h-12 bg-slate-200 rounded" />
            </div>
            <div className="h-14 bg-slate-300 rounded" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white min-h-screen py-20 sm:py-24">
      <div className="max-w-xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full mb-3">
            QUICK BOOK
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Book {service.name}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Choose a convenient date and time
          </p>
        </motion.div>

        {/* Booking Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-6 sm:p-8"
        >
          <form onSubmit={handleBooking} className="space-y-6">

            {/* Address */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-700">
                <MapPin size={16} /> Service Address
              </label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House no, Street, Area, City"
                className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Date & Time */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-700">
                  <Calendar size={16} /> Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-300 p-4 rounded-xl"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2 text-gray-700">
                  <Clock size={16} /> Time Slot
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border border-gray-300 p-4 rounded-xl"
                >
                  <option value="">Select</option>
                  <option>9 AM – 12 PM</option>
                  <option>12 PM – 4 PM</option>
                  <option>4 PM – 8 PM</option>
                </select>
              </div>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold hover:bg-blue-700 transition text-base sm:text-lg"
            >
              {loading ? "Booking..." : "Confirm Booking →"}
            </motion.button>
          </form>

          {/* Trust Row */}
          <div className="grid grid-cols-3 text-xs text-gray-500 mt-6 text-center">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck size={16} className="text-blue-500" />
              Secure
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw size={16} className="text-blue-500" />
              Free Reschedule
            </div>
            <div className="flex flex-col items-center gap-1">
              <BadgeCheck size={16} className="text-blue-500" />
              Verified Experts
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
