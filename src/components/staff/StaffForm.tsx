import React, { useState, useEffect } from 'react';
import type {
  Staff,
  CreateStaffInput,
  UpdateStaffInput,
} from '../../types/staff.types';
import Input from '../common/Input';
import Button from '../common/Button';
import {
  validateRequired,
  validateEmail,
  validatePhone,
} from '../../utils/validation';

interface StaffFormProps {
  staff?: Staff | null;
  onSubmit: (data: CreateStaffInput | UpdateStaffInput) => Promise<void>;
  onCancel: () => void;
}

const StaffForm: React.FC<StaffFormProps> = ({ staff, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<CreateStaffInput>({
    staff_name: '',
    title: '',
    email: '',
    phone: '',
    summary: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (staff) {
      setFormData({
        staff_name: staff.staff_name,
        title: staff.title || '',
        email: staff.email,
        phone: staff.phone,
        summary: staff.summary || '',
      });
    }
  }, [staff]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateRequired(formData.staff_name)) {
      newErrors.staff_name = 'Name is required';
    }

    if (!validateRequired(formData.email)) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!validateRequired(formData.phone)) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
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
        <Input
          label="Full Name"
          value={formData.staff_name}
          onChange={(value) => setFormData({ ...formData, staff_name: value })}
          required
          error={errors.staff_name}
        />

        <Input
          label="Title"
          value={formData.title || ''}
          onChange={(value) => setFormData({ ...formData, title: value })}
          placeholder="e.g., Senior Developer"
        />

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => setFormData({ ...formData, email: value })}
          required
          error={errors.email}
        />

        <Input
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={(value) => setFormData({ ...formData, phone: value })}
          required
          error={errors.phone}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Summary
          </label>
          <textarea
            value={formData.summary || ''}
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            placeholder="Brief professional summary..."
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4 mt-4 border-t border-gray-200 sticky bottom-0 bg-white">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? 'Saving...' : staff ? 'Update Staff' : 'Create Staff'}
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

export default StaffForm;
