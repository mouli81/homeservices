import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookService from "./pages/BookService";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminServices from "./admin/AdminServices";
import AdminBookings from "./admin/AdminBookings";
import AdminRoute from "./admin/AdminRoute";
import MyBookings from "./pages/MyBookings";
import ContactUs from "./pages/ContactUs";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
        path="/admin"
        element={
        <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  }
>
        <Route index element={<AdminDashboard />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="bookings" element={<AdminBookings />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/:id" element={<BookService />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
