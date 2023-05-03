import React from "react";

function ProjectCard() {
  return (
    <>
      <div className="border border-gray-400/25 p-3 rounded-lg shadow-md">
        <div className="grid grid-cols-3 gap-3 ">
          <img
            src="https://via.placeholder.com/800x600"
            alt="image"
            className="cover col-span-2 w-full h-full p-5"
          />
          <div className="flex flex-col gap-3 justify-between py-5">
            <div>
              <p>CREADO EL:</p>
              <span className="italic font-bold text-sm">13/03/2023</span>
              <p>FECHA FINAL:</p>
              <span className="italic font-bold text-sm">13/03/2023</span>
            </div>
            <button>Opciones</button>
          </div>
        </div>
        <div>
          <h2>Title of project</h2>
          <p>description of project its here</p>
        </div>
      </div>
    </>
  );
}

export default ProjectCard;
