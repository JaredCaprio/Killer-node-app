import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/auth/check`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setIsLoggedIn(data));
  }, []);

  return (
    <AuthContext.Provider value={isLoggedIn}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
