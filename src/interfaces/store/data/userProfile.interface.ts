import { IUser } from './user.interface';
import { ISkill } from './skills.interface';
import { IEducation } from './education.interface';
import { ISocial } from './socials.interface';
import { IProject } from './projects.interface';
import { IExperience } from './experience.interface';

export interface IUserProfile { 
  userId?: string;
  bio?: string;
  image?: string;
  skills?: ISkill[];
  location?: string;
  website?: string;
  experience?: IExperience[];
  education?: IEducation[];
  projects?: IProject[];
  social?: ISocial;
}
