import ProjectCard from "./ProjectCard";
import useProjects from "../hooks/useProjects";
function ProjectsComp() {
  //   const [projects, setProjects] = useState([]);
  const { projects, loading } = useProjects();
  return (
    <section>
      <h2 className="text-3xl font-bold mb-2">Proyectos</h2>
      {loading ? (
        "Cargando proyectos..."
      ) : (
        <div className="grid lg:grid-cols-3 grid-col-1 gap-3">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard project={project} key={project._id} />
            ))
          ) : (
            <h3 className="text-center m-auto col-span-full text-xl font-bold">
              No existen proyectos creados.
            </h3>
          )}
        </div>
      )}
    </section>
  );
}

export default ProjectsComp;
