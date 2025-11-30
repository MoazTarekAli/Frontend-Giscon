export interface Technology {
  technology_id: number;
  technology_name: string;
}

export interface CreateTechnologyInput {
  technology_name: string;
}

export interface UpdateTechnologyInput {
  technology_name?: string;
}

export interface ProjectTechnology {
  project_id: number;
  technology_id: number;
  technology_name: string;
}

export interface CreateProjectTechnologyInput {
  project_id: number;
  technology_id: number;
}

export interface PaginatedTechnologyResponse {
  data: Technology[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface PaginatedProjectTechnologyResponse {
  data: Technology[];
  total: number;
}
