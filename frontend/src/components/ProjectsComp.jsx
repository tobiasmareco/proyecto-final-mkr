import React, { useEffect, useState } from "react";
import axiosClient from "../config/axiosClient";
import ProjectCard from "./ProjectCard";
function ProjectsComp() {
  //   const [projects, setProjects] = useState([]);
  const projects = [
    {
      id: 123,
      title: "test of 1 project",
      description: "description of fisrt project",
      status: "Pendiente",
      finishDate: Date.now(),
    },
    {
      id: 456,
      title: "test of21 project",
      description: "description of second project",
      status: "Pendiente",
      finishDate: Date.now(),
    },
  ];
  useEffect(() => {
    const getProjects = async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axiosClient.get("/api/projects", config);
        <ProjectCard />;
      } catch (error) {
        console.log(error.response);
      }
    };
    getProjects();
  }, []);
  return (
    <section>
      <h2 className="text-3xl font-bold mb-2">Proyectos</h2>
      <div className="grid lg:grid-cols-3 grid-col-1 gap-3">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </section>
  );
}

export default ProjectsComp;
