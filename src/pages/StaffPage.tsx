import React, { useState } from 'react';
import { useStaff } from '../hooks/useStaff';
import Layout from '../components/layout/Layout';
import StaffList from '../components/staff/StaffList';
import StaffForm from '../components/staff/StaffForm';
import StaffDetail from '../components/staff/StaffDetails';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Pagination from '../components/common/Pagination';
import type {
  Staff,
  CreateStaffInput,
  UpdateStaffInput,
} from '../types/staff.types';

const StaffPage: React.FC = () => {
  const {
    staff,
    loading,
    error,
    pagination,
    fetchStaff,
    createStaff,
    updateStaff,
    deleteStaff,
  } = useStaff();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [detailStaff, setDetailStaff] = useState<Staff | null>(null);

  const handleCreate = () => {
    setSelectedStaff(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: CreateStaffInput | UpdateStaffInput) => {
    if (isEditMode && selectedStaff) {
      await updateStaff(selectedStaff.staff_id, data as UpdateStaffInput);
    } else {
      await createStaff(data as CreateStaffInput);
    }
    setIsModalOpen(false);
    setSelectedStaff(null);
  };

  const handleDelete = async (id: number) => {
    await deleteStaff(id);
  };

  const handleViewDetails = (staff: Staff) => {
    setDetailStaff(staff);
  };

  if (loading && staff.length === 0) {
    return (
      <Layout>
        <LoadingSpinner size="lg" className="mt-20" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">Staff Management</h2>
          <Button onClick={handleCreate}>Add New Staff</Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <StaffList
          staff={staff}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetails={handleViewDetails}
        />

        <Pagination
          currentPage={pagination.page}
          totalPages={Math.ceil(pagination.total / pagination.limit)}
          onPageChange={fetchStaff}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedStaff(null);
          }}
          title={isEditMode ? 'Edit Staff Member' : 'Add New Staff Member'}
          size="lg"
        >
          <StaffForm
            staff={selectedStaff}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsModalOpen(false);
              setSelectedStaff(null);
            }}
          />
        </Modal>

        {detailStaff && (
          <StaffDetail
            staff={detailStaff}
            onClose={() => setDetailStaff(null)}
          />
        )}
      </div>
    </Layout>
  );
};

export default StaffPage;
