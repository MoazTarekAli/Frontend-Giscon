import React, { useState } from 'react';
import type {
  Technology,
  CreateTechnologyInput,
} from '../../types/technology.types';
import Input from '../common/Input';
import Button from '../common/Button';
import { validateRequired } from '../../utils/validation';

interface TechnologyFormProps {
  technology?: Technology | null;
  onSubmit: (data: CreateTechnologyInput) => Promise<boolean>;
  onCancel: () => void;
}

const TechnologyForm: React.FC<TechnologyFormProps> = ({
  technology,
  onSubmit,
  onCancel,
}) => {
  // Initialize state based on technology prop
  const getInitialFormData = (): CreateTechnologyInput => {
    if (technology) {
      return {
        technology_name: technology.technology_name,
      };
    }
    return {
      technology_name: '',
    };
  };

  const [formData, setFormData] =
    useState<CreateTechnologyInput>(getInitialFormData());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Remove the useEffect completely

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateRequired(formData.technology_name)) {
      newErrors.technology_name = 'Technology name is required';
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
        label="Technology Name"
        value={formData.technology_name}
        onChange={(value) =>
          setFormData({ ...formData, technology_name: value })
        }
        required
        error={errors.technology_name}
        placeholder="e.g., React, Node.js, PostgreSQL"
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
            : technology
              ? 'Update Technology'
              : 'Add Technology'}
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

export default TechnologyForm;
