import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../../store/AuthContext";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isLoggedIn, user } = useContext(AuthContext);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/auth?mode=login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
} 