import { createContext, useEffect, useState } from "react";
import { authMe } from "../Services/userService";
import api from "../Services/api";

export const userContext = createContext();

export function UserProvider({ children }) {
  let [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  // Verificar se o JWT atual é válido ao abrir o App
  useEffect(() => {
    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) setUser(null);
        return Promise.reject(error);
      }
    );
    authMe()
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <userContext.Provider value={{ user, setUser, loading }}>
      {children}
    </userContext.Provider>
  );
}
