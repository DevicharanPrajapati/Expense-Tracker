import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [authLoading, setAuthLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
 

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setAuthLoading(false);
        return;
      }
      try {
        const response = await api.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log("Profile Response:", response.data);
        setUser(response.data.profile);
      } catch (error) {
        console.log(error.message);
      } finally {
        setAuthLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        authLoading,
        setAuthLoading,
        loginLoading,
        setLoginLoading,
        logout,
        registerLoading,
        setRegisterLoading,
       
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
