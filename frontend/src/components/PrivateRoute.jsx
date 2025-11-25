import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, allowedRoles }) {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div> // show a loading state while checking auth
  }

  if (!auth || !auth.accessToken) {
    return <Navigate to="/login" replace /> // Redirect to login if not authenticated
  }

  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    return <Navigate to="/unauthorized" />; // Redirect if role is not allowed
  }

  return typeof children === "function" ? children(auth) : children;
}