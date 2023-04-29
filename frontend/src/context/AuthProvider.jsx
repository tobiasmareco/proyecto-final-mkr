import { useContext, useEffect, createContext, useState } from "react";
import axiosClient from "../config/axiosClient";
axiosClient;
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) return;
    const authUser = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axiosClient.get("/api/users/profile", config);
        console.log(data);
      } catch (error) {}
    };
    authUser();
  }, []);

  console.log(auth, "is auth");
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, AuthContext };
