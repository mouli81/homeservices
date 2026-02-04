import Service from "../models/Service.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalServices = await Service.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments(); // ✅ REAL COUNT

    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("serviceName createdAt status");

    res.json({
      totalServices,
      totalBookings,
      totalUsers,
      recentBookings,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
