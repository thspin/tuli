import React from 'react';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

const variantConfig: Record<
  AlertVariant,
  { icon: typeof Info; bg: string; border: string; text: string; iconColor: string }
> = {
  info: {
    icon: Info,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    iconColor: 'text-blue-600',
  },
  success: {
    icon: CheckCircle,
    bg: 'bg-[var(--color-income-light)]',
    border: 'border-[var(--color-income)]',
    text: 'text-[var(--color-income)]',
    iconColor: 'text-[var(--color-income)]',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-[var(--color-warning-light)]',
    border: 'border-[var(--color-warning)]',
    text: 'text-amber-800',
    iconColor: 'text-[var(--color-warning)]',
  },
  error: {
    icon: XCircle,
    bg: 'bg-[var(--color-expense-light)]',
    border: 'border-[var(--color-expense)]',
    text: 'text-[var(--color-expense)]',
    iconColor: 'text-[var(--color-expense)]',
  },
};

export default function Alert({
  variant = 'info',
  title,
  children,
  onClose,
  className = '',
}: AlertProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        config.bg,
        'border',
        config.border,
        'rounded-lg p-4',
        className
      )}
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn('w-5 h-5 flex-shrink-0', config.iconColor)} aria-hidden="true" />
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={cn('font-semibold mb-1', config.text)}>{title}</h4>
          )}
          <div className={cn('text-sm', config.text)}>{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={cn(
              config.text,
              'hover:opacity-70 transition-opacity flex-shrink-0'
            )}
            aria-label="Cerrar alerta"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export { Alert };
