import { SkillLevel } from 'src/lib/enums/enums';

export type skill = {
  name: string;
  level: SkillLevel;
};
export interface ExperienceType {
  company?: string;
  image?: string;
  designation?: string;
  from?: Date;
  to?: Date;
  current?: boolean;
  location?: string;
  description?: string;
}

export interface EducationType {
  school?: string;
  degree?: string;
  fieldOfStudy?: string;
  from?: Date;
  to?: Date;
  current?: boolean;
  location?: string;
  description?: string;
}

export interface ProjectType {
  title: string;
  link?: string;
  from?: string;
  to?: string;
  current?: boolean;
  description?: string;
}

export interface SocialType {
  youtube?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
}

export interface getByWalletResponse {
  id: string;
  name: string;
  type: string;
  wallet: string;
  username: string;
}
export interface UserProfile {
  achievement: string | undefined;
  userId: string;
  bio?: string;
  image?: string;
  skills?: skill[];
  location?: string;
  website?: string;
  experience: ExperienceType[];
  education: EducationType[];
  projects: ProjectType[];
  social?: SocialType;
}
