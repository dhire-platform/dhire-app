export interface IExperience {
  company?: Company;
  image?: string;
  designation?: string;
  from?: Date;
  to?: Date;
  current?: boolean;
  location?: string;
  description?: string;
}

export interface Company {
  name: string;
  image: string;
}
