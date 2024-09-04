export interface IPagination {
  skip: number;
  limit: number;
  total: number;
  moreAvailable: boolean;
}

export interface Option {
  label: string;
  value: any;
}
