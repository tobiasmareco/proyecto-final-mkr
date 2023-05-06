import React from "react";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

function TasksCard({ task }) {
  const { title, description, status } = task;
  const handleDelete = () => {
    //~DELETE TASK HERE.
  }
  return (
    <>
      <div className="border mt-3 max-w-md p-3 rounded-xl m-auto">
        <div className="px-3 py-1">
          <h3 className="font-bold text-center">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Link className="flex gap-1 items-center hover:text-green-600  border px-2 py-1 rounded-md font-bold text-black transition-colors" >
            <RiEdit2Fill />
            Editar Tarea
          </Link>
          <button
            className="flex gap-1 items-center hover:text-red-600 border px-2 py-1 rounded-md font-bold text-black transition-colors"
            onClick={handleDelete}
          >
            <RiDeleteBin2Fill />
            Eliminar Tarea
          </button>
        </div>
      </div>
    </>
  );
}

export default TasksCard;
