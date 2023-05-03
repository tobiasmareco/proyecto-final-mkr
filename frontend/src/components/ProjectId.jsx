import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../config/axiosClient";

const token = localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

function ProjectId() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});

  useEffect(() => {
    const getProject = async (id) => {
      try {
        const { data } = await axiosClient.get(`/api/projects/${id}`, config);
        console.log(data);
        setProject(data?.result);
      } catch (error) {
        console.log(error.response);
      }
      setLoading(false);
    };
    getProject(id);
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <h1>Cargando...</h1>
        ) : (
          <h1 className="text-3xl font-bold">{project.title}</h1>
        )}
      </div>
    </>
  );
}

export default ProjectId;
