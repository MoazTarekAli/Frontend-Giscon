import React, { useState, useEffect } from 'react';
import type { Staff } from '../../types/staff.types';
import type { Education, CreateEducationInput } from '../../types/education.types';
import type { WorkExperience, CreateWorkInput } from '../../types/work.types';
import { useEducation } from '../../hooks/useEducation';
import { useWork } from '../../hooks/useWork';
// Remove this unused import:
// import { useStaffSkills } from '../../hooks/useSkills';
import EducationList from '../education/EducationList';
import EducationForm from '../education/EducationForm';
import WorkList from '../work/WorkList';
import WorkForm from '../work/WorkForm';
import StaffSkillManager from '../skills/StaffSkillManager';
import Modal from '../common/Modal';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import Card from '../common/Card';

interface StaffDetailProps {
  staff: Staff;
  onClose: () => void;
}

type TabType = 'overview' | 'education' | 'work' | 'skills';

const StaffDetail: React.FC<StaffDetailProps> = ({ staff, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(null);
  const [selectedWork, setSelectedWork] = useState<WorkExperience | null>(null);

  const {
    education,
    loading: educationLoading,
    fetchEducation,
    createEducation,
    updateEducation,
    deleteEducation,
  } = useEducation(staff.staff_id);

  const {
    workExperiences,
    loading: workLoading,
    fetchWorkExperiences,
    createWorkExperience,
    updateWorkExperience,
    deleteWorkExperience,
  } = useWork(staff.staff_id);

  useEffect(() => {
    fetchEducation();
    fetchWorkExperiences();
  }, [fetchEducation, fetchWorkExperiences]);

  const handleEducationSubmit = async (data: CreateEducationInput) => {
    if (selectedEducation) {
      return await updateEducation(selectedEducation.education_id, data);
    } else {
      return await createEducation(data);
    }
  };

  const handleWorkSubmit = async (data: CreateWorkInput) => {
    if (selectedWork) {
      return await updateWorkExperience(selectedWork.work_id, data);
    } else {
      return await createWorkExperience(data);
    }
  };

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview' },
    { id: 'education' as TabType, label: 'Education' },
    { id: 'work' as TabType, label: 'Work Experience' },
    { id: 'skills' as TabType, label: 'Skills' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50">
      <div className="min-h-screen px-4 text-center">
        <div className="inline-block w-full max-w-6xl my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">{staff.staff_name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <Card>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Title</p>
                      <p className="mt-1 text-gray-900">{staff.title || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="mt-1 text-gray-900">{staff.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="mt-1 text-gray-900">{staff.phone}</p>
                    </div>
                  </div>
                  {staff.summary && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-500">Summary</p>
                      <p className="mt-1 text-gray-900">{staff.summary}</p>
                    </div>
                  )}
                </Card>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Education Records</h3>
                  <Button onClick={() => { setSelectedEducation(null); setIsEducationModalOpen(true); }}>
                    Add Education
                  </Button>
                </div>
                {educationLoading ? (
                  <LoadingSpinner />
                ) : (
                  <EducationList
                    education={education}
                    onEdit={(edu) => { setSelectedEducation(edu); setIsEducationModalOpen(true); }}
                    onDelete={deleteEducation}
                  />
                )}
              </div>
            )}

            {activeTab === 'work' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Work Experience</h3>
                  <Button onClick={() => { setSelectedWork(null); setIsWorkModalOpen(true); }}>
                    Add Work Experience
                  </Button>
                </div>
                {workLoading ? (
                  <LoadingSpinner />
                ) : (
                  <WorkList
                    workExperiences={workExperiences}
                    onEdit={(work) => { setSelectedWork(work); setIsWorkModalOpen(true); }}
                    onDelete={deleteWorkExperience}
                  />
                )}
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Skills Management</h3>
                <StaffSkillManager staffId={staff.staff_id} />
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isEducationModalOpen}
        onClose={() => { setIsEducationModalOpen(false); setSelectedEducation(null); }}
        title={selectedEducation ? 'Edit Education' : 'Add Education'}
        size="lg"
      >
        <EducationForm
          staffId={staff.staff_id}
          education={selectedEducation}
          onSubmit={handleEducationSubmit}
          onCancel={() => { setIsEducationModalOpen(false); setSelectedEducation(null); }}
        />
      </Modal>

      <Modal
        isOpen={isWorkModalOpen}
        onClose={() => { setIsWorkModalOpen(false); setSelectedWork(null); }}
        title={selectedWork ? 'Edit Work Experience' : 'Add Work Experience'}
        size="lg"
      >
        <WorkForm
          staffId={staff.staff_id}
          work={selectedWork}
          onSubmit={handleWorkSubmit}
          onCancel={() => { setIsWorkModalOpen(false); setSelectedWork(null); }}
        />
      </Modal>
    </div>
  );
};

export default StaffDetail;