import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { ADMIN_UID } from "../constants/admin";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.uid === ADMIN_UID ? navigate("/admin") : navigate("/");
      }
    });
    return () => unsub();
  }, [navigate]);

  const handleRegister = async (e) => {
  e.preventDefault();
  setError("");

  if (password.length < 6) {
    setError("Password must be at least 6 characters");
    return;
  }

  try {
    setLoading(true);

    //  Firebase register
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCred.user, { displayName: name });

    //  SAVE USER TO BACKEND (THIS IS THE MISSING PART)
    await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        role: userCred.user.uid === ADMIN_UID ? "admin" : "user",
      }),
    });

    // Store UID locally
    localStorage.setItem("uid", userCred.user.uid);

    // Redirect
    userCred.user.uid === ADMIN_UID
      ? navigate("/admin")
      : navigate("/");
  } catch (err) {
    setError(err.message.replace("Firebase:", ""));
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-12">
          <h2 className="text-4xl font-bold mb-4">Join HomeServe 🚀</h2>
          <p className="text-indigo-100">
            Create your account to book services securely.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-10 md:p-14"
        >
          <h3 className="text-3xl font-bold mb-6">Create Account</h3>

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-4 rounded-xl"
              required
            />
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
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 font-medium">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
