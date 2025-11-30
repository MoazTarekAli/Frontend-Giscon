import React, { useState, useEffect } from 'react';
import { useStaffSkills, useSkills } from '../../hooks/useSkills';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

interface StaffSkillManagerProps {
  staffId: number;
}

const StaffSkillManager: React.FC<StaffSkillManagerProps> = ({ staffId }) => {
  const { staffSkills, loading: staffSkillsLoading, fetchStaffSkills, addStaffSkill, removeStaffSkill } = useStaffSkills(staffId);
  const { skills, loading: skillsLoading, fetchSkills } = useSkills();
  const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);

  useEffect(() => {
    fetchStaffSkills();
    fetchSkills(1);
  }, [fetchStaffSkills, fetchSkills]);

  const handleAddSkill = async () => {
    if (!selectedSkillId) return;
    
    const success = await addStaffSkill(selectedSkillId);
    if (success) {
      setSelectedSkillId(null);
    }
  };

  const handleRemoveSkill = async (skillId: number) => {
    if (window.confirm('Are you sure you want to remove this skill?')) {
      await removeStaffSkill(skillId);
    }
  };

  const availableSkills = skills.filter(
    (skill) => !staffSkills.some((ss) => ss.skill_id === skill.skill_id)
  );

  if (staffSkillsLoading || skillsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Skills</h3>
        {staffSkills.length === 0 ? (
          <p className="text-gray-500 text-sm">No skills added yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {staffSkills.map((skill) => (
              <div
                key={skill.skill_id}
                className="flex items-center space-x-2 bg-primary-100 text-primary-700 px-3 py-1.5 rounded-lg"
              >
                <span className="text-sm font-medium">{skill.skill_name}</span>
                {skill.skill_type && (
                  <span className="text-xs text-primary-600">({skill.skill_type})</span>
                )}
                <button
                  onClick={() => handleRemoveSkill(skill.skill_id)}
                  className="text-primary-700 hover:text-primary-900"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Skill</h3>
        <div className="flex space-x-3">
          <select
            value={selectedSkillId || ''}
            onChange={(e) => setSelectedSkillId(Number(e.target.value))}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select a skill...</option>
            {availableSkills.map((skill) => (
              <option key={skill.skill_id} value={skill.skill_id}>
                {skill.skill_name} {skill.skill_type && `(${skill.skill_type})`}
              </option>
            ))}
          </select>
          <Button onClick={handleAddSkill} disabled={!selectedSkillId}>
            Add Skill
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StaffSkillManager;