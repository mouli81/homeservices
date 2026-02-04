import express from "express";
import {
  createBooking,
  getBookings,
  getUserBookings,   //  MISSING IMPORT (FIXED)
  approveBooking,
  cancelBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

//  Create booking
router.post("/", createBooking);

//  Admin – get all bookings
router.get("/", getBookings);

//  User – get own bookings
router.get("/user/:userId", getUserBookings);

//  Approve booking
router.put("/:id/approve", approveBooking);

//  Cancel booking
router.put("/:id/cancel", cancelBooking);

export default router;
