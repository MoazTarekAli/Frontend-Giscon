import React, { useState, useEffect } from 'react';
import type {
  ProjectStaff,
  CreateProjectStaffInput,
  UpdateProjectStaffInput,
} from '../../types/projectstaff.types';
import Input from '../common/Input';
import Button from '../common/Button';
import { validateRequired } from '../../utils/validation';

interface ProjectStaffFormProps {
  projectStaff?: ProjectStaff | null;
  onSubmit: (
    data: CreateProjectStaffInput | UpdateProjectStaffInput
  ) => Promise<void>;
  onCancel: () => void;
  projects: Array<{ project_id: number; project_name: string }>;
  staffId: number;
  staffName: string;
}

const ProjectStaffForm: React.FC<ProjectStaffFormProps> = ({
  projectStaff,
  onSubmit,
  onCancel,
  projects,
  staffId,
  staffName,
}) => {
  const [formData, setFormData] = useState<CreateProjectStaffInput>({
    project_id: 0,
    staff_id: staffId,
    staff_role: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (projectStaff) {
      setFormData({
        project_id: projectStaff.project_id,
        staff_id: projectStaff.staff_id,
        staff_role: projectStaff.staff_role,
      });
    } else {
      setFormData({
        project_id: 0,
        staff_id: staffId,
        staff_role: '',
      });
    }
  }, [projectStaff, staffId]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.project_id || formData.project_id === 0) {
      newErrors.project_id = 'Project is required';
    }

    if (!validateRequired(formData.staff_role)) {
      newErrors.staff_role = 'Role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="space-y-4">
        {/* Staff Member - Display Only */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Staff Member
          </label>
          <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
            {staffName}
          </div>
        </div>

        {/* Project - Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.project_id}
            onChange={(e) =>
              setFormData({ ...formData, project_id: parseInt(e.target.value) })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={!!projectStaff} // Disable when editing
          >
            <option value={0}>Select a project...</option>
            {projects.map((project) => (
              <option key={project.project_id} value={project.project_id}>
                {project.project_name}
              </option>
            ))}
          </select>
          {errors.project_id && (
            <p className="mt-1 text-sm text-red-600">{errors.project_id}</p>
          )}
        </div>

        {/* Role - Input */}
        <Input
          label="Role"
          value={formData.staff_role}
          onChange={(value) => setFormData({ ...formData, staff_role: value })}
          required
          error={errors.staff_role}
          placeholder="e.g., Lead Developer, Project Manager"
        />
      </div>

      <div className="flex gap-3 pt-4 mt-4 border-t border-gray-200 sticky bottom-0 bg-white ">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting
            ? 'Saving...'
            : projectStaff
              ? 'Update Role'
              : 'Add to Project'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProjectStaffForm;
