import { useState, useCallback } from 'react';
import { skillService } from '../services/skill.service';
import type { Skill, CreateSkillInput, UpdateSkillInput, StaffSkill } from '../types/skill.types';

export const useSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

  const fetchSkills = useCallback(async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await skillService.getAllSkills(page, pagination.limit);
      setSkills(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError('Failed to fetch skills');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]);

  const createSkill = useCallback(async (data: CreateSkillInput) => {
    setLoading(true);
    setError(null);
    try {
      await skillService.createSkill(data);
      await fetchSkills(pagination.page);
      return true;
    } catch (err) {
      setError('Failed to create skill');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchSkills, pagination.page]);

  const updateSkill = useCallback(async (id: number, data: UpdateSkillInput) => {
    setLoading(true);
    setError(null);
    try {
      await skillService.updateSkill(id, data);
      await fetchSkills(pagination.page);
      return true;
    } catch (err) {
      setError('Failed to update skill');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchSkills, pagination.page]);

  const deleteSkill = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await skillService.deleteSkill(id);
      await fetchSkills(pagination.page);
      return true;
    } catch (err) {
      setError('Failed to delete skill');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchSkills, pagination.page]);

  return {
    skills,
    loading,
    error,
    pagination,
    fetchSkills,
    createSkill,
    updateSkill,
    deleteSkill,
  };
};

export const useStaffSkills = (staffId?: number) => {
  const [staffSkills, setStaffSkills] = useState<StaffSkill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStaffSkills = useCallback(async () => {
    if (!staffId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await skillService.getStaffSkills(staffId);
      setStaffSkills(response.data);
    } catch (err) {
      setError('Failed to fetch staff skills');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [staffId]);

  const addStaffSkill = useCallback(async (skillId: number) => {
    if (!staffId) return false;
    setLoading(true);
    setError(null);
    try {
      await skillService.addStaffSkill({ staff_id: staffId, skill_id: skillId });
      await fetchStaffSkills();
      return true;
    } catch (err) {
      setError('Failed to add skill to staff');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [staffId, fetchStaffSkills]);

  const removeStaffSkill = useCallback(async (skillId: number) => {
    if (!staffId) return false;
    setLoading(true);
    setError(null);
    try {
      await skillService.deleteStaffSkill(staffId, skillId);
      await fetchStaffSkills();
      return true;
    } catch (err) {
      setError('Failed to remove skill from staff');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [staffId, fetchStaffSkills]);

  return {
    staffSkills,
    loading,
    error,
    fetchStaffSkills,
    addStaffSkill,
    removeStaffSkill,
  };
};