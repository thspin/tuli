import React from 'react';
import { cn } from '@/src/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  helperText,
  fullWidth = true,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={cn(fullWidth && 'w-full', 'space-y-1.5')}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-[var(--color-text-secondary)]"
        >
          {label}
          {props.required && <span className="text-[var(--color-expense)] ml-1" aria-label="requerido">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          className={cn(
            'w-full h-10 px-3 rounded-lg border bg-[var(--color-bg-secondary)]',
            'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--color-bg-tertiary)]',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            error
              ? 'border-[var(--color-expense)] focus:ring-[var(--color-expense)]'
              : 'border-[var(--color-border)] hover:border-[var(--color-border-hover)]',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p id={`${inputId}-error`} className="text-xs text-[var(--color-expense)]" role="alert">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p id={`${inputId}-helper`} className="text-xs text-[var(--color-text-muted)]">
          {helperText}
        </p>
      )}
    </div>
  );
}

export { Input };
