import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { ADMIN_UID } from "../constants/admin";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.uid === ADMIN_UID ? navigate("/admin") : navigate("/");
      }
    });
    return () => unsub();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      localStorage.setItem("uid", userCred.user.uid);

      userCred.user.uid === ADMIN_UID
        ? navigate("/admin")
        : navigate("/");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-12">
          <h2 className="text-4xl font-bold mb-4">Welcome Back 👋</h2>
          <p className="text-indigo-100">
            Login to manage your bookings.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-10 md:p-14"
        >
          <h3 className="text-3xl font-bold mb-6">Login</h3>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-4 rounded-xl"
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-4 rounded-xl"
              required
            />

            <button
              disabled={loading}
              className="w-full bg-purple-600 text-white py-4 rounded-xl"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-purple-600 font-medium">
              Create Account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
