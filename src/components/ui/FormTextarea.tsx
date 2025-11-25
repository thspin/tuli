'use client';

import { forwardRef, TextareaHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, hint, className, ...props }, ref) => {
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
          <textarea
            ref={ref}
            className={cn(
              'w-full px-4 py-2.5 rounded-lg',
              'bg-[var(--color-bg-primary)] border',
              'text-[var(--color-text-primary)]',
              'placeholder:text-[var(--color-text-muted)]',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2',
              'resize-vertical',
              hasError
                ? 'border-[var(--color-expense)] focus:ring-[var(--color-expense)]/20'
                : 'border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/20',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className
            )}
            aria-invalid={hasError}
            aria-describedby={error ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined}
            {...props}
          />

          {hasError && (
            <div className="absolute right-3 top-3 text-[var(--color-expense)]">
              <AlertCircle className="w-4 h-4" />
            </div>
          )}
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

FormTextarea.displayName = 'FormTextarea';
