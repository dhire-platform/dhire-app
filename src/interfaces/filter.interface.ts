export interface IFilter {
  filter_type: string;
  filter_values: any[];
  compare?: { base: string[]; compareTo: number[] };
  sort?: 'increasing' | 'decreasing';
  search?: boolean;
}
