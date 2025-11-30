import api from './api';
import type {
  WorkExperience,
  CreateWorkInput,
  UpdateWorkInput,
  PaginatedWorkResponse,
} from '../types/work.types';

export const workService = {
  getWorkById: async (work_id: number): Promise<WorkExperience> => {
    const response = await api.get(`/work/workid/${work_id}`);
    return response.data;
  },

  createWork: async (data: CreateWorkInput): Promise<WorkExperience> => {
    const response = await api.post('/work', data);
    return response.data;
  },

  updateWork: async (
    work_id: number,
    data: UpdateWorkInput
  ): Promise<WorkExperience> => {
    const response = await api.put(`/work/workid/${work_id}`, data);
    return response.data;
  },

  deleteWork: async (work_id: number): Promise<void> => {
    await api.delete(`/work/${work_id}`);
  },

  getAllWorksForStaff: async (
    staff_id: number
  ): Promise<PaginatedWorkResponse> => {
    const response = await api.get(`/work/staffid/${staff_id}`);
    return response.data;
  },

  deleteAllWorksForStaff: async (staff_id: number): Promise<void> => {
    await api.delete(`/work/staffid/${staff_id}`);
  },
};
