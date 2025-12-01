import React from 'react';
import type { Skill } from '../../types/skill.types';
import Button from '../common/Button';
import Card from '../common/Card';

interface SkillListProps {
  skills: Skill[];
  onEdit: (skill: Skill) => void;
  onDelete: (id: number) => void;
}

const SkillList: React.FC<SkillListProps> = ({ skills, onEdit, onDelete }) => {
  if (skills.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No skills found. Add one to get started.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {skills.map((skill) => (
        <Card key={skill.skill_id}>
          <div className="space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {skill.skill_name}
              </h3>
              {skill.skill_type && (
                <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded">
                  {skill.skill_type}
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="secondary"
                onClick={() => onEdit(skill)}
                className="flex-1 text-sm py-1.5"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to delete this skill?'
                    )
                  ) {
                    onDelete(skill.skill_id);
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

export default SkillList;
