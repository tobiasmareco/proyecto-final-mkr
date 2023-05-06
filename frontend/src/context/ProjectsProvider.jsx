import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import axiosClient from '../config/axiosClient'
import { useNavigate } from 'react-router-dom'

export const projectContext = createContext()

const token = localStorage.getItem("token");
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const PROJECTS_ROUTE = '/projects'
function ProjectProvider({ children }) {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [alert, setAlert] = useState({})
  const [project, setProject] = useState({})
  const [loading, setLoading] = useState(true)

  const showAlert = alert => {
    setAlert(alert)
    setTimeout(() => {
      setAlert({})
    }, [3000])
  }

  //INTERACTION API

  const editProject = async project => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.put(`/api/projects/${project.id}`, project, config)
      setAlert({
        msg: data.msg,
        error: false
      })

      const updatedProject = projects.map(projectState => projectState._id === data.result._id ? data.result : projectState)
      setProjects(updatedProject)
      setTimeout(() => {
        setAlert({});
        navigate(PROJECTS_ROUTE);
      }, [1500])
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const createNewProject = async project => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosClient.post('/api/projects', project, config)
      setProjects([...projects, data.result])
      setAlert({
        msg: data.msg,
        error: false
      })
      setTimeout(() => {
        setAlert({});
        navigate(PROJECTS_ROUTE);
      }, [1500])
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const createProject = async (project) => {
    if (project.id) {
      editProject(project)
    } else {
      createNewProject(project)
    }
    return
  }

  //OBTENER TODOS LOS PROYECTOS
  useEffect(() => {
    const getAllProjects = async () => {
      try {
        const { data } = await axiosClient('/api/projects', config)
        setProjects(data.result)
        setLoading(false)
      } catch (error) {
        console.log(error.response)
        setLoading(false)
      }
    }
    getAllProjects()
  }, [])

  //OBTENER PROYECTO POR ID
  const getProjectId = async (id) => {
    try {
      const { data } = await axiosClient.get(`/api/projects/${id}`, config)
      setProject(data.result)
      setLoading(false)
    } catch (error) {
      console.log(error.response)
    }
  }


  return (
    <projectContext.Provider value={{
      projects,
      showAlert,
      alert,
      createProject,
      getProjectId,
      project,
      loading
    }}>
      {children}
    </projectContext.Provider>
  )

}

export default ProjectProvider