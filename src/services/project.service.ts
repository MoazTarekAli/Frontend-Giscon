import api from './api';
import type {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
  PaginatedProjectResponse,
} from '../types/project.types';

export const projectService = {
  getAllProjects: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedProjectResponse> => {
    const response = await api.get(`/project?page=${page}&limit=${limit}`);
    return response.data;
  },

  getProjectById: async (project_id: number): Promise<Project> => {
    const response = await api.get(`/project?${project_id}`);
    return response.data;
  },

  createProject: async (data: CreateProjectInput): Promise<Project> => {
    const response = await api.post('/project', data);
    return response.data;
  },

  updateProject: async (
    project_id: number,
    data: UpdateProjectInput
  ): Promise<Project> => {
    const response = await api.put(`/project/${project_id}`, data);
    return response.data;
  },

  deleteProject: async (project_id: number): Promise<void> => {
    await api.delete(`/project/${project_id}`);
  },
};
