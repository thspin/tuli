import React from 'react';
import { cn } from '@/src/lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  options?: Array<{ value: string; label: string }>;
}

export default function Select({
  label,
  error,
  helperText,
  fullWidth = true,
  options,
  children,
  className = '',
  id,
  ...props
}: SelectProps) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={cn(fullWidth && 'w-full', 'space-y-1.5')}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-[var(--color-text-secondary)]"
        >
          {label}
          {props.required && <span className="text-[var(--color-expense)] ml-1" aria-label="requerido">*</span>}
        </label>
      )}

      <select
        id={selectId}
        className={cn(
          'w-full h-10 px-3 rounded-lg border bg-[var(--color-bg-secondary)]',
          'text-[var(--color-text-primary)]',
          'transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--color-bg-tertiary)]',
          error
            ? 'border-[var(--color-expense)] focus:ring-[var(--color-expense)]'
            : 'border-[var(--color-border)] hover:border-[var(--color-border-hover)]',
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
        {...props}
      >
        {options ? (
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        ) : (
          children
        )}
      </select>

      {error && (
        <p id={`${selectId}-error`} className="text-xs text-[var(--color-expense)]" role="alert">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={`${selectId}-helper`} className="text-xs text-[var(--color-text-muted)]">
          {helperText}
        </p>
      )}
    </div>
  );
}

export { Select };
