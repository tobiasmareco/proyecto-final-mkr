import { createProjectsRepository, deleteProjectRepository, getProjectIdRepository, getProjectsRepository, updateProjectRepository } from './index.js'

export const createProjectService = async (project) => {
    const response = await createProjectsRepository({ ...project })
    if (response.response === 'error') {
      return { error: response }
    }
    return { result: response.result }
}

export const getProjectsService = async (project) => {
  const response = await getProjectsRepository({ ...project })
  if (response.response === 'error') {
    return { error: response }
  }
  return { result: response.result }

}


export const getProjectIdService = async (project) => {

  const response = await getProjectIdRepository({ ...project, projectId: project })
  if (response.response === 'error') {
    return { error: response }
  }
  return { result: response.result }
}


export const updateProjectService = async (project) => {

  const response = await updateProjectRepository({ ...project, projectId: project.params.id, projectBody: project.body })
  if (response.response === 'error') {
    return { error: response }
  }
  return { result: response.result }

}
export const deleteProjectService = async (project) => {

  const response = await deleteProjectRepository({ ...project, projectId: project })
  if (response.response === 'error') {
    return { error: response }
  }
  return { result: response.result }

}