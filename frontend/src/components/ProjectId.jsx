import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import { RiAddBoxFill, RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";

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
  const [tasks, setTasks] = useState([]);

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
    const getTasks = async (id) => {
      try {
        const { data } = await axiosClient.get(`/api/tasks/${id}`, config);
        console.log(data);
        setTasks(data.result);
      } catch (error) {
        console.log(error.response);
      }
    };
    getProject(id);
    getTasks(id);
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <h1>Cargando...</h1>
        ) : (
          <>
            <div className="bg-gray-50 rounded-xl p-6 flex flex-col gap-4 text-center lg:text-left lg:flex-row justify-between">
              <h1 className="md:text-2xl text-xl font-bold">{project.title}</h1>
              <div className="flex gap-4 items-center justify-between ">
                <Link
                  className="flex gap-1 items-center hover:text-green-600 hover:border-black border px-2 py-1 rounded-md font-bold text-green-800 transition-colors"
                  to={`/projects/edit/${id}`}
                >
                  <RiEdit2Fill />
                  Editar
                </Link>
                <Link
                  className="flex gap-1 items-center hover:text-red-600 hover:border-black border px-2 py-1 rounded-md font-bold text-red-800 transition-colors"
                  to={`/projects/edit/${id}`}
                >
                  <RiDeleteBin2Fill />
                  Eliminar Proyecto
                </Link>
              </div>
            </div>
            <section>
              <div className="w-full bg-red-400]">
                <Link
                  className="flex gap-1 items-center hover:text-sky-600 hover:border-black  rounded-md font-bold text-sky-800 transition-colors"
                  to={`/projects/edit/${id}`}
                >
                  <RiAddBoxFill />
                  Agregar tareas
                </Link>{" "}
              </div>
              {tasks?.length > 0 ? (
                <h1>Hay tareas</h1>
              ) : (
                <h2>No existen tareas creadas.</h2>
              )}
            </section>
          </>
        )}
      </div>
    </>
  );
}

export default ProjectId;
