import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiAddBoxFill, RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import useProjects from "../../hooks/useProjects";

function ProjectById() {
  const { id } = useParams();
  const { getProjectId, project, loading } = useProjects()
  const [tasks, setTasks] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    getProjectId(id)
  }, [])

  return (
    <>
    {loading && (
      <h1 className="text-center font-bold text-xl">Loading...</h1>
    )}
        <div className="border border-gray-100 shadow-lg mb-5 rounded-xl p-6 flex flex-col gap-4 text-center lg:text-left lg:flex-row justify-between">
          <h1 className="md:text-2xl text-xl font-bold">{project.title}</h1>
          <div className="flex gap-4 items-center justify-between ">
            <Link
              className="flex gap-1 items-center hover:text-green-600 hover:border-black border px-2 py-1 rounded-md font-bold text-green-800 transition-colors"
              to={`/projects/edit/${id}`}
            >
              <RiEdit2Fill />
              Editar
            </Link>
            <button
              className="flex gap-1 items-center hover:text-red-600 hover:border-black border px-2 py-1 rounded-md font-bold text-red-800 transition-colors"
            // onClick={handleDelete}
            >
              <RiDeleteBin2Fill />
              Eliminar Proyecto
            </button>
          </div>
        </div>
        <section className="mx-auto container">
          <div className="">
            <Link
              className="flex gap-1 items-center hover:text-sky-600 hover:border-black  rounded-md font-bold text-sky-800 transition-colors"
              to={`/projects/create-task/${id}`}
            >
              <RiAddBoxFill />
              Agregar tareas
            </Link>
          </div>
          {tasks?.length > 0 ? (
            tasks.map(tsk => (
              console.log(tsk)
            ))
          ) : (
            <h2 className="font-bold text-xl mt-3">No existen tareas creadas.</h2>
          )}
        </section>
      </>
  );
}

export default ProjectById;
