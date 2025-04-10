import { useContext } from "react";
import { userContext } from "./Context/userContext";
import { Navigate } from "react-router-dom";

// Rota pra redirecionar o User caso ele não esteja Logado
export default function AuthRoute({ children }) {
  const { user, loading } = useContext(userContext);
  if (loading) return null;
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}
