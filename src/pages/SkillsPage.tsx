import React, { useState, useEffect } from 'react';
import { useSkills } from '../hooks/useSkills';
import Layout from '../components/layout/Layout';
import SkillList from '../components/skills/SkillList';
import SkillForm from '../components/skills/SkillForm';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Pagination from '../components/common/Pagination';
import type {
  Skill,
  UpdateSkillInput,
  CreateSkillInput,
} from '../types/skill.types';

const SkillsPage: React.FC = () => {
  const {
    skills,
    loading,
    error,
    pagination,
    fetchSkills,
    createSkill,
    updateSkill,
    deleteSkill,
  } = useSkills();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  useEffect(() => {
    fetchSkills(1);
  }, [fetchSkills]);

  const handleSubmit = async (data: UpdateSkillInput | CreateSkillInput) => {
    if (selectedSkill) {
      return await updateSkill(
        selectedSkill.skill_id,
        data as UpdateSkillInput
      );
    } else {
      return await createSkill(data as CreateSkillInput);
    }
  };

  const handleEdit = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedSkill(null);
    setIsModalOpen(true);
  };

  if (loading && skills.length === 0) {
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
            Skills Management
          </h2>
          <Button onClick={handleCreate}>Add New Skill</Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <SkillList skills={skills} onEdit={handleEdit} onDelete={deleteSkill} />

        <Pagination
          currentPage={pagination.page}
          totalPages={Math.ceil(pagination.total / pagination.limit)}
          onPageChange={fetchSkills}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedSkill(null);
          }}
          title={selectedSkill ? 'Edit Skill' : 'Add New Skill'}
        >
          <SkillForm
            skill={selectedSkill}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsModalOpen(false);
              setSelectedSkill(null);
            }}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default SkillsPage;
