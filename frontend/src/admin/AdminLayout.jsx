import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Wrench,
  CalendarDays,
  Menu,
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "bg-blue-50 text-blue-600 font-semibold"
      : "text-gray-600 hover:bg-slate-100";

  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <motion.aside
        initial={{ x: -260 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className={`fixed md:static z-30 w-64 bg-white border-r flex flex-col
        ${open ? "left-0" : "-left-64"} md:left-0`}
      >

        {/* BRAND */}
        <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <h2 className="text-xl font-bold tracking-wide">HomeServe</h2>
          <p className="text-xs opacity-80">Admin Panel</p>
        </div>

        {/* NAV */}
        <nav className="flex-1 p-4 space-y-2 text-sm">
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive(
              "/admin"
            )}`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            to="/admin/services"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive(
              "/admin/services"
            )}`}
          >
            <Wrench size={18} />
            Services
          </Link>

          <Link
            to="/admin/bookings"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive(
              "/admin/bookings"
            )}`}
          >
            <CalendarDays size={18} />
            Bookings
          </Link>
        </nav>

        {/* FOOTER */}
        <div className="p-4 border-t text-xs text-gray-500">
          © 2026 HomeServe
        </div>
      </motion.aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR (MOBILE) */}
        <div className="md:hidden bg-white shadow px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <Menu />
          </button>
          <h1 className="font-semibold text-gray-700">
            Admin Panel
          </h1>
        </div>

        {/* PAGE CONTENT */}
        <motion.main
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-6 md:p-8"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}
