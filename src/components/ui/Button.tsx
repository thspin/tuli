import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  isLoading?: boolean; // Alias for compatibility
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  icon?: React.ReactNode; // For backwards compatibility
  children?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-[var(--color-primary)] text-white
    hover:bg-[var(--color-primary-light)]
    active:scale-[0.98]
  `,
  secondary: `
    bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]
    border border-[var(--color-border)]
    hover:bg-[var(--color-bg-secondary)] hover:border-[var(--color-border-hover)]
    active:scale-[0.98]
  `,
  outline: `
    bg-transparent text-[var(--color-text-primary)]
    border border-[var(--color-border)]
    hover:bg-[var(--color-bg-tertiary)] hover:border-[var(--color-border-hover)]
  `,
  ghost: `
    bg-transparent text-[var(--color-text-secondary)]
    hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]
  `,
  success: `
    bg-[var(--color-income)] text-white
    hover:bg-emerald-600
    active:scale-[0.98]
  `,
  danger: `
    bg-[var(--color-expense)] text-white
    hover:bg-red-600
    active:scale-[0.98]
  `,
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  icon, // backwards compatibility
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const isLoadingState = loading || isLoading;
  const finalLeftIcon = leftIcon || icon;

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-lg',
        'transition-all duration-150 ease-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || isLoadingState}
      aria-busy={isLoadingState}
      {...props}
    >
      {isLoadingState ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          <span>Cargando...</span>
        </>
      ) : (
        <>
          {finalLeftIcon && <span aria-hidden="true">{finalLeftIcon}</span>}
          {children}
          {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}

// Export component for named imports
export { Button };
