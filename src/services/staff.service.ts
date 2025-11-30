import api from './api';
import type {
  Staff,
  CreateStaffInput,
  UpdateStaffInput,
  PaginatedStaffResponse,
} from '../types/staff.types';

export const staffService = {
  getAllStaff: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedStaffResponse> => {
    const response = await api.get(`/staff?page=${page}&limit=${limit}`);
    return response.data;
  },

  getStaffById: async (staff_id: number): Promise<Staff> => {
    const response = await api.get(`/staff/${staff_id}`);
    return response.data;
  },

  createStaff: async (data: CreateStaffInput): Promise<Staff> => {
    const response = await api.post('/staff', data);
    return response.data;
  },

  updateStaff: async (
    staff_id: number,
    data: UpdateStaffInput
  ): Promise<Staff> => {
    const response = await api.put(`/staff/${staff_id}`, data);
    return response.data;
  },

  deleteStaff: async (staff_id: number): Promise<void> => {
    await api.delete(`/staff/${staff_id}`);
  },
};
