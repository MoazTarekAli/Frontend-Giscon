import api from './api';
import type {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
  PaginatedProjectResponse,
  CreateProjectStaffInput,
  ProjectStaff,
  UpdateProjectStaffInput,
  PaginatedProjectStaffResponse,
} from '../types/project.typs';

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
    const response = await api.put(`/project?${project_id}`, data);
    return response.data;
  },

  deleteProject: async (project_id: number): Promise<void> => {
    await api.delete(`/project?${project_id}`);
  },

  // Project Staff
  getProjectStaff: async (
    staff_id: number
  ): Promise<PaginatedProjectStaffResponse> => {
    const response = await api.get(`/project-staff/${staff_id}`);
    return response.data;
  },

  addProjectStaff: async (
    data: CreateProjectStaffInput
  ): Promise<ProjectStaff> => {
    const response = await api.post('/project-staff', data);
    return response.data;
  },

  updateProjectStaff: async (
    role_id: number,
    data: UpdateProjectStaffInput
  ): Promise<ProjectStaff> => {
    const response = await api.put(`/project-staff/${role_id}`, data);
    return response.data;
  },

  deleteProjectStaff: async (role_id: number): Promise<void> => {
    await api.delete(`/project-staff/${role_id}`);
  },
};
