import { Navigate } from "react-router-dom";
import { ADMIN_UID } from "../constants/admin";

export default function AdminRoute({ children }) {
  const uid = localStorage.getItem("uid");
  return uid === ADMIN_UID ? children : <Navigate to="/login" replace />;
}
