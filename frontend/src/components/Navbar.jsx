import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "../firebase";
import { ADMIN_UID } from "../constants/admin";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("uid");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          HomeServe
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">

          {loading ? (
            <div className="flex gap-4">
              <div className="w-20 h-4 bg-slate-200 rounded animate-pulse" />
              <div className="w-24 h-4 bg-slate-200 rounded animate-pulse" />
            </div>
          ) : (
            <>
              <NavItem to="/">Home</NavItem>
              <NavItem to="/services">Services</NavItem>

              {user && user.uid !== ADMIN_UID && (
                <NavItem to="/my-bookings">My Bookings</NavItem>
              )}

              {user && user.uid === ADMIN_UID && (
                <NavItem to="/admin" className="text-red-600">
                  Admin
                </NavItem>
              )}

              {!user ? (
                <NavItem to="/login" highlight>
                  Login
                </NavItem>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Logout
                </motion.button>
              )}
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t px-6 py-4 space-y-4"
          >
            <MobileLink to="/" onClick={() => setOpen(false)}>Home</MobileLink>
            <MobileLink to="/services" onClick={() => setOpen(false)}>Services</MobileLink>

            {user && user.uid !== ADMIN_UID && (
              <MobileLink to="/my-bookings" onClick={() => setOpen(false)}>
                My Bookings
              </MobileLink>
            )}

            {user && user.uid === ADMIN_UID && (
              <MobileLink to="/admin" onClick={() => setOpen(false)}>
                Admin
              </MobileLink>
            )}

            {!user ? (
              <MobileLink to="/login" onClick={() => setOpen(false)}>
                Login
              </MobileLink>
            ) : (
              <button
                onClick={handleLogout}
                className="block text-left text-blue-600 font-semibold"
              >
                Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ---------------- COMPONENTS ---------------- */

function NavItem({ to, children, highlight, className = "" }) {
  return (
    <motion.div whileHover={{ y: -2 }}>
      <Link
        to={to}
        className={`relative hover:text-blue-600 transition ${
          highlight ? "text-blue-600 font-semibold" : "text-slate-700"
        } ${className}`}
      >
        {children}
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full" />
      </Link>
    </motion.div>
  );
}

function MobileLink({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block text-slate-700 font-medium hover:text-blue-600"
    >
      {children}
    </Link>
  );
}
