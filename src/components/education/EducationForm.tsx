import React, { useState } from 'react';
import type {
  Education,
  CreateEducationInput,
} from '../../types/education.types';
import Input from '../common/Input';
import Button from '../common/Button';
import { formatDateInput } from '../../utils/formatDate';
import { validateRequired } from '../../utils/validation';

interface EducationFormProps {
  staffId: number;
  education?: Education | null;
  onSubmit: (data: CreateEducationInput) => Promise<boolean>;
  onCancel: () => void;
}

const EducationForm: React.FC<EducationFormProps> = ({
  staffId,
  education,
  onSubmit,
  onCancel,
}) => {
  const getInitialFormData = (): CreateEducationInput => {
    if (education) {
      return {
        staff_id: education.staff_id,
        degree: education.degree,
        institution: education.institution,
        field_of_study: education.field_of_study || '',
        start_date: formatDateInput(education.start_date),
        end_date: formatDateInput(education.end_date),
      };
    }
    return {
      staff_id: staffId,
      degree: '',
      institution: '',
      field_of_study: '',
      start_date: '',
      end_date: '',
    };
  };

  const [formData, setFormData] =
    useState<CreateEducationInput>(getInitialFormData());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateRequired(formData.degree)) {
      newErrors.degree = 'Degree is required';
    }

    if (!validateRequired(formData.institution)) {
      newErrors.institution = 'Institution is required';
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
        label="Degree"
        value={formData.degree}
        onChange={(value) => setFormData({ ...formData, degree: value })}
        required
        error={errors.degree}
        placeholder="e.g., Bachelor of Science"
      />

      <Input
        label="Field of Study"
        value={formData.field_of_study || ''}
        onChange={(value) =>
          setFormData({ ...formData, field_of_study: value })
        }
        placeholder="e.g., Computer Science"
      />

      <Input
        label="Institution"
        value={formData.institution}
        onChange={(value) => setFormData({ ...formData, institution: value })}
        required
        error={errors.institution}
        placeholder="e.g., University of Cairo"
      />

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
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting
            ? 'Saving...'
            : education
              ? 'Update Education'
              : 'Add Education'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EducationForm;
