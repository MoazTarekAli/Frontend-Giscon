import React from 'react';
import type { Staff } from '../../types/staff.types';
import Button from '../common/Button';

interface StaffListProps {
  staff: Staff[];
  onEdit: (staff: Staff) => void;
  onDelete: (id: number) => void;
  onViewDetails: (staff: Staff) => void;
}

const StaffList: React.FC<StaffListProps> = ({
  staff,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {staff.map((member) => (
        <div
          key={member.staff_id}
          className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
        >
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {member.staff_name}
              </h3>
              {member.title && (
                <p className="text-sm text-gray-600">{member.title}</p>
              )}
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {member.email}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Phone:</span> {member.phone}
              </p>
            </div>
            {member.summary && (
              <p className="text-sm text-gray-600 line-clamp-3">
                {member.summary}
              </p>
            )}
          </div>
          <div className="flex gap-2 pt-4 mt-4 border-t border-gray-100">
            <Button
              variant="primary"
              onClick={() => onViewDetails(member)}
              className="flex-1 text-sm py-2"
            >
              View Details
            </Button>
            <Button
              variant="secondary"
              onClick={() => onEdit(member)}
              className="flex-1 text-sm py-2"
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                if (
                  window.confirm(
                    'Are you sure you want to delete this staff member?'
                  )
                ) {
                  onDelete(member.staff_id);
                }
              }}
              className="flex-1 text-sm py-2"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaffList;
