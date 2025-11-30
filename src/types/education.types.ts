export interface Education {
  education_id: number;
  staff_id: number;
  degree: string;
  institution: string;
  field_of_study?: string;
  start_date: string;
  end_date?: string;
}

export interface CreateEducationInput {
  staff_id: number;
  degree: string;
  institution: string;
  field_of_study?: string;
  start_date: string;
  end_date?: string;
}

export interface UpdateEducationInput {
  degree?: string;
  institution?: string;
  field_of_study?: string;
  start_date?: string;
  end_date?: string;
}

export interface PaginatedEducationResponse {
  data: Education[];
  total: number;
}
