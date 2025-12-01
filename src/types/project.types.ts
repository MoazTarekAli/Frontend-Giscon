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

export interface PaginatedProjectResponse {
  data: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}
