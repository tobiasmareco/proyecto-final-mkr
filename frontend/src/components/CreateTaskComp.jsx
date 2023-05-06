import React, { useState } from "react";
import axiosClient from "../config/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

const token = localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};
function CreateTaskComp() {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axiosClient.post('/api/tasks', { title, description, projectId: id }, config)
      console.log(data)
      navigate(`/projects/${id}`)
    } catch (error) {
      console.log(error.response)
    }
  }
  return (
    <form
      className="bg-white py-10 px-5 md:w-9/12 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <div className="mb-5">
        <label
          className='text-gray-700 uppercase font-bold text-sm  after:content-["*"] after:text-gray-400 after:ml-1'
          htmlFor="nombre"
        >
          Tarea
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
          onChange={(e) => { setDescription(e.target.value) }}
        />
      </div>

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
          <option value="pendiente">finalizado</option>
        </select>
      </div>
      <input
        type="submit"
        value={'Crear Tarea'}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  )
}

export default CreateTaskComp;
