import React, { useState } from 'react';
import type { Skill, CreateSkillInput } from '../../types/skill.types';
import Input from '../common/Input';
import Button from '../common/Button';
import { validateRequired } from '../../utils/validation';
import { SKILL_TYPES } from '../../utils/constants';

interface SkillFormProps {
  skill?: Skill | null;
  onSubmit: (data: CreateSkillInput) => Promise<boolean>;
  onCancel: () => void;
}

const SkillForm: React.FC<SkillFormProps> = ({ skill, onSubmit, onCancel }) => {
  const getInitialFormData = (): CreateSkillInput => {
    if (skill) {
      return {
        skill_name: skill.skill_name,
        skill_type: skill.skill_type || '',
      };
    }
    return {
      skill_name: '',
      skill_type: '',
    };
  };

  const [formData, setFormData] =
    useState<CreateSkillInput>(getInitialFormData());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateRequired(formData.skill_name)) {
      newErrors.skill_name = 'Skill name is required';
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
        label="Skill Name"
        value={formData.skill_name}
        onChange={(value) => setFormData({ ...formData, skill_name: value })}
        required
        error={errors.skill_name}
        placeholder="e.g., React, Python, Project Management"
      />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Skill Type
        </label>
        <select
          value={formData.skill_type || ''}
          onChange={(e) =>
            setFormData({ ...formData, skill_type: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Select a type...</option>
          {SKILL_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="flex space-x-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? 'Saving...' : skill ? 'Update Skill' : 'Add Skill'}
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

export default SkillForm;
