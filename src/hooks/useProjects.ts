import { useState, useCallback } from 'react';
import { projectService } from '../services/project.service';
import type { Project, CreateProjectInput, UpdateProjectInput } from '../types/project.types';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });

  const fetchProjects = useCallback(async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await projectService.getAllProjects(page, pagination.limit);
      setProjects(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError('Failed to fetch projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]);

  const createProject = useCallback(async (data: CreateProjectInput) => {
    setLoading(true);
    setError(null);
    try {
      await projectService.createProject(data);
      await fetchProjects(pagination.page);
      return true;
    } catch (err) {
      setError('Failed to create project');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchProjects, pagination.page]);

  const updateProject = useCallback(async (id: number, data: UpdateProjectInput) => {
    setLoading(true);
    setError(null);
    try {
      await projectService.updateProject(id, data);
      await fetchProjects(pagination.page);
      return true;
    } catch (err) {
      setError('Failed to update project');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchProjects, pagination.page]);

  const deleteProject = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await projectService.deleteProject(id);
      await fetchProjects(pagination.page);
      return true;
    } catch (err) {
      setError('Failed to delete project');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchProjects, pagination.page]);

  return {
    projects,
    loading,
    error,
    pagination,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
};