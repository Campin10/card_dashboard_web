export const ENDPOINTS = {
  GET_METRICS: "/metrics/:cardId",
  GET_ACTIVITY: "/activity/:cardId",
  GET_CARDS: "/card",
};

export const DEFAULT_PAGINATION_LIMIT = 10;

export const DEFAULT_CARD_OPTION = {
  label: "Visa - ***3380",
  value: "ic_1I1OFqE8hHKqEw8LK31tUA4U",
};

export enum ReactQueryKeys {
  GET_METRICS = "GET_METRICS",
  GET_ACTIVITY = "GET_ACTIVITY",
  GET_CARDS = "GET_CARDS",
}
