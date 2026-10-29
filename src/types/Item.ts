export interface Item {
  _id: string;
  transactionType: string;
  category: string;
  description: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialItemFormData {
  transactionType: string;
  category: string;
  description: string;
  amount: number | string;
}
