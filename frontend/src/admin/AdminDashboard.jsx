import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Wrench,
  ClipboardList,
  Users,
  Activity,
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  //  Auto-refresh every 5 seconds
  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchStats = async () => {
    const res = await fetch("http://localhost:5000/api/dashboard");
    const data = await res.json();
    setStats(data);
  };

  /* ---------------- SKELETON ---------------- */
  if (!stats) {
    return (
      <div className="space-y-10 animate-pulse">

        {/* Header Skeleton */}
        <div className="space-y-2">
          <div className="h-8 w-48 bg-slate-200 rounded" />
          <div className="h-4 w-64 bg-slate-200 rounded" />
        </div>

        {/* Cards Skeleton */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-36 bg-slate-200 rounded-3xl"
            />
          ))}
        </div>

        {/* Activity Skeleton */}
        <div className="bg-white rounded-3xl shadow p-8 space-y-4">
          <div className="h-6 w-48 bg-slate-200 rounded" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-4 bg-slate-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">
            Overview of platform activity
          </p>
        </div>

        <div className="text-sm text-gray-500">
          Last updated:{" "}
          <span className="font-medium">Just now</span>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* SERVICES */}
        <motion.div
          whileHover={{ y: -6 }}
          className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-6 rounded-3xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <Wrench className="opacity-80" />
            <span className="text-xs opacity-80">
              SERVICES
            </span>
          </div>

          <h2 className="text-4xl font-bold mt-4">
            {stats.totalServices}
          </h2>

          <p className="text-sm opacity-80 mt-2">
            Active services
          </p>
        </motion.div>

        {/* BOOKINGS */}
        <motion.div
          whileHover={{ y: -6 }}
          className="bg-gradient-to-br from-emerald-500 to-green-600 text-white p-6 rounded-3xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <ClipboardList className="opacity-80" />
            <span className="text-xs opacity-80">
              BOOKINGS
            </span>
          </div>

          <h2 className="text-4xl font-bold mt-4">
            {stats.totalBookings}
          </h2>

          <p className="text-sm opacity-80 mt-2">
            Total bookings
          </p>
        </motion.div>

        {/* USERS */}
        <motion.div
          whileHover={{ y: -6 }}
          className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-6 rounded-3xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <Users className="opacity-80" />
            <span className="text-xs opacity-80">
              USERS
            </span>
          </div>

          <h2 className="text-4xl font-bold mt-4">
            {stats.totalUsers}
          </h2>

          <p className="text-sm opacity-80 mt-2">
            Registered users
          </p>
        </motion.div>
      </div>

      {/* RECENT ACTIVITY */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow p-8"
      >
        <div className="flex items-center gap-2 mb-6">
          <Activity className="text-blue-600" />
          <h3 className="text-xl font-semibold">
            Recent Activity
          </h3>
        </div>

        {stats.recentBookings.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No recent activity
          </p>
        ) : (
          <ul className="space-y-4 text-sm">
            {stats.recentBookings.map((b) => (
              <li
                key={b._id}
                className="flex justify-between items-center"
              >
                <span className="font-medium">
                  Booking for {b.serviceName}
                </span>
                <span className="text-gray-400 text-xs">
                  {new Date(b.createdAt).toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </motion.div>

    </div>
  );
}
