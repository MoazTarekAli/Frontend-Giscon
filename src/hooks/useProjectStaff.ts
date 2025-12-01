import { useState, useCallback } from 'react';
import type {
  ProjectStaff,
  CreateProjectStaffInput,
  UpdateProjectStaffInput,
} from '../types/projectstaff.types';
import { projectStaffService } from '../services/projectstaff.service';

export const useProjectStaff = (staffId: number) => {
  const [projectStaff, setProjectStaff] = useState<ProjectStaff[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjectStaff = useCallback(async () => {
    if (!staffId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await projectStaffService.getAllProjectStaff(staffId);
      setProjectStaff(response.data || []);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [staffId]);

  const createProjectStaff = useCallback(
    async (data: CreateProjectStaffInput) => {
      setLoading(true);
      setError(null);
      try {
        await projectStaffService.createProjectStaff(data);
        await fetchProjectStaff();
        return true;
      } catch (err) {
        setError('Failed to create role in project');
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [fetchProjectStaff]
  );

  const updateProjectStaff = useCallback(
    async (roleId: number, data: UpdateProjectStaffInput) => {
      setLoading(true);
      setError(null);
      try {
        await projectStaffService.updateProjectStaff(roleId, data);
        await fetchProjectStaff();
        return true;
      } catch (err) {
        setError('Failed to update role in project');
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [fetchProjectStaff]
  );

  const deleteProjectStaff = useCallback(
    async (roleId: number) => {
      setLoading(true);
      setError(null);
      try {
        await projectStaffService.deleteProjectStaff(roleId);
        await fetchProjectStaff();
      } catch (err) {
        setError('Failed to delete role in project');
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [fetchProjectStaff]
  );

  return {
    projectStaff,
    loading,
    error,
    fetchProjectStaff,
    createProjectStaff,
    updateProjectStaff,
    deleteProjectStaff,
  };
};
