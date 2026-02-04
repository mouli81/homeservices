import { Navigate } from "react-router-dom";

const ADMIN_UID = "VJKVJlFwQDfRgItwCmfui3fSYE23";

export default function AdminRoute({ children }) {
  const uid = localStorage.getItem("uid");

  // Not logged in
  if (!uid) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin
  if (uid !== ADMIN_UID) {
    return <Navigate to="/" replace />;
  }

  // Admin access
  return children;
}
