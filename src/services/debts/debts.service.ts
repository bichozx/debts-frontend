import type { Debt } from '../../types/Debt.interface';
import type { DebtSummary } from '../../types/DebtSummary.interface';
import { api } from '../api/apiBase';

export const getDebts = async (): Promise<Debt[]> => {
  const { data } = await api.get('/debts');
  return data;
};

export const createDebt = async (
  amount: number,
  description: string
): Promise<Debt> => {
  const { data } = await api.post('/debts', {
    amount,
    description,
  });

  return data;
};

export const payDebt = async (id: string): Promise<void> => {
  await api.patch(`/debts/${id}/pay`);
};

export const deleteDebt = async (id: string): Promise<void> => {
  await api.delete(`/debts/${id}`);
};

export const exportDebtsCsv = async (): Promise<void> => {
  const response = await api.get('/debts/export', {
    params: { format: 'csv' },
    responseType: 'blob', // 👈 CLAVE
  });

  const blob = new Blob([response.data], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'debts.csv');
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export const getDebtSummary = async (): Promise<DebtSummary> => {
  const { data } = await api.get('/debts/summary');
  return {
    ...data,
    totalAmount: Number(data.totalAmount),
    paidAmount: Number(data.paidAmount),
    pendingAmount: Number(data.pendingAmount),
  };
};

export const updateDebt = async (
  id: string,
  payload: { amount?: number; description?: string }
): Promise<Debt> => {
  const { data } = await api.patch(`/debts/${id}`, payload);
  return data;
};
