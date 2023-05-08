import React from "react";
import useProjects from "../../hooks/useProjects";

function TasksCardComponent({ tasks }) {
  const { title, description, status, priority, createdAt, project } = tasks;
  const { handleEditTaskModal, handleDeleteTask } = useProjects();
  return (
    <>
      <div className="bg-blue-100 rounded-md text-black flex flex-col md:flex-row md:justify-between gap-10">
        <div className="flex flex-col px-3 py-5">
          <p className="text-center md:text-left font-bold text-xl">
            {title} -{" "}
            <span
              className={`font-bold italic uppercase text-sm text-gray-500 ${
                status == "finalizado" && "text-green-800"
              }`}
            >
              {status}
            </span>
          </p>
          <p className="text-gray-600">
            <span className="text-sm capitalize font-bold text-sky-800">
              descripcion:
            </span>{" "}
            {description}
          </p>
          <p className="text-gray-600">
            <span className="text-sm capitalize font-bold text-sky-800">
              prioridad:
            </span>{" "}
            {priority}
          </p>
          <p className="text-gray-600">
            <span className="text-sm capitalize font-bold text-sky-800">
              creado el:
            </span>{" "}
            {createdAt?.split("T")[0]}
          </p>
        </div>
        <div className="flex justify-between items-center p-3 md:flex-col md:justify-center gap-3">
          <button
            className="text-lg font-bold bg-blue-700 text-white py-1 px-3 rounded-lg hover:bg-blue-600 transition-colors hover:text-gray-200"
            onClick={() => {
              handleEditTaskModal(tasks);
            }}
          >
            Editar
          </button>
          <button
            className="text-lg font-bold bg-red-700 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors hover:text-gray-200"
            onClick={() => {
              handleDeleteTask(tasks);
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </>
  );
}

export default TasksCardComponent;
