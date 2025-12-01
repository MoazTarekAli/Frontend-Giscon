import api from './api';
import type {
  ProjectStaff,
  CreateProjectStaffInput,
  UpdateProjectStaffInput,
  ProjectStaffResponse,
} from '../types/projectstaff.types';

export const projectStaffService = {
  getAllProjectStaff: async (
    staff_id: number
  ): Promise<ProjectStaffResponse> => {
    const response = await api.get(`/project-staff/${staff_id}`);
    return response.data;
  },

  createProjectStaff: async (
    data: CreateProjectStaffInput
  ): Promise<ProjectStaff> => {
    const response = await api.post('/project-staff/', data);
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
