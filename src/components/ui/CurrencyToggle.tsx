'use client';

import { cn } from '@/src/lib/utils';

interface CurrencyToggleProps {
  value: 'ARS' | 'USD';
  onChange: (currency: 'ARS' | 'USD') => void;
  rate?: number | null;
  className?: string;
}

export function CurrencyToggle({ value, onChange, rate, className }: CurrencyToggleProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex items-center gap-1 p-1 bg-[var(--color-bg-tertiary)] rounded-lg">
        <button
          onClick={() => onChange('ARS')}
          className={cn(
            'px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
            value === 'ARS'
              ? 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] shadow-sm'
              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
          )}
          aria-pressed={value === 'ARS'}
          aria-label="Mostrar en pesos argentinos"
        >
          ARS
        </button>
        <button
          onClick={() => onChange('USD')}
          className={cn(
            'px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
            value === 'USD'
              ? 'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] shadow-sm'
              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
          )}
          aria-pressed={value === 'USD'}
          aria-label="Mostrar en dólares estadounidenses"
        >
          USD
        </button>
      </div>
      {rate && (
        <span className="text-xs text-[var(--color-text-muted)]" aria-label={`Tipo de cambio: 1 dólar equivale a ${rate} pesos`}>
          1 USD = ${rate.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
        </span>
      )}
    </div>
  );
}
