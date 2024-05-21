import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRouteGerant() {
  const token = localStorage.getItem("token");
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.sub.role);
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Redirect based on role:
  if (userRole === "gerant") {
    return <Outlet />;
    // Render protected content for admins
  } // Users can also access protected content
}
