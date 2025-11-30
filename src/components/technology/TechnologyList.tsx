import React from 'react';
import type { Technology } from '../../types/technology.types';
import Button from '../common/Button';
import Card from '../common/Card';

interface TechnologyListProps {
  technologies: Technology[];
  onEdit: (technology: Technology) => void;
  onDelete: (id: number) => void;
}

const TechnologyList: React.FC<TechnologyListProps> = ({ technologies, onEdit, onDelete }) => {
  if (technologies.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No technologies found. Add one to get started.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {technologies.map((technology) => (
        <Card key={technology.technology_id}>
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">{technology.technology_name}</h3>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                onClick={() => onEdit(technology)}
                className="flex-1 text-sm py-1.5"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this technology?')) {
                    onDelete(technology.technology_id);
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

export default TechnologyList;