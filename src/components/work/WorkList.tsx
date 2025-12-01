import React from 'react';
import type { WorkExperience } from '../../types/work.types';
import { formatDate } from '../../utils/formatDate';
import Button from '../common/Button';

interface WorkListProps {
  workExperiences: WorkExperience[];
  onEdit: (work: WorkExperience) => void;
  onDelete: (id: number) => void;
}

const WorkList: React.FC<WorkListProps> = ({
  workExperiences,
  onEdit,
  onDelete,
}) => {
  if (workExperiences.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No work experience found. Add one to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {workExperiences.map((work) => (
        <div
          key={work.work_id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {work.work_title}
              </h3>
              <p className="text-gray-600">{work.company}</p>
              <p className="text-sm text-gray-500 mt-1">
                {formatDate(work.start_date)} - {formatDate(work.end_date)}
              </p>
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700">
                  Responsibilities:
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {work.responsibilities}
                </p>
              </div>
            </div>
            <div className="flex space-x-2 ml-4">
              <Button
                variant="secondary"
                onClick={() => onEdit(work)}
                className="text-sm py-1.5 px-3"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to delete this work experience?'
                    )
                  ) {
                    onDelete(work.work_id);
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

export default WorkList;
