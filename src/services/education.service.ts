import api from './api';
import type {
  Education,
  CreateEducationInput,
  UpdateEducationInput,
  PaginatedEducationResponse,
} from '../types/education.types';

export const educationService = {
  getEducation: async (education_id: number): Promise<Education> => {
    const response = await api.get(`/education/educationid/${education_id}`);
    return response.data;
  },

  createEducation: async (data: CreateEducationInput): Promise<Education> => {
    const response = await api.post('/education', data);
    return response.data;
  },

  updateEducation: async (
    education_id: number,
    data: UpdateEducationInput
  ): Promise<Education> => {
    const response = await api.put(
      `/education/educationid/${education_id}`,
      data
    );
    return response.data;
  },

  deleteEducation: async (education_id: number): Promise<void> => {
    await api.delete(`/education/educationid/${education_id}`);
  },

  getAllEducationsForStaff: async (
    staff_id: number
  ): Promise<PaginatedEducationResponse> => {
    const response = await api.get(`/education/staffid/${staff_id}`);
    return response.data;
  },

  deleteAllEducationsForStaff: async (staff_id: number): Promise<void> => {
    await api.delete(`/education/staffid/${staff_id}`);
  },
};
