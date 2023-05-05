import React from "react";
import { Link } from "react-router-dom";
const IMAGE_DEFAULT =
  "https://retaintechnologies.com/wp-content/uploads/2020/04/Project-Management-Mantenimiento-1.jpg";

function ProjectCard({ project }) {
  const { _id, title, description, createdAt, finishDate, image } = project;

  return (
    <>
      <div className="border border-gray-400/25 p-2 rounded-lg shadow-md">
        <div className="grid grid-cols-3 gap-3 ">
          <img
            src={image ? image : IMAGE_DEFAULT}
            alt="image"
            className="object-cover object-center col-span-2 p-2 rounded-2xl w-full h-40"
          />
          <div className="flex flex-col gap-2 justify-between py-3">
            <div>
              <p className="text-xs">Creado el:</p>
              <span className="font-bold text-xs">
                {createdAt.split("T")[0]}
              </span>
              <p className="text-xs">Fecha fin:</p>
              <span className="font-bold text-xs">
                {finishDate.split("T")[0]}
              </span>
            </div>
            <Link
              to={_id}
              className="text-center text-sm bg-sky-800 font-bold rounded-md text-white hover:bg-sky-700 transition-colors px-3"
            >
              Detalles
            </Link>
          </div>
        </div>
        <div>
          <h2 className="text-center font-bold text-xl">{title}</h2>
          <p className="text-gray-500 text-center hover:text-gray-700 text-sm">
            {description}
          </p>
        </div>
      </div>
    </>
  );
}

export default ProjectCard;
