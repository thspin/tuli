'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, hint, leftIcon, rightIcon, className, ...props }, ref) => {
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
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-2.5 rounded-lg',
              'bg-[var(--color-bg-primary)] border',
              'text-[var(--color-text-primary)]',
              'placeholder:text-[var(--color-text-muted)]',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2',
              hasError
                ? 'border-[var(--color-expense)] focus:ring-[var(--color-expense)]/20'
                : 'border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={error ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined}
            {...props}
          />

          {rightIcon && !hasError && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
              {rightIcon}
            </div>
          )}

          {hasError && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-expense)]">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${props.id}-error`}
            className="mt-1.5 text-sm text-[var(--color-expense)] flex items-center gap-1"
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

FormInput.displayName = 'FormInput';
