import React, { useState, useEffect } from 'react';
import { useProjectTechnologies, useTechnology } from '../../hooks/useTechnology';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

interface ProjectTechnologyManagerProps {
  projectId: number;
}

const ProjectTechnologyManager: React.FC<ProjectTechnologyManagerProps> = ({ projectId }) => {
  const { 
    projectTechnologies, 
    loading: projectTechLoading, 
    fetchProjectTechnologies, 
    addProjectTechnology, 
    removeProjectTechnology 
  } = useProjectTechnologies(projectId);
  
  const { technologies, loading: techLoading, fetchTechnologies } = useTechnology();
  const [selectedTechnologyId, setSelectedTechnologyId] = useState<number | null>(null);

  useEffect(() => {
    fetchProjectTechnologies();
    fetchTechnologies(1);
  }, [fetchProjectTechnologies, fetchTechnologies]);

  const handleAddTechnology = async () => {
    if (!selectedTechnologyId) return;
    
    const success = await addProjectTechnology(selectedTechnologyId);
    if (success) {
      setSelectedTechnologyId(null);
    }
  };

  const handleRemoveTechnology = async (technologyId: number) => {
    if (window.confirm('Are you sure you want to remove this technology from the project?')) {
      await removeProjectTechnology(technologyId);
    }
  };

  const availableTechnologies = technologies.filter(
    (tech) => !projectTechnologies.some((pt) => pt.technology_id === tech.technology_id)
  );

  if (projectTechLoading || techLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Technologies</h3>
        {projectTechnologies.length === 0 ? (
          <p className="text-gray-500 text-sm">No technologies added yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {projectTechnologies.map((tech) => (
              <div
                key={tech.technology_id}
                className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-lg"
              >
                <span className="text-sm font-medium">{tech.technology_name}</span>
                <button
                  onClick={() => handleRemoveTechnology(tech.technology_id)}
                  className="text-green-700 hover:text-green-900"
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Technology</h3>
        <div className="flex space-x-3">
          <select
            value={selectedTechnologyId || ''}
            onChange={(e) => setSelectedTechnologyId(Number(e.target.value))}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select a technology...</option>
            {availableTechnologies.map((tech) => (
              <option key={tech.technology_id} value={tech.technology_id}>
                {tech.technology_name}
              </option>
            ))}
          </select>
          <Button onClick={handleAddTechnology} disabled={!selectedTechnologyId}>
            Add Technology
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectTechnologyManager;