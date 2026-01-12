import type { Debt } from '../types/Debt.interface';

export default function DebtCard({
  debt,
  onPay,
  onDelete,
}: {
  debt: Debt;
  onPay: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="bg-[#0E1623] border border-gray-800 rounded-xl p-4 flex justify-between items-center">
      <div>
        <p className="text-white font-medium">
          ${debt.amount.toLocaleString()}
        </p>
        <p className="text-sm text-gray-400">{debt.description}</p>
      </div>

      <div className="flex gap-3 items-center">
        {debt.paid ? (
          <span className="text-emerald-500 text-sm">Paid</span>
        ) : (
          <button
            onClick={onPay}
            className="text-sm px-3 py-1 rounded bg-emerald-500 text-black hover:bg-emerald-400"
          >
            Pay
          </button>
        )}

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
