import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ServiceCard({ service }) {
  if (!service) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden group"
    >
      {/* Image */}
      <div className="h-44 overflow-hidden bg-gray-100">
        <img
          src={service.image || "/placeholder.jpg"}
          alt={service.name}
          loading="lazy"
          onError={(e) => (e.target.src = "/placeholder.jpg")}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {service.name}
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          {service.desc}
        </p>

        {/* ✅ Book Now – FIXED */}
        <Link
          to={`/book/${service._id}`}
          className="inline-flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition"
        >
          Book Now
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </motion.div>
  );
}
