import type { Debt } from '../types/Debt.interface';

export default function DebtCard({
  debt,
  onPay,
  onDelete,
  onEdit,
}: {
  debt: Debt;
  onPay: () => void;
  onDelete: () => void;
  onEdit: () => void;
}) {
  const isPaid = debt.status === 'PAID';
  return (
    <div className="bg-[#0E1623] border border-gray-800 rounded-xl p-4 flex justify-between items-center">
      {/* Info */}
      <div>
        <p className="text-white font-medium">
          ${debt.amount.toLocaleString()}
        </p>
        <p className="text-sm text-gray-400">{debt.description}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 items-center">
        {/* Solo si NO está pagada */}
        {!isPaid && (
          <>
            <button
              onClick={onPay}
              className="text-sm px-3 py-1 rounded bg-emerald-500 text-black hover:bg-emerald-400"
            >
              Pay
            </button>

            <button
              onClick={onEdit}
              className="text-sm px-3 py-1 rounded border border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Edit
            </button>
          </>
        )}

        {/* Delete siempre visible */}
        <button
          onClick={onDelete}
          className="text-sm text-gray-400 hover:text-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
