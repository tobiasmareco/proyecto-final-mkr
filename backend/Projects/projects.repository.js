import Project from './projects.model.js'

export const createProjectsRepository = async ({ title, description }) => {
  try {
    //Reemplazar por user loggeado
    let userId = '644143d9c046653008730ab9'
    //Consulta si existe titulo de proyecto creado por el usuario
    const project = await Project.findOne({ title, userId: userId })    
    //Si ya se encuentra proyecto creado por el usuario
    if (project) {
      return { response: 'error', statusCode: 404, msg: new Error('El proyecto ya se encuentra creado.').message }
    }
    const newProject = {
      title,
      description,
      userId: userId
    }
    //Crea nuevo proyecto
    const createProject = await Project.create(newProject)
    return { response: 'success', result: createProject }
  } catch (error) {
    return { response: 'error', error, statusCode: 500 }
  }
}
export const getProjectsRepository = async () => {
  try {
    //Obtener todos los proyectos del usuario loggeado (reeplazar del en duro)
    const project = await Project.find({userId: '644143d9c046653008730ab9'}).sort({updatedAt: -1})
    //Si obtuvo resultados en el array
    if (project.length > 0)  {
      return { response: 'success', result: project }
    }
    //No obtuvo resultados
    return { response: 'error', statusCode: 404, msg: new Error('No se encontraron proyectos creados.').message }
  } catch (error) {

    return { response: 'error', error, statusCode: 500 }
  }
}

export const getProjectIdRepository = async ({projectId}) => {
  try {
    //Obtener proyecto del usuario loggeado (reeplazar del en duro)
    const project = await Project.find({_id: projectId, userId: '644143d9c046653008730ab9'})
    //Si obtuvo resultados en el array
    if (project.length > 0)  {
      return { response: 'success', result: project }
    }
    //No obtuvo resultados
    return { response: 'error', statusCode: 404, msg: new Error('No se encontro proyecto.').message }
  } catch (error) {
    return { 
      response: 'error', error, statusCode: 500 
    }

  }

}
export const updateProjectRepository = async ({projectId, projectBody}) => {

  try {
    //Obtener proyecto del usuario loggeado (reeplazar del en duro)
    let project = await Project.find({_id: projectId , userId: '644143d9c046653008730ab9'})
    //Si obtuvo resultados en el array
    if (project.length > 0)  {
      
      const {title, description} = {...projectBody}

      project = await Project.findByIdAndUpdate({_id: projectId}, { title: title, description:description }, {new: true})

      return { response: 'success', result: project }
    }
    return { response: 'error', statusCode: 404, msg: new Error('No se encontro proyecto.').message }

  } catch (error) {
    
    return { 
      response: 'error', error, statusCode: 500 
    }

  }
}

export const deleteProjectRepository = async ({projectId}) => {

  try {
        //Obtener proyecto del usuario loggeado (reeplazar del en duro)
        let project = await Project.find({_id: projectId , userId: '644143d9c046653008730ab9'})
         //Si obtuvo resultados en el array
    if (project.length > 0)  {
      
      await Project.findOneAndDelete({_id: projectId})

      return { response: 'success'}
    
    }
    return { response: 'error', statusCode: 404, msg: new Error('No se encontro proyecto.').message }
  } catch (error) {
    return { 
      response: 'error', error, statusCode: 500 
    }
  }

}