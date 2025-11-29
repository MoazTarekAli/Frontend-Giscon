export interface Project {
  project_id: number;
  project_name: string;
  project_description: string;
}

export interface CreateProjectInput {
  project_name: string;
  project_description: string;
}

export interface UpdateProjectInput {
  project_name?: string;
  project_description?: string;
}

export interface ProjectStaff {
  role_id: number;
  staff_id: number;
  project_id: number;
  project_name: string;
  project_description: string;
  role_in_project: string;
}

export interface CreateProjectStaffInput {
  staff_id: number;
  project_id: number;
  role_in_project: string;
}

export interface UpdateProjectStaffInput {
  role_in_project?: string;
}

export interface PaginatedProjectResponse {
  data: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface PaginatedProjectStaffResponse {
  data: ProjectStaff[];
  total: number;
}