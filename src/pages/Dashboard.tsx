import type { Debt, DebtFilter } from '../types/Debt.interface';
import { useEffect, useMemo, useState } from 'react';

import CreateDebtModal from '../components/CreateDebtModal';
import DebtCard from '../components/DebtCard';
import DebtFilters from '../components/DebtFilters';
import EditDebtModal from '../components/EditDebtModal';
import StatCard from '../components/StatCard';
import { exportDebtsCsv } from '../services/debts/debts.service';
import { useDebtsStore } from '../stores/debetStore/debts.store';

export default function Dashboard() {
  const {
    debts,
    summary,
    fetchDebts,
    fetchSummary,
    loading,
    markAsPaid,
    removeDebt,
    updateDebt,
  } = useDebtsStore();

  const [openModal, setOpenModal] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [filter, setFilter] = useState<DebtFilter>('all');

  useEffect(() => {
    fetchDebts();
    fetchSummary();
  }, [fetchDebts, fetchSummary]);

  const handleExport = async () => {
    setExporting(true);
    await exportDebtsCsv();
    setExporting(false);
  };

  const filteredDebts = useMemo(() => {
    switch (filter) {
      case 'paid':
        return debts.filter((d) => d.paid);
      case 'pending':
        return debts.filter((d) => !d.paid);
      default:
        return debts;
    }
  }, [debts, filter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold">Dashboard</h1>

        <div className="flex gap-3">
          <button
            onClick={handleExport}
            disabled={exporting}
            className="border border-gray-700 px-4 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 disabled:opacity-50"
          >
            {exporting ? 'Exporting...' : 'Export CSV'}
          </button>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-emerald-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-emerald-400"
          >
            + New Debt
          </button>
        </div>
      </div>

      <CreateDebtModal open={openModal} onClose={() => setOpenModal(false)} />
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Amount"
          value={`$${summary?.totalAmount.toLocaleString() ?? '0'}`}
        />
        <StatCard label="Paid Debts" value={summary?.countPaid ?? 0} />
        <StatCard label="Pending Debts" value={summary?.countPending ?? 0} />
      </div>
      <DebtFilters value={filter} onChange={setFilter} />

      {/* List */}
      <div className="space-y-3">
        {loading && <p className="text-gray-400">Loading...</p>}

        {!loading &&
          filteredDebts.map((debt) => (
            <DebtCard
              key={debt.id}
              debt={debt}
              onPay={() => markAsPaid(debt.id)}
              onDelete={() => removeDebt(debt.id)}
              onEdit={() => setEditingDebt(debt)}
            />
          ))}

        {!loading && filteredDebts.length === 0 && (
          <p className="text-gray-500 text-sm">
            No {filter === 'all' ? '' : filter} debts found
          </p>
        )}

        {editingDebt && (
          <EditDebtModal
            debt={editingDebt}
            onClose={() => setEditingDebt(null)}
            onSave={async (payload) => {
              await updateDebt(editingDebt.id, payload);
              setEditingDebt(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
