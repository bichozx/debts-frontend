import {
  createDebt as createDebtService,
  deleteDebt,
  getDebts,
  payDebt,
} from '../../services/debts/debts.service';

import type { DebtsState } from '../../types/Debt.interface';
import { create } from 'zustand';

export const useDebtsStore = create<DebtsState>((set, get) => ({
  debts: [],
  loading: false,

  fetchDebts: async () => {
    set({ loading: true });

    try {
      const debts = await getDebts();

      set({
        debts: debts.map((d) => ({
          ...d,
          amount: Number(d.amount),
        })),
      });
    } finally {
      set({ loading: false });
    }
  },

  createDebt: async (amount, description) => {
    const newDebt = await createDebtService(amount, description);

    set({
      debts: [newDebt, ...get().debts],
    });
  },

  markAsPaid: async (id) => {
    await payDebt(id);

    set({
      debts: get().debts.map((d) => (d.id === id ? { ...d, paid: true } : d)),
    });
  },

  removeDebt: async (id) => {
    await deleteDebt(id);

    set({
      debts: get().debts.filter((d) => d.id !== id),
    });
  },
}));
