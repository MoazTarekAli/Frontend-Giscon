import React, { useState } from 'react';
import type { Project, CreateProjectInput } from '../../types/project.types';
import Input from '../common/Input';
import Button from '../common/Button';
import { validateRequired } from '../../utils/validation';

interface ProjectFormProps {
  project?: Project | null;
  onSubmit: (data: CreateProjectInput) => Promise<boolean>;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSubmit, onCancel }) => {
  const getInitialFormData = (): CreateProjectInput => {
    if (project) {
      return {
        project_name: project.project_name,
        project_description: project.project_description,
      };
    }
    return {
      project_name: '',
      project_description: '',
    };
  };

  const [formData, setFormData] = useState<CreateProjectInput>(getInitialFormData());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateRequired(formData.project_name)) {
      newErrors.project_name = 'Project name is required';
    }

    if (!validateRequired(formData.project_description)) {
      newErrors.project_description = 'Project description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    const success = await onSubmit(formData);
    setIsSubmitting(false);
    
    if (success) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Project Name"
        value={formData.project_name}
        onChange={(value) => setFormData({ ...formData, project_name: value })}
        required
        error={errors.project_name}
        placeholder="e.g., E-Commerce Platform"
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.project_description}
          onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
          rows={4}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            errors.project_description ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Describe the project goals, features, and outcomes..."
        />
        {errors.project_description && (
          <p className="mt-1 text-sm text-red-500">{errors.project_description}</p>
        )}
      </div>

      <div className="flex space-x-3 pt-4">
        <Button type="submit" variant="primary" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;