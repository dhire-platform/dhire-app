import { IUser } from './user.interface';
import { ISkill } from './skills.interface';
import { IEducation } from './education.interface';
import { ISocial } from './socials.interface';
import { IProject } from './projects.interface';
import { IExperience } from './experience.interface';

export interface IUserProfile {
  userId?: string;
  bio?: string; // done
  image?: string; // done
  skills?: ISkill[]; // done
  location?: string;
  website?: string;
  achievement?: string;
  experience?: IExperience[]; // done
  education?: IEducation[]; // done
  projects?: IProject[]; // =>
  social?: ISocial;
  Applicant?: any[];
}

export interface IRecruiterProfile {
  userId?: string;
  bio?: string;
  image?: string;
  company?: string;
  location?: string;
  website?: string;
  social?: ISocial;
}
