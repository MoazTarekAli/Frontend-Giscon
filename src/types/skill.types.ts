export interface Skill {
  skill_id: number;
  skill_name: string;
  skill_type?: string;
}

export interface CreateSkillInput {
  skill_name: string;
  skill_type?: string;
}

export interface UpdateSkillInput {
  skill_name?: string;
  skill_type?: string;
}

export interface StaffSkill {
  staff_id: number;
  skill_id: number;
  skill_name: string;
  skill_type?: string;
}

export interface CreateStaffSkillInput {
  staff_id: number;
  skill_id: number;
}

export interface PaginatedSkillResponse {
  data: Skill[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface PaginatedStaffSkillResponse {
  data: StaffSkill[];
  total: number;
}