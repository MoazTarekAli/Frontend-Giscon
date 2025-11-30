import React from 'react';
import type { Staff } from '../../types/staff.types';
import Button from '../common/Button';
import Card from '../common/Card';

interface StaffListProps {
  staff: Staff[];
  onEdit: (staff: Staff) => void;
  onDelete: (id: number) => void;
  onViewDetails: (staff: Staff) => void;
}

const StaffList: React.FC<StaffListProps> = ({ staff, onEdit, onDelete, onViewDetails }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {staff.map((member) => (
        <Card key={member.staff_id}>
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{member.staff_name}</h3>
              {member.title && <p className="text-sm text-gray-600">{member.title}</p>}
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
              <p className="text-sm text-gray-600 line-clamp-3">{member.summary}</p>
            )}
            <div className="flex space-x-2 pt-2">
              <Button
                variant="primary"
                onClick={() => onViewDetails(member)}
                className="flex-1 text-sm py-1.5"
              >
                View Details
              </Button>
              <Button
                variant="secondary"
                onClick={() => onEdit(member)}
                className="text-sm py-1.5"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this staff member?')) {
                    onDelete(member.staff_id);
                  }
                }}
                className="text-sm py-1.5"
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StaffList;