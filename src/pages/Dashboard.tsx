import type { Debt, DebtFilter } from '../types/Debt.interface';
import { useEffect, useMemo, useState } from 'react';

import CreateDebtModal from '../components/CreateDebtModal';
import DebtCard from '../components/DebtCard';
import DebtDetailModal from '../components/DebtDetailModal';
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

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [selectedDebt, setSelectedDebt] = useState<Debt | null>(null);
  const [filter, setFilter] = useState<DebtFilter>('all');
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchDebts();
    fetchSummary();
  }, [fetchDebts, fetchSummary]);

  const filteredDebts = useMemo(() => {
    if (filter === 'paid') return debts.filter((d) => d.paid);
    if (filter === 'pending') return debts.filter((d) => !d.paid);
    return debts;
  }, [debts, filter]);

  const handleExport = async () => {
    setExporting(true);
    await exportDebtsCsv();
    setExporting(false);
  };

  const handleSaveEdit = async (payload: Partial<Debt>) => {
    if (!editingDebt) return;
    await updateDebt(editingDebt.id, payload);
    setEditingDebt(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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
            onClick={() => setOpenCreateModal(true)}
            className="bg-emerald-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-emerald-400"
          >
            + New Debt
          </button>
        </div>
      </div>

      {/* Modals */}
      <CreateDebtModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />

      {editingDebt && (
        <EditDebtModal
          debt={editingDebt}
          onClose={() => setEditingDebt(null)}
          onSave={handleSaveEdit}
        />
      )}

      {selectedDebt && (
        <DebtDetailModal
          debt={selectedDebt}
          open={!!selectedDebt}
          onClose={() => setSelectedDebt(null)}
        />
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Amount"
          value={`$${summary?.totalAmount.toLocaleString() ?? '0'}`}
        />
        <StatCard label="Paid Debts" value={summary?.countPaid ?? 0} />
        <StatCard label="Pending Debts" value={summary?.countPending ?? 0} />
      </div>

      {/* Filters */}
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
              onView={() => setSelectedDebt(debt)}
            />
          ))}

        {!loading && filteredDebts.length === 0 && (
          <p className="text-gray-500 text-sm">
            No {filter === 'all' ? '' : filter} debts found
          </p>
        )}
      </div>
    </div>
  );
}
