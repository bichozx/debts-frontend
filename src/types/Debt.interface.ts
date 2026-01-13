import type { DebtSummary } from './DebtSummary.interface';

export interface Debt {
  id: string;
  amount: number;
  description: string;
  paid: boolean;
  createdAt: string;
  status: 'PAID' | 'PENDING';
}

export interface UpdateDebtPayload {
  amount?: number;
  description?: string;
}

export type DebtFilter = 'all' | 'pending' | 'paid';
export interface DebtFiltersProps {
  value: DebtFilter;
  onChange: (value: DebtFilter) => void;
}

export interface DebtsState {
  debts: Debt[];
  summary: DebtSummary | null;
  loading: boolean;

  fetchDebts: () => Promise<void>;
  fetchSummary: () => Promise<void>;
  createDebt: (amount: number, description: string) => Promise<void>;
  updateDebt: (id: string, payload: UpdateDebtPayload) => Promise<void>;
  markAsPaid: (id: string) => Promise<void>;
  removeDebt: (id: string) => Promise<void>;
}
