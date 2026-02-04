import { motion } from "framer-motion";
import {
  FiShield,
  FiDollarSign,
  FiClock,
  FiLock,
  FiHeadphones,
} from "react-icons/fi";

const features = [
  {
    title: "Verified Professionals",
    desc: "Background-checked and trained experts you can trust.",
    icon: <FiShield />,
  },
  {
    title: "Transparent Pricing",
    desc: "Upfront prices with no hidden charges.",
    icon: <FiDollarSign />,
  },
  {
    title: "On-Time Service",
    desc: "Professionals arrive on time, every time.",
    icon: <FiClock />,
  },
  {
    title: "Secure Booking",
    desc: "Safe payments and protected user data.",
    icon: <FiLock />,
  },
  {
    title: "24/7 Support",
    desc: "We’re here for you anytime you need help.",
    icon: <FiHeadphones />,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4 text-slate-900">
            Why Choose HomeServe?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We make home services reliable, affordable, and stress-free.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Feature Cards */}
          <div className="grid sm:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition border border-slate-100"
              >
                <div className="text-3xl text-blue-600 mb-4">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-slate-800">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-6">
            <img
              src="https://media.gettyimages.com/id/1459340202/photo/woman-making-home-imprevement.jpg?s=612x612&w=0&k=20&c=3AOhYtPKsNLiQIJxJ2LUA3FjVBfbVGA9tW_hrKAl6i4="
              alt="Service"
              className="rounded-2xl shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&w=600&q=80"
              alt="Service"
              className="rounded-2xl shadow-lg"
            />
            <img
              src="https://media.gettyimages.com/id/961748068/photo/full-length-of-construction-workers-analyzing-blueprints-in-the-apartment.jpg?s=612x612&w=0&k=20&c=zBm29SEbdc97bjQ8HExgvELOshf8Lk04A3bZw3F93tU="
              alt="Service"
              className="rounded-2xl shadow-lg"
            />
            <img
              src="https://media.gettyimages.com/id/1464505039/photo/customer-welcoming-repairman.jpg?s=612x612&w=0&k=20&c=oYgqA01v1VzdDGFcndCX2IyKCyCJtwZBGsL_5dYoo60="
              alt="Service"
              className="rounded-2xl shadow-lg"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
