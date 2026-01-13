import type { Debt } from '../types/Debt.interface';

interface DebtDetailModalProps {
  debt: Debt;
  open: boolean;
  onClose: () => void;
}

export default function DebtDetailModal({
  debt,
  open,
  onClose,
}: DebtDetailModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      {/* Card */}
      <div className="w-full max-w-md rounded-xl bg-[#0E1623] border border-gray-800 p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Debt Detail</h2>

          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400">Amount</p>
            <p className="text-xl font-semibold text-white">
              ${debt.amount.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Description</p>
            <p className="text-gray-200">{debt.description}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Status</p>
            {debt.paid ? (
              <span className="inline-block mt-1 text-sm font-medium text-emerald-400">
                Paid
              </span>
            ) : (
              <span className="inline-block mt-1 text-sm font-medium text-yellow-400">
                Pending
              </span>
            )}
          </div>

          {debt.createdAt && (
            <div>
              <p className="text-sm text-gray-400">Created at</p>
              <p className="text-gray-300 text-sm">
                {new Date(debt.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm border border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
