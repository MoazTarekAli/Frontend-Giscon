export interface WorkExperience {
  work_id: number;
  staff_id: number;
  company: string;
  work_title: string;
  responsibilities: string;
  start_date: string;
  end_date?: string;
}

export interface CreateWorkInput {
  staff_id: number;
  company: string;
  work_title: string;
  responsibilities: string;
  start_date: string;
  end_date?: string;
}

export interface UpdateWorkInput {
  company?: string;
  work_title?: string;
  responsibilities?: string;
  start_date?: string;
  end_date?: string;
}

export interface PaginatedWorkResponse {
  data: WorkExperience[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}