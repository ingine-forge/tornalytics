import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { apiKey } = useAuth();
  return apiKey ? children : <Navigate to="/login" />;
};
