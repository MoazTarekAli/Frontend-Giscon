import React, { useState } from 'react';
import type { WorkExperience, CreateWorkInput } from '../../types/work.types';
import Input from '../common/Input';
import Button from '../common/Button';
import { formatDateInput } from '../../utils/formatDate';
import { validateRequired } from '../../utils/validation';

interface WorkFormProps {
  staffId: number;
  work?: WorkExperience | null;
  onSubmit: (data: CreateWorkInput) => Promise<boolean>;
  onCancel: () => void;
}

const WorkForm: React.FC<WorkFormProps> = ({ staffId, work, onSubmit, onCancel }) => {
  const getInitialFormData = (): CreateWorkInput => {
    if (work) {
      return {
        staff_id: work.staff_id,
        company: work.company,
        work_title: work.work_title,
        responsibilities: work.responsibilities,
        start_date: formatDateInput(work.start_date),
        end_date: formatDateInput(work.end_date),
      };
    }
    return {
      staff_id: staffId,
      company: '',
      work_title: '',
      responsibilities: '',
      start_date: '',
      end_date: '',
    };
  };

  const [formData, setFormData] = useState<CreateWorkInput>(getInitialFormData());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateRequired(formData.company)) {
      newErrors.company = 'Company is required';
    }

    if (!validateRequired(formData.work_title)) {
      newErrors.work_title = 'Job title is required';
    }

    if (!validateRequired(formData.responsibilities)) {
      newErrors.responsibilities = 'Responsibilities are required';
    }

    if (!validateRequired(formData.start_date)) {
      newErrors.start_date = 'Start date is required';
    }

    if (formData.end_date && formData.start_date) {
      if (new Date(formData.end_date) < new Date(formData.start_date)) {
        newErrors.end_date = 'End date must be after start date';
      }
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
        label="Company"
        value={formData.company}
        onChange={(value) => setFormData({ ...formData, company: value })}
        required
        error={errors.company}
        placeholder="e.g., GISCON"
      />

      <Input
        label="Job Title"
        value={formData.work_title}
        onChange={(value) => setFormData({ ...formData, work_title: value })}
        required
        error={errors.work_title}
        placeholder="e.g., Senior Software Engineer"
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Responsibilities <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.responsibilities}
          onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
          rows={4}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            errors.responsibilities ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Describe your responsibilities and achievements..."
        />
        {errors.responsibilities && (
          <p className="mt-1 text-sm text-red-500">{errors.responsibilities}</p>
        )}
      </div>

      <Input
        label="Start Date"
        type="date"
        value={formData.start_date}
        onChange={(value) => setFormData({ ...formData, start_date: value })}
        required
        error={errors.start_date}
      />

      <Input
        label="End Date"
        type="date"
        value={formData.end_date || ''}
        onChange={(value) => setFormData({ ...formData, end_date: value })}
        error={errors.end_date}
      />

      <div className="flex space-x-3 pt-4">
        <Button type="submit" variant="primary" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? 'Saving...' : work ? 'Update Work Experience' : 'Add Work Experience'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default WorkForm;