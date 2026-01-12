import CreateDebtModal from '../components/CreateDebtModal';
import DebtCard from '../components/DebtCard';
import StatCard from '../components/StatCard';
import { exportDebtsCsv } from '../services/debts/debts.service';
import { useDebtsStore } from '../stores/debetStore/debts.store';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Dashboard() {
  const { debts, fetchDebts, loading, markAsPaid, removeDebt } =
    useDebtsStore();

  const [openModal, setOpenModal] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchDebts();
  }, [fetchDebts]);

  const total =
    debts.reduce((acc, d) => acc + Math.round(Number(d.amount) * 100), 0) / 100;
  const paid = debts.filter((d) => {
    return d.paid;
  }).length;
  const pending = debts.filter((d) => !d.paid).length;

  const handleExport = async () => {
    setExporting(true);
    await exportDebtsCsv();
    setExporting(false);
  };

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
        <StatCard label="Total Amount" value={`$${total.toLocaleString()}`} />
        <StatCard label="Paid Debts" value={paid} />
        <StatCard label="Pending Debts" value={pending} />
      </div>

      {/* List */}
      <div className="space-y-3">
        {loading && <p className="text-gray-400">Loading...</p>}

        {!loading &&
          debts.map((debt) => (
            <DebtCard
              key={debt.id}
              debt={debt}
              onPay={() => markAsPaid(debt.id)}
              onDelete={() => removeDebt(debt.id)}
            />
          ))}

        {!loading && debts.length === 0 && (
          <p className="text-gray-500 text-sm">No debts found</p>
        )}
      </div>
    </div>
  );
}
