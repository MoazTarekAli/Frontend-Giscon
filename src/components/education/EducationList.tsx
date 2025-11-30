import React from 'react';
import type { Education } from '../../types/education.types';
import { formatDate } from '../../utils/formatDate';
import Button from '../common/Button';

interface EducationListProps {
  education: Education[];
  onEdit: (edu: Education) => void;
  onDelete: (id: number) => void;
}

const EducationList: React.FC<EducationListProps> = ({ education, onEdit, onDelete }) => {
  if (education.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No education records found. Add one to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {education.map((edu) => (
        <div
          key={edu.education_id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {edu.degree}
                {edu.field_of_study && ` in ${edu.field_of_study}`}
              </h3>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-sm text-gray-500 mt-1">
                {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
              </p>
            </div>
            <div className="flex space-x-2 ml-4">
              <Button
                variant="secondary"
                onClick={() => onEdit(edu)}
                className="text-sm py-1.5 px-3"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this education record?')) {
                    onDelete(edu.education_id);
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

export default EducationList;