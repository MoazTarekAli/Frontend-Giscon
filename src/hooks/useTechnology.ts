import { useState, useCallback } from 'react';
import { technologyService } from '../services/technology.service';
import type {
  Technology,
  CreateTechnologyInput,
  UpdateTechnologyInput,
} from '../types/technology.types';

export const useTechnology = () => {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const fetchTechnologies = useCallback(
    async (page: number = 1) => {
      setLoading(true);
      setError(null);
      try {
        const response = await technologyService.getAllTechnologies(
          page,
          pagination.limit
        );
        setTechnologies(response.data);
        setPagination(response.pagination);
      } catch (err) {
        setError('Failed to fetch technologies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit]
  );

  const createTechnology = useCallback(
    async (data: CreateTechnologyInput) => {
      setLoading(true);
      setError(null);
      try {
        await technologyService.createTechnology(data);
        await fetchTechnologies(pagination.page);
        return true;
      } catch (err) {
        setError('Failed to create technology');
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [fetchTechnologies, pagination.page]
  );

  const updateTechnology = useCallback(
    async (id: number, data: UpdateTechnologyInput) => {
      setLoading(true);
      setError(null);
      try {
        await technologyService.updateTechnology(id, data);
        await fetchTechnologies(pagination.page);
        return true;
      } catch (err) {
        setError('Failed to update technology');
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [fetchTechnologies, pagination.page]
  );

  const deleteTechnology = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        await technologyService.deleteTechnology(id);
        await fetchTechnologies(pagination.page);
        return true;
      } catch (err) {
        setError('Failed to delete technology');
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [fetchTechnologies, pagination.page]
  );

  return {
    technologies,
    loading,
    error,
    pagination,
    fetchTechnologies,
    createTechnology,
    updateTechnology,
    deleteTechnology,
  };
};

export const useProjectTechnologies = (projectId?: number) => {
  const [projectTechnologies, setProjectTechnologies] = useState<Technology[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjectTechnologies = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      const response =
        await technologyService.getProjectTechnologies(projectId);
      setProjectTechnologies(response.data);
    } catch (err) {
      setError('Failed to fetch project technologies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const addProjectTechnology = useCallback(
    async (technologyId: number) => {
      if (!projectId) return false;
      setLoading(true);
      setError(null);
      try {
        await technologyService.addProjectTechnology({
          project_id: projectId,
          technology_id: technologyId,
        });
        await fetchProjectTechnologies();
        return true;
      } catch (err) {
        setError('Failed to add technology to project');
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [projectId, fetchProjectTechnologies]
  );

  const removeProjectTechnology = useCallback(
    async (technologyId: number) => {
      if (!projectId) return false;
      setLoading(true);
      setError(null);
      try {
        await technologyService.deleteProjectTechnology(
          projectId,
          technologyId
        );
        await fetchProjectTechnologies();
        return true;
      } catch (err) {
        setError('Failed to remove technology from project');
        console.error(err);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [projectId, fetchProjectTechnologies]
  );

  return {
    projectTechnologies,
    loading,
    error,
    fetchProjectTechnologies,
    addProjectTechnology,
    removeProjectTechnology,
  };
};
