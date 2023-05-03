import React, { useEffect, useState } from "react";
import axiosClient from "../config/axiosClient";
function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProjects = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axiosClient.get("/api/projects", config);
        setProjects(data.result);
      } catch (error) {
        console.log(error.response);
      }
      setLoading(false);
    };
    getProjects();
  }, []);
  return { projects, setProjects, loading };
}

export default useProjects;
