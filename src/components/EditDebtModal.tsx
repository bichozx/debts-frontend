import type { Debt } from '../types/Debt.interface';
import type { UpdateDebtPayload } from '../types/Debt.interface';
import { useState } from 'react';

export default function EditDebtModal({
  debt,
  onClose,
  onSave,
}: {
  debt: Debt;
  onClose: () => void;
  onSave: (payload: UpdateDebtPayload) => Promise<void>;
}) {
  const [amount, setAmount] = useState(debt.amount);
  const [description, setDescription] = useState(debt.description);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({
        amount,
        description,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-[#0E1623] w-full max-w-md rounded-xl border border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Edit Debt</h2>

        <div className="space-y-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-transparent border border-gray-700 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-500"
          />

          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-transparent border border-gray-700 rounded-lg px-3 py-2 text-white outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="text-sm text-gray-400 hover:text-white"
            disabled={saving}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-emerald-500 text-black rounded-lg font-medium hover:bg-emerald-400 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
