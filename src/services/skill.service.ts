import api from './api';
import type {
  Skill,
  CreateSkillInput,
  UpdateSkillInput,
  PaginatedSkillResponse,
  CreateStaffSkillInput,
  PaginatedStaffSkillResponse,
} from '../types/skill.types';

export const skillService = {
  getAllSkills: async (
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedSkillResponse> => {
    const response = await api.get(`/skill?page=${page}&limit=${limit}`);
    return response.data;
  },

  getSkillById: async (skill_id: number): Promise<Skill> => {
    const response = await api.get(`/skill/${skill_id}`);
    return response.data;
  },

  createSkill: async (data: CreateSkillInput): Promise<Skill> => {
    const response = await api.post('/skill', data);
    return response.data;
  },

  updateSkill: async (
    skill_id: number,
    data: UpdateSkillInput
  ): Promise<Skill> => {
    const response = await api.put(`/skill/${skill_id}`, data);
    return response.data;
  },

  deleteSkill: async (skill_id: number): Promise<void> => {
    await api.delete(`/skill/${skill_id}`);
  },

  // Staff Skills
  getStaffSkills: async (
    staff_id: number
  ): Promise<PaginatedStaffSkillResponse> => {
    const response = await api.get(`/staff-skill/${staff_id}`);
    return response.data;
  },

  addStaffSkill: async (
    data: CreateStaffSkillInput
  ): Promise<PaginatedStaffSkillResponse> => {
    const response = await api.post('/staff-skill', data);
    return response.data;
  },

  deleteStaffSkill: async (
    staff_id: number,
    skill_id: number
  ): Promise<void> => {
    await api.delete(`/staff-skill?staff_id=${staff_id}&skill_id=${skill_id}`);
  },

  deleteAllStaffSkill: async (staff_id: number): Promise<void> => {
    await api.delete(`/staff-skill/${staff_id}`);
  },
};
