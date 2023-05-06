import React, { useEffect } from 'react'
import useProjects from '../../hooks/useProjects'
import { useParams } from 'react-router-dom'
import CreateProject from '../../pages/Main/CreateProject'

function EditProjectsComponent() {
  const { id } = useParams()
  const { project, getProjectId } = useProjects()
  useEffect(() => {
    getProjectId(id)
  }, [])
  return (
    <div>
      <h1 className='text-3xl font-extrabold'>Editar Proyecto - <span className='font-bold text-sky-800 text-center'>{project.title} </span></h1>
      <div className='mt-3'>
        <CreateProject />
      </div>
    </div>
  )
}

export default EditProjectsComponent