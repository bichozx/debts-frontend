import {
  createDebt as createDebtService,
  deleteDebt,
  getDebtSummary,
  getDebts,
  payDebt,
  updateDebt as updateDebtService,
} from '../../services/debts/debts.service';

import type { DebtsState } from '../../types/Debt.interface';
import { create } from 'zustand';

export const useDebtsStore = create<DebtsState>((set, get) => ({
  debts: [],
  summary: null,
  loading: false,

  fetchDebts: async () => {
    set({ loading: true });
    try {
      const debts = await getDebts();
      set({
        debts: debts.map((d) => ({
          ...d,
          amount: Number(d.amount),
          paid: d.status === 'PAID',
        })),
      });
    } finally {
      set({ loading: false });
    }
  },

  fetchSummary: async () => {
    const summary = await getDebtSummary();
    set({ summary });
  },

  createDebt: async (amount, description) => {
    await createDebtService(amount, description);
    await Promise.all([get().fetchDebts(), get().fetchSummary()]);
  },

  updateDebt: async (id, payload) => {
    await updateDebtService(id, payload);
    await Promise.all([get().fetchDebts(), get().fetchSummary()]);
  },

  markAsPaid: async (id) => {
    await payDebt(id);
    await Promise.all([get().fetchDebts(), get().fetchSummary()]);
  },

  removeDebt: async (id) => {
    await deleteDebt(id);
    await Promise.all([get().fetchDebts(), get().fetchSummary()]);
  },
}));
