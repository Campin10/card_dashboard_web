import { IPagination } from "./general.type";

export interface IActivity {
  cardId: string;
  amount: number;
  category: string;
  state: boolean;
  created: number;
}

export interface IActivityResponse {
  pagination: IPagination;
  items: IActivity[];
}
