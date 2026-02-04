import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ServiceCard from "../components/ServiceCard";

export default function Services() {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("search") || "";

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  //  Fetch services from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = services.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-3 text-gray-900">
            {query
              ? `Search results for "${query}"`
              : "Featured Home Services"}
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Choose from our wide range of verified home services delivered by
            trusted professionals.
          </p>
        </motion.div>

        {/* Skeleton Loader */}
        {loading && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow animate-pulse overflow-hidden"
              >
                <div className="h-44 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-20"
          >
            <p className="text-lg font-medium">No services found</p>
            <p className="text-sm mt-2">
              Try searching with a different keyword.
            </p>
          </motion.div>
        )}

        {/* Services Grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {filtered.map((service, i) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
