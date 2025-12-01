import React, { useState, useEffect } from 'react';
import { projectService } from '../../services/project.service';
import { staffService } from '../../services/staff.service';
import type { ProjectStaff } from '../../types/project.types';
import type { Staff } from '../../types/staff.types';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import Input from '../common/Input';

interface ProjectStaffManagerProps {
  projectId: number;
}

const ProjectStaffManager: React.FC<ProjectStaffManagerProps> = ({
  projectId,
}) => {
  const [projectStaff, setProjectStaff] = useState<ProjectStaff[]>([]);
  const [allStaff, setAllStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);
  const [roleInProject, setRoleInProject] = useState('');
  const [editingRole, setEditingRole] = useState<{
    roleId: number;
    role: string;
  } | null>(null);

  useEffect(() => {
    fetchProjectStaff();
    fetchAllStaff();
  }, [projectId]);

  const fetchProjectStaff = async () => {
    setLoading(true);
    try {
      // Note: This gets staff by staff_id, we need to get by project_id
      // You may need to create a new endpoint or modify the existing one
      const response = await projectService.getProjectStaff(projectId);
      setProjectStaff(response.data);
    } catch (err) {
      console.error('Failed to fetch project staff', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllStaff = async () => {
    try {
      const response = await staffService.getAllStaff(1, 100);
      setAllStaff(response.data);
    } catch (err) {
      console.error('Failed to fetch staff', err);
    }
  };

  const handleAddStaff = async () => {
    if (!selectedStaffId || !roleInProject.trim()) {
      alert('Please select a staff member and enter a role');
      return;
    }

    setLoading(true);
    try {
      await projectService.addProjectStaff({
        staff_id: selectedStaffId,
        project_id: projectId,
        staff_role: roleInProject,
      });
      setSelectedStaffId(null);
      setRoleInProject('');
      await fetchProjectStaff();
    } catch (err) {
      console.error('Failed to add staff to project', err);
      alert('Failed to add staff to project');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (roleId: number, newRole: string) => {
    if (!newRole.trim()) {
      alert('Role cannot be empty');
      return;
    }

    setLoading(true);
    try {
      await projectService.updateProjectStaff(roleId, { staff_role: newRole });
      setEditingRole(null);
      await fetchProjectStaff();
    } catch (err) {
      console.error('Failed to update role', err);
      alert('Failed to update role');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveStaff = async (roleId: number) => {
    if (
      !window.confirm(
        'Are you sure you want to remove this staff member from the project?'
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      await projectService.deleteProjectStaff(roleId);
      await fetchProjectStaff();
    } catch (err) {
      console.error('Failed to remove staff from project', err);
      alert('Failed to remove staff from project');
    } finally {
      setLoading(false);
    }
  };

  const availableStaff = allStaff.filter(
    (staff) => !projectStaff.some((ps) => ps.staff_id === staff.staff_id)
  );

  if (loading && projectStaff.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Project Team
        </h3>
        {projectStaff.length === 0 ? (
          <p className="text-gray-500 text-sm">No team members assigned yet.</p>
        ) : (
          <div className="space-y-3">
            {projectStaff.map((ps) => (
              <div
                key={ps.role_id}
                className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    Staff ID: {ps.staff_id}
                  </p>
                  {editingRole?.roleId === ps.role_id ? (
                    <div className="mt-2 flex items-center space-x-2">
                      <input
                        type="text"
                        value={editingRole.role}
                        onChange={(e) =>
                          setEditingRole({
                            ...editingRole,
                            role: e.target.value,
                          })
                        }
                        className="px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Role in project"
                      />
                      <Button
                        variant="primary"
                        onClick={() =>
                          handleUpdateRole(ps.role_id, editingRole.role)
                        }
                        className="text-sm py-1 px-3"
                      >
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setEditingRole(null)}
                        className="text-sm py-1 px-3"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 mt-1">
                      Role: {ps.staff_role}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2 ml-4">
                  {!editingRole && (
                    <Button
                      variant="secondary"
                      onClick={() =>
                        setEditingRole({
                          roleId: ps.role_id,
                          role: ps.staff_role,
                        })
                      }
                      className="text-sm py-1 px-3"
                    >
                      Edit Role
                    </Button>
                  )}
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveStaff(ps.role_id)}
                    className="text-sm py-1 px-3"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Add Team Member
        </h3>
        <div className="space-y-3">
          <select
            value={selectedStaffId || ''}
            onChange={(e) => setSelectedStaffId(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select a staff member...</option>
            {availableStaff.map((staff) => (
              <option key={staff.staff_id} value={staff.staff_id}>
                {staff.staff_name} {staff.title && `- ${staff.title}`}
              </option>
            ))}
          </select>

          <Input
            label="Role in Project"
            value={roleInProject}
            onChange={setRoleInProject}
            placeholder="e.g., Lead Developer, Project Manager, UI Designer"
            required
          />

          <Button
            onClick={handleAddStaff}
            disabled={!selectedStaffId || !roleInProject.trim() || loading}
            className="w-full"
          >
            {loading ? 'Adding...' : 'Add to Project'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectStaffManager;
