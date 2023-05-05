import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import { RiEdit2Fill } from "react-icons/ri";

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
          <div className="bg-gray-50 rounded-xl p-6 flex justify-between">
            <h1 className="md:text-2xl text-xl font-bold">{project.title}</h1>
            <Link
              className="flex gap-1 items-center text-gray-500 hover:text-black font-bold"
              to={`/projects/edit/${id}`}
            >
              <RiEdit2Fill />
              Editar
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default ProjectId;
