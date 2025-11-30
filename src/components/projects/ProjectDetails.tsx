import React, { useState } from 'react';
import type { Project } from '../../types/project.types';
import ProjectStaffManager from './ProjectStaffManager';
import ProjectTechnologyManager from '../technology/ProjectTechnologyManager';
import Card from '../common/Card';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

type TabType = 'overview' | 'team' | 'technologies';

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview' },
    { id: 'team' as TabType, label: 'Team Members' },
    { id: 'technologies' as TabType, label: 'Technologies' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50">
      <div className="min-h-screen px-4 text-center">
        <div className="inline-block w-full max-w-4xl my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">{project.project_name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
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

          {/* Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <Card>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Description</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{project.project_description}</p>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Project ID</p>
                      <p className="mt-1 text-gray-900">{project.project_id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Project Name</p>
                      <p className="mt-1 text-gray-900">{project.project_name}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'team' && (
              <div>
                <ProjectStaffManager projectId={project.project_id} />
              </div>
            )}

            {activeTab === 'technologies' && (
              <div>
                <ProjectTechnologyManager projectId={project.project_id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;