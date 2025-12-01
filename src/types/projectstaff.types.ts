export interface ProjectStaff {
  role_id: number;
  staff_id: number;
  project_id: number;
  project_name: string;
  project_description: string;
  staff_role: string;
}

export interface CreateProjectStaffInput {
  project_id: number;
  staff_id: number;
  staff_role: string;
}

export interface UpdateProjectStaffInput {
  project_id?: number;
  staff_id?: number;
  staff_role?: string;
}

export interface ProjectStaffResponse {
  data: ProjectStaff[];
  total: number;
}
