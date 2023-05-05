import React, { useEffect, useState } from "react";
import AlertMsg from "./Alert";
import axiosClient from "../config/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

const token = localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

function CreateProjectComp() {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [status, setStatus] = useState(null);
  const [image, setImage] = useState("");
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    setId(param.id);
    const getProjectId = async (id) => {
      if (id) {
        const { data } = await axiosClient.get(`/api/projects/${id}`, config);
        const { title, description, finishDate, status } = data.result;
        setTitle(title);
        setDescription(description);
        setFinishDate(finishDate.split("T")[0]);
        setStatus(status);
      }
    };
    getProjectId(param.id);
  }, [param]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosClient.put(
        `/api/projects/${id}`,
        { title, description, finishDate, status },
        config
      );
      setMessage(data.msg);
      setTimeout(() => {
        navigate("/projects");
      }, 1000);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([title.trim(), description.trim()].includes("")) {
      return setError({
        error: true,
        msg: "Complete los campos obligatorios.",
      });
    }
    setError({});
    try {
      const { data } = await axiosClient.post(
        "/api/projects",
        {
          title,
          description,
          finishDate,
          image,
        },
        config
      );
      setMessage(data.msg); //PONER MENSAJE DE CREADO CORRECTAMENTE
      setTimeout(() => {
        navigate("/projects");
      }, 1000);
    } catch (error) {
      console.log(error.response);
      setError({
        msg: error.response.data.error
          ? error.response.data.error.msg
          : error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <form
      className="bg-white py-10 px-5 md:w-9/12 rounded-lg shadow"
      onSubmit={id ? handleUpdate : handleSubmit}
    >
      {error.msg && <AlertMsg alert={error} />}
      {message && <AlertMsg alert={{ msg: message, error: false }} />}
      <div className="mb-5">
        <label
          className='text-gray-700 uppercase font-bold text-sm  after:content-["*"] after:text-gray-400 after:ml-1'
          htmlFor="nombre"
        >
          Nombre Proyecto
        </label>

        <input
          id="nombre"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del Proyecto"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className='text-gray-700 uppercase font-bold text-sm after:content-["*"] after:text-gray-400 after:ml-1'
          htmlFor="descripcion"
        >
          Descripción
        </label>

        <textarea
          id="descripcion"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripción del Proyecto"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="fecha-entrega"
        >
          Fecha Entrega
        </label>

        <input
          id="fecha-entrega"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={finishDate}
          onChange={(e) => setFinishDate(e.target.value)}
        />
      </div>
      {status && (
        <div className="mb-5 flex gap-2 items-center">
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="fecha-entrega"
          >
            Estado
          </label>
          <select
            name=""
            id=""
            className="px-3 rounded-sm border border-spacing-1"
          >
            <option value="pendiente">pendiente</option>
          </select>
        </div>
      )}
      <div className="mb-5">
        <input
          type="file"
          id="image"
          name="image"
          onChange={(e) => setImage(e.target.value)}
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
        />
      </div>
      <input
        type="submit"
        value={id ? "Actualizar Proyecto" : "Crear Proyecto"}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
}

export default CreateProjectComp;
