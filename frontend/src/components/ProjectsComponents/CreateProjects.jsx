import React, { useEffect, useState } from 'react'
import useProjects from '../../hooks/useProjects'
import AlertMsg from '../Alert'
import { useParams } from 'react-router-dom';

const IMAGE_DEFAULT =
  "https://retaintechnologies.com/wp-content/uploads/2020/04/Project-Management-Mantenimiento-1.jpg";

function CreateProjectsComponent() {
  //form data
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [finishDate, setFinishDate] = useState('')
  //alert
  const { alert, showAlert, createProject } = useProjects()

  //Edit proyect
  const [id, setId] = useState(null)
  const params = useParams()
  const { project } = useProjects()
  useEffect(() => {
    if (params.id && project.title) {
      setId(project._id)
      setTitle(project.title)
      setDescription(project.description)
      setFinishDate(project.finishDate?.split('T')[0])
      setImage(project.image)
    }
  }, [params])

  const onSubmit = async (e) => {
    e.preventDefault()
    if ([title, description].includes('')) {
      return showAlert({
        msg: 'Complete los campos obligatorios',
        error: true
      })
    }

    await createProject({ id, title, description, image: image || IMAGE_DEFAULT, finishDate: finishDate || Date.now() })
    setId(null)
    setTitle('')
    setDescription('')
    setImage('')
    setFinishDate('')
  }

  const { msg } = alert

  return (
    <>
      {msg && (
        <AlertMsg alert={alert} />
      )}
      {!params.id && <h2 className="mb-3 text-3xl font-extrabold text-center">Crear Proyecto</h2>}
      <form onSubmit={onSubmit} className='m-auto max-w-xl'>
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

        <div className="mb-5">
          {project.image && (
            <img src={project.image} alt={project.title} />
          )}
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          />
        </div>
        <input
          type="submit"
          value={id ? "Actualizar Proyecto" : "Crear Proyecto"}
          className="bg-sky-800 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-600 transition-colors"
        />
      </form >
    </>
  )
}

export default CreateProjectsComponent