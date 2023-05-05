import React from "react";
import { useParams } from "react-router-dom";
import CreateProjectComp from "./CreateProjectComp";

function EditProjectComp() {
  const { id } = useParams();
  return (
    <>
      <h1 className="text-center font-bold text-2xl">Editar Proyecto</h1>
      <div className="mt-4 flex">
        <CreateProjectComp />
      </div>
    </>
  );
}

export default EditProjectComp;
