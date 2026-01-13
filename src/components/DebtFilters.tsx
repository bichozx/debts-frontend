import type { DebtFiltersProps } from '../types/Debt.interface';

export default function DebtFilters({ value, onChange }: DebtFiltersProps) {
  const base = 'px-3 py-1 rounded-lg text-sm transition-colors';

  const active = 'bg-emerald-500 text-black';
  const inactive = 'border border-gray-700 text-gray-300 hover:bg-gray-800';

  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange('all')}
        className={`${base} ${value === 'all' ? active : inactive}`}
      >
        All
      </button>

      <button
        onClick={() => onChange('pending')}
        className={`${base} ${value === 'pending' ? active : inactive}`}
      >
        Pending
      </button>

      <button
        onClick={() => onChange('paid')}
        className={`${base} ${value === 'paid' ? active : inactive}`}
      >
        Paid
      </button>
    </div>
  );
}
