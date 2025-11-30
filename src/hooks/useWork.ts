import { useState, useCallback } from 'react';
import { workService } from '../services/work.service';
import type { WorkExperience, CreateWorkInput, UpdateWorkInput } from '../types/work.types';

export const useWork = (staffId?: number) => {
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkExperiences = useCallback(async () => {
    if (!staffId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await workService.getAllWorksForStaff(staffId);
      setWorkExperiences(response.data);
    } catch (err) {
      setError('Failed to fetch work experiences');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [staffId]);

  const createWorkExperience = useCallback(async (data: CreateWorkInput) => {
    setLoading(true);
    setError(null);
    try {
      await workService.createWork(data);
      await fetchWorkExperiences();
      return true;
    } catch (err) {
      setError('Failed to create work experience');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchWorkExperiences]);

  const updateWorkExperience = useCallback(async (id: number, data: UpdateWorkInput) => {
    setLoading(true);
    setError(null);
    try {
      await workService.updateWork(id, data);
      await fetchWorkExperiences();
      return true;
    } catch (err) {
      setError('Failed to update work experience');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchWorkExperiences]);

  const deleteWorkExperience = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await workService.deleteWork(id);
      await fetchWorkExperiences();
      return true;
    } catch (err) {
      setError('Failed to delete work experience');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchWorkExperiences]);

  return {
    workExperiences,
    loading,
    error,
    fetchWorkExperiences,
    createWorkExperience,
    updateWorkExperience,
    deleteWorkExperience,
  };
};