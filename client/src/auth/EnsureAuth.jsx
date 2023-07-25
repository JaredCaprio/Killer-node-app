import { Navigate } from "react-router-dom";
import { useAuth } from "./UserContext";

// eslint-disable-next-line react/prop-types
export default function EnsureAuth({ children }) {
  const auth = useAuth();
  console.log(auth);
  if (!auth) {
    return <Navigate to="/login" />;
  }

  return children;
}
