import { useState, useCallback } from 'react';
import { educationService } from '../services/education.service';
import type { Education, CreateEducationInput, UpdateEducationInput } from '../types/education.types';

export const useEducation = (staffId?: number) => {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEducation = useCallback(async () => {
    if (!staffId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await educationService.getAllEducationsForStaff(staffId);
      setEducation(response.data);
    } catch (err) {
      setError('Failed to fetch education');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [staffId]);

  const createEducation = useCallback(async (data: CreateEducationInput) => {
    setLoading(true);
    setError(null);
    try {
      await educationService.createEducation(data);
      await fetchEducation();
      return true;
    } catch (err) {
      setError('Failed to create education');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchEducation]);

  const updateEducation = useCallback(async (id: number, data: UpdateEducationInput) => {
    setLoading(true);
    setError(null);
    try {
      await educationService.updateEducation(id, data);
      await fetchEducation();
      return true;
    } catch (err) {
      setError('Failed to update education');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchEducation]);

  const deleteEducation = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await educationService.deleteEducation(id);
      await fetchEducation();
      return true;
    } catch (err) {
      setError('Failed to delete education');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchEducation]);

  return {
    education,
    loading,
    error,
    fetchEducation,
    createEducation,
    updateEducation,
    deleteEducation,
  };
};