import { useDebtsStore } from '../stores/debetStore/debts.store';
import { useState } from 'react';

export default function CreateDebtModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const createDebt = useDebtsStore((s) => s.createDebt);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await createDebt(Number(amount), description);
    setLoading(false);
    onClose();
    setAmount('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#111827] border border-gray-800 rounded-xl p-6 shadow-2xl">
        <h2 className="text-xl font-semibold text-white mb-1">New Debt</h2>
        <p className="text-sm text-gray-400 mb-6">
          Register a new pending debt
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            required
            placeholder="Amount"
            className="w-full bg-transparent border border-gray-700 text-white rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            required
            placeholder="Description"
            className="w-full bg-transparent border border-gray-700 text-white rounded-lg px-3 py-2 outline-none focus:border-emerald-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="flex-1 py-2 rounded-lg bg-emerald-500 text-black font-medium hover:bg-emerald-400 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
