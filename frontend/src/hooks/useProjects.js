import { useContext} from "react";
import { projectContext } from "../context/ProjectsProvider";
function useProjects() {
  return useContext(projectContext)
}

export default useProjects;
