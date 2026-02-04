import Booking from "../models/Booking.js";

//  Create booking
export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      ...req.body,
      status: "Pending",
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Get all bookings
export const getBookings = async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
};

//  Approve booking
export const approveBooking = async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, {
    status: "Approved",
  });
  res.json({ message: "Booking approved" });
};

//  Cancel booking
export const cancelBooking = async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, {
    status: "Cancelled",
  });
  res.json({ message: "Booking cancelled" });
};
export const getUserBookings = async (req, res) => {
  const { userId } = req.params;
  const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });
  res.json(bookings);
};
