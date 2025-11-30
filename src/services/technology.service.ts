import api from './api';
import type {
  Technology,
  CreateTechnologyInput,
  UpdateTechnologyInput,
  PaginatedTechnologyResponse,
  CreateProjectTechnologyInput,
  PaginatedProjectTechnologyResponse,
} from '../types/technology.types';

export const technologyService = {
  getAllTechnologies: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedTechnologyResponse> => {
    const response = await api.get(`/technology?page=${page}&limit=${limit}`);
    return response.data;
  },

  getTechnologyById: async (technology_id: number): Promise<Technology> => {
    const response = await api.get(`/technology/${technology_id}`);
    return response.data;
  },

  createTechnology: async (
    data: CreateTechnologyInput
  ): Promise<Technology> => {
    const response = await api.post('/technology', data);
    return response.data;
  },

  updateTechnology: async (
    technology_id: number,
    data: UpdateTechnologyInput
  ): Promise<Technology> => {
    const response = await api.put(`/technology/${technology_id}`, data);
    return response.data;
  },

  deleteTechnology: async (technology_id: number): Promise<void> => {
    await api.delete(`/technology/${technology_id}`);
  },

  // Project Technology
  getProjectTechnologies: async (
    project_id: number
  ): Promise<PaginatedProjectTechnologyResponse> => {
    const response = await api.get(`/project-technology/${project_id}`);
    return response.data;
  },

  addProjectTechnology: async (
    data: CreateProjectTechnologyInput
  ): Promise<PaginatedProjectTechnologyResponse> => {
    const response = await api.post('/project-technology', data);
    return response.data;
  },

  deleteProjectTechnology: async (
    project_id: number,
    technology_id: number
  ): Promise<void> => {
    await api.delete(
      `/project-technology?project_id=${project_id}&technology_id=${technology_id}`
    );
  },

  deleteAllProjectTechnologies: async (project_id: number): Promise<void> => {
    await api.delete(`/project-technology/${project_id}`);
  },
};
