export interface IMetrics {
  totalAmountSpent: number;
  averageTransactionAmount: number;
  transactionsGroupedByCategory: Record<string, number>;
  numberOfTransactions: number;
}
