export interface Debt {
  id: string;
  amount: number;
  description: string;
  paid: boolean;
  createdAt: string;
}

export interface DebtsState {
  debts: Debt[];
  loading: boolean;

  fetchDebts: () => Promise<void>;
  createDebt: (amount: number, description: string) => Promise<void>;
  markAsPaid: (id: string) => Promise<void>;
  removeDebt: (id: string) => Promise<void>;
}
