import React from 'react';
import type { Project } from '../../types/project.types';
import Button from '../common/Button';
import Card from '../common/Card';

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
  onViewDetails?: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit, onDelete, onViewDetails }) => {
  if (projects.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No projects found. Add one to get started.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card key={project.project_id}>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">{project.project_name}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{project.project_description}</p>
            <div className="flex space-x-2 pt-2">
              {onViewDetails && (
                <Button
                  variant="primary"
                  onClick={() => onViewDetails(project)}
                  className="flex-1 text-sm py-1.5"
                >
                  View
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={() => onEdit(project)}
                className="text-sm py-1.5"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this project?')) {
                    onDelete(project.project_id);
                  }
                }}
                className="text-sm py-1.5"
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProjectList;