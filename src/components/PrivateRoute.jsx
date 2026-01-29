import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Component bảo vệ: Nếu chưa login thì chuyển hướng về Login
export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}
