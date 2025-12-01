import React from 'react';
import type { ProjectStaff } from '../../types/projectstaff.types';
import Button from '../common/Button';

interface ProjectStaffListProps {
  projectsStaff: ProjectStaff[];
  onEdit: (project: ProjectStaff) => void;
  onDelete: (id: number) => void;
}

const ProjectStaffList: React.FC<ProjectStaffListProps> = ({ projectsStaff, onEdit, onDelete }) => {
  if (projectsStaff.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No projects found. Add one to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projectsStaff.map((project) => (
        <div
          key={project.role_id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{project.project_name}</h3>
              <p className="text-gray-600">{project.project_description}</p>
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700">Role:</p>
                <p className="text-sm text-gray-600 mt-1">{project.staff_role}</p>
              </div>
            </div>
            <div className="flex space-x-2 ml-4">
              <Button
                variant="secondary"
                onClick={() => onEdit(project)}
                className="text-sm py-1.5 px-3"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this role?')) {
                    onDelete(project.role_id);
                  }
                }}
                className="text-sm py-1.5 px-3"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectStaffList;