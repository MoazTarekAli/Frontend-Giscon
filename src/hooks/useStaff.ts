import { useState, useEffect, useCallback } from 'react';
import { staffService } from '../services/staff.service';
import type { Staff, CreateStaffInput, UpdateStaffInput, PaginatedStaffResponse } from '../types/staff.types';

export const useStaff = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
  });

  const fetchStaff = useCallback(async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response: PaginatedStaffResponse = await staffService.getAllStaff(page, pagination.limit);
      setStaff(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError('Failed to fetch staff');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]);

  const fetchStaffById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await staffService.getStaffById(id);
      setSelectedStaff(data);
      return data;
    } catch (err) {
      setError('Failed to fetch staff member');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createStaff = useCallback(async (data: CreateStaffInput) => {
    setLoading(true);
    setError(null);
    try {
      const newStaff = await staffService.createStaff(data);
      await fetchStaff(pagination.page);
      return newStaff;
    } catch (err) {
      setError('Failed to create staff member');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchStaff, pagination.page]);

  const updateStaff = useCallback(async (id: number, data: UpdateStaffInput) => {
    setLoading(true);
    setError(null);
    try {
      const updatedStaff = await staffService.updateStaff(id, data);
      await fetchStaff(pagination.page);
      return updatedStaff;
    } catch (err) {
      setError('Failed to update staff member');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchStaff, pagination.page]);

  const deleteStaff = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await staffService.deleteStaff(id);
      await fetchStaff(pagination.page);
      return true;
    } catch (err) {
      setError('Failed to delete staff member');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchStaff, pagination.page]);

  useEffect(() => {
    fetchStaff(1);
  }, []);

  return {
    staff,
    selectedStaff,
    loading,
    error,
    pagination,
    fetchStaff,
    fetchStaffById,
    createStaff,
    updateStaff,
    deleteStaff,
    setSelectedStaff,
  };
};