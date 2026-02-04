import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/services?search=${query}`);
  };

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.pexels.com/photos/6195895/pexels-photo-6195895.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Home services"
          className="w-full h-full object-cover scale-110 sm:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-800/65 to-indigo-900/75" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center text-white w-full">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5"
          >
            Trusted Home Services <br />
            <span className="text-blue-200">At Your Doorstep</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-sm sm:text-base md:text-lg opacity-90 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Book verified electricians, plumbers, cleaners and technicians.
            Transparent pricing. On-time service. 100% satisfaction guaranteed.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className="bg-white rounded-2xl p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shadow-2xl max-w-xl mx-auto lg:mx-0 mb-10"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search electrician, plumber, AC repair..."
              className="flex-1 px-4 py-3 rounded-xl text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition w-full sm:w-auto"
            >
              Search
            </motion.button>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/services"
              className="bg-white text-blue-700 px-8 py-3 rounded-full font-semibold shadow-md text-center"
            >
              Book a Service
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition text-center"
            >
              Contact Us
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
