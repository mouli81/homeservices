import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section className="bg-slate-100 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          <img
            src="https://img.freepik.com/free-photo/medium-shot-people-cleaning-building_23-2150454517.jpg"
            alt="Professional home service team"
            className="rounded-2xl shadow-2xl w-full object-cover"
          />

          {/* subtle frame */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10" />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            About Us
          </h2>

          {/* Accent line */}
          <div className="w-16 h-1 bg-blue-600 rounded-full mb-6" />

          <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
            <span className="font-semibold text-slate-900">
              HomeServe
            </span>{" "}
            provides reliable and professional home services for households
            and businesses. Our experienced team focuses on quality,
            safety, and timely delivery for every service.
          </p>

          <p className="text-slate-700 leading-relaxed text-base sm:text-lg mt-6">
            We go beyond basic services — we help create cleaner,
            safer, and more comfortable living spaces you can trust.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-10 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-3xl font-bold text-blue-600">10k+</p>
              <p className="text-sm text-slate-600">Professionals</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-3xl font-bold text-blue-600">50k+</p>
              <p className="text-sm text-slate-600">Customers</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-3xl font-bold text-blue-600">4.8★</p>
              <p className="text-sm text-slate-600">Rating</p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
