import React, { useState, useEffect } from 'react';
import { useProjects } from '../hooks/useProjects';
import Layout from '../components/layout/Layout';
import ProjectList from '../components/projects/ProjectList';
import ProjectForm from '../components/projects/ProjectForm';
import ProjectDetail from '../components/projects/ProjectDetails';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Pagination from '../components/common/Pagination';
import type { Project, UpdateProjectInput, CreateProjectInput } from '../types/project.types';

const ProjectsPage: React.FC = () => {
  const { 
    projects, 
    loading, 
    error, 
    pagination, 
    fetchProjects, 
    createProject, 
    updateProject, 
    deleteProject 
  } = useProjects();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [detailProject, setDetailProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects(1);
  }, [fetchProjects]);

  const handleSubmit = async (data: UpdateProjectInput | CreateProjectInput) => {
    if (selectedProject) {
      return await updateProject(selectedProject.project_id, data as UpdateProjectInput);
    } else {
      return await createProject(data as CreateProjectInput);
    }
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const handleViewDetails = (project: Project) => {
    setDetailProject(project);
  };

  if (loading && projects.length === 0) {
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
          <h2 className="text-3xl font-bold text-gray-900">Projects Management</h2>
          <Button onClick={handleCreate}>Add New Project</Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <ProjectList
          projects={projects}
          onEdit={handleEdit}
          onDelete={deleteProject}
          onViewDetails={handleViewDetails}
        />

        <Pagination
          currentPage={pagination.page}
          totalPages={Math.ceil(pagination.total / pagination.limit)}
          onPageChange={fetchProjects}
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProject(null);
          }}
          title={selectedProject ? 'Edit Project' : 'Add New Project'}
          size="lg"
        >
          <ProjectForm
            project={selectedProject}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsModalOpen(false);
              setSelectedProject(null);
            }}
          />
        </Modal>

        {detailProject && (
          <ProjectDetail
            project={detailProject}
            onClose={() => setDetailProject(null)}
          />
        )}
      </div>
    </Layout>
  );
};

export default ProjectsPage;