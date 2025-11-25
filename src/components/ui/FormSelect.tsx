'use client';

import { forwardRef, SelectHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, hint, className, children, ...props }, ref) => {
    const hasError = !!error;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
            {label}
            {props.required && <span className="text-[var(--color-expense)] ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            className={cn(
              'w-full px-4 py-2.5 rounded-lg',
              'bg-[var(--color-bg-primary)] border',
              'text-[var(--color-text-primary)]',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2',
              'appearance-none',
              'cursor-pointer',
              hasError
                ? 'border-[var(--color-expense)] focus:ring-[var(--color-expense)]/20'
                : 'border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={error ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined}
            {...props}
          >
            {children}
          </select>

          {/* Dropdown arrow */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {hasError ? (
              <AlertCircle className="w-4 h-4 text-[var(--color-expense)]" />
            ) : (
              <svg
                className="w-4 h-4 text-[var(--color-text-muted)]"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>
        </div>

        {error && (
          <p
            id={`${props.id}-error`}
            className="mt-1.5 text-sm text-[var(--color-expense)]"
            role="alert"
          >
            {error}
          </p>
        )}

        {hint && !error && (
          <p id={`${props.id}-hint`} className="mt-1.5 text-sm text-[var(--color-text-muted)]">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';
