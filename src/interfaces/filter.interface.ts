export interface IFilter {
  filter_type: string;
  filter_values: any[];
  compare?: { min: number; max: number };
  sort?: 'increasing' | 'decreasing';
  search?: boolean;
}
