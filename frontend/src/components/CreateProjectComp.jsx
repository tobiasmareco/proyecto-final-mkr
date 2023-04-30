import React, { useState } from 'react'
import AlertMsg from './Alert'
function CreateProjectComp() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [finishDate, setFinishDate] = useState('')
  const [image, setImage] = useState('')
  const [error, setError] = useState({})
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([title.trim(), description.trim()].includes('')) {
      return setError({ error: true, msg: 'Complete los campos obligatorios.' })
    }
    setError({})
  }
  return (
    <form
      className="bg-white py-10 px-5 md:w-9/12 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {error.msg && <AlertMsg alert={error} />}

      <div className='mb-5'>
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="nombre"
        >Nombre Proyecto</label>

        <input
          id="nombre"
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Nombre del Proyecto"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className='mb-5'>
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="descripcion"
        >Descripción</label>

        <textarea
          id="descripcion"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          placeholder="Descripción del Proyecto"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div className='mb-5'>
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="fecha-entrega"
        >Fecha Entrega</label>

        <input
          id="fecha-entrega"
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          value={finishDate}
          onChange={e => setFinishDate(e.target.value)}
        />
      </div>

      <div className='mb-5'>
        <input type="file" id='image' name='image' onChange={e => setImage(e.target.value)}
          className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
        />
      </div>
      <input
        type="submit"
        // value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'}
        className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors'
      />
    </form>
  )
}

export default CreateProjectComp