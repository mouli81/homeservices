import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-slate-300 mt-24">
      
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">

        {/* BRAND + CONTACT */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-wide">
            HomeServe
          </h2>

          <p className="text-sm leading-relaxed max-w-md text-slate-400">
            Professional home services at your doorstep. Quality,
            reliability, and customer satisfaction guaranteed.
          </p>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 hover:text-white transition">
              <Mail size={16} className="text-blue-400 shrink-0" />
              <span>contact@homeserve.com</span>
            </div>

            <div className="flex items-center gap-3 hover:text-white transition">
              <Phone size={16} className="text-blue-400 shrink-0" />
              <span>+91 98765 43210</span>
            </div>

            <div className="flex items-start gap-3 hover:text-white transition">
              <MapPin size={16} className="text-blue-400 mt-1 shrink-0" />
              <span>
                Chennai, Tamil Nadu <br />
                India
              </span>
            </div>
          </div>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-white font-semibold mb-5 tracking-wide">
            Popular Services
          </h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="hover:text-white cursor-pointer transition">Electrician</li>
            <li className="hover:text-white cursor-pointer transition">Plumber</li>
            <li className="hover:text-white cursor-pointer transition">House Cleaning</li>
            <li className="hover:text-white cursor-pointer transition">AC Repair</li>
            <li className="hover:text-white cursor-pointer transition">Carpenter</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-white font-semibold mb-5 tracking-wide">
            Support
          </h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="hover:text-white cursor-pointer transition">Help Center</li>
            <li className="hover:text-white cursor-pointer transition">Terms & Conditions</li>
            <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer transition">Contact Us</li>
          </ul>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-slate-700/60" />

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-slate-400 text-center md:text-left">
        © 2026 HomeServe. All rights reserved.
      </div>
    </footer>
  );
}
