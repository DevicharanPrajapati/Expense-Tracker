import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContexts";

const ProtectedRoute = ({ children }) => {
  const { token, authLoading, user } = useAuth();

  if (authLoading) {
    return <div>Loading...</div>; // या Spinner
  }

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
