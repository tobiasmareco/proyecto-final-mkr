import { useEffect, createContext, useState } from "react";
import axiosClient from "../config/axiosClient";
import { useNavigate } from "react-router-dom";
axiosClient;
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    const authUser = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axiosClient.get("/api/profile", config);
        if (!data) {
          return; //verificar como mandar un error luego
        }
        setAuth(data.result);
        Navigate("/projects");
      } catch (error) {
        setAuth({});
      }
      setLoading(false);
    };
    authUser();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, AuthContext };
