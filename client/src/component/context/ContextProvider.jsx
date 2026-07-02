// src/component/context/ContextProvider.jsx
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { useCallback } from "react";
export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  import { toast } from "sonner";

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setAuthUser(storedUser);
    }
    setAuthLoading(false);
  }, []);

  const login = useCallback(({ token, user }) => {
    const normalizedUser = { ...user, _id: user?._id || user?.id };
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(normalizedUser));
    setToken(token);
    setAuthUser(normalizedUser);
    console.log("User logged in:", normalizedUser);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setToken(null);
    setAuthUser(null);
    toast.success("Logged out successfully!");
  }, []);

  const value = { authUser, token, authLoading, login, logout, setAuthUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
