import React, { useState, useEffect } from 'react';
import { useTechnology } from '../hooks/useTechnology';
import Layout from '../components/layout/Layout';
import TechnologyList from '../components/technology/TechnologyList';
import TechnologyForm from '../components/technology/TechnologyForm';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Pagination from '../components/common/Pagination';
import type {
  Technology,
  CreateTechnologyInput,
  UpdateTechnologyInput,
} from '../types/technology.types';

const TechnologyPage: React.FC = () => {
  const {
    technologies,
    loading,
    error,
    pagination,
    fetchTechnologies,
    createTechnology,
    updateTechnology,
    deleteTechnology,
  } = useTechnology();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTechnology, setSelectedTechnology] =
    useState<Technology | null>(null);

  useEffect(() => {
    fetchTechnologies(1);
  }, [fetchTechnologies]);

  const handleSubmit = async (
    data: CreateTechnologyInput | UpdateTechnologyInput
  ) => {
    if (selectedTechnology) {
      return await updateTechnology(
        selectedTechnology.technology_id,
        data as UpdateTechnologyInput
      );
    } else {
      return await createTechnology(data as CreateTechnologyInput);
    }
  };

  const handleEdit = (technology: Technology) => {
    setSelectedTechnology(technology);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedTechnology(null);
    setIsModalOpen(true);
  };

  if (loading && technologies.length === 0) {
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
          <h2 className="text-3xl font-bold text-gray-900">
            Technologies Management
          </h2>
          <Button onClick={handleCreate}>Add New Technology</Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <TechnologyList
          technologies={technologies}
          onEdit={handleEdit}
          onDelete={deleteTechnology}
        />

        <Pagination
          currentPage={pagination.page}
          totalPages={Math.ceil(pagination.total / pagination.limit)}
          onPageChange={fetchTechnologies}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTechnology(null);
          }}
          title={selectedTechnology ? 'Edit Technology' : 'Add New Technology'}
        >
          <TechnologyForm
            technology={selectedTechnology}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsModalOpen(false);
              setSelectedTechnology(null);
            }}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default TechnologyPage;
