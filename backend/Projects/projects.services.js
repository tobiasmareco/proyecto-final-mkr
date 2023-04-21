import {
  createProjectsRepository,
  deleteProjectRepository,
  getProjectIdRepository,
  getProjectsRepository,
  updateProjectRepository,
} from "./index.js";

export const createProjectService = async (project, userId) => {
  const response = await createProjectsRepository({ ...project }, userId);
  if (response.response === "error") {
    return { error: response };
  }
  return { result: response.result };
};

export const getProjectsService = async (project, userId) => {
  const response = await getProjectsRepository({ ...project }, userId);
  if (response.response === "error") {
    return { error: response };
  }
  return { result: response.result };
};

export const getProjectIdService = async (project, userId) => {
  const response = await getProjectIdRepository(
    { ...project, projectId: project },
    userId
  );
  if (response.response === "error") {
    return { error: response };
  }
  return { result: response.result };
};

export const updateProjectService = async (project, userId) => {
  const response = await updateProjectRepository(
    { ...project, projectId: project.params.id, projectBody: project.body },
    userId
  );
  if (response.response === "error") {
    return { error: response };
  }
  return { result: response.result };
};
export const deleteProjectService = async (project, userId) => {
  const response = await deleteProjectRepository(
    { ...project, projectId: project },
    userId
  );
  if (response.response === "error") {
    return { error: response };
  }
  return { result: response.result };
};
