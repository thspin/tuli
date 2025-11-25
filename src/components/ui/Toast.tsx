'use client';

import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/src/lib/utils';

export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastProps extends Toast {
  onClose: () => void;
}

const variantConfig: Record<
  ToastVariant,
  {
    icon: React.ComponentType<{ className?: string }>;
    className: string;
  }
> = {
  success: {
    icon: CheckCircle,
    className: 'bg-[var(--color-income-light)] text-[var(--color-income)] border-[var(--color-income)]',
  },
  error: {
    icon: AlertCircle,
    className: 'bg-[var(--color-expense-light)] text-[var(--color-expense)] border-[var(--color-expense)]',
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800',
  },
  info: {
    icon: Info,
    className: 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800',
  },
};

export function ToastComponent({ id, title, description, variant = 'info', onClose }: ToastProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
      className={cn(
        'relative flex items-start gap-3 p-4 rounded-lg border shadow-lg',
        'bg-[var(--color-bg-primary)] backdrop-blur-lg',
        'min-w-[320px] max-w-md',
        config.className
      )}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm">{title}</h3>
        {description && (
          <p className="mt-1 text-sm opacity-90 leading-relaxed">{description}</p>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        aria-label="Cerrar notificación"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div
      className="fixed bottom-0 right-0 z-50 p-6 pb-20 md:pb-6 flex flex-col gap-3 pointer-events-none"
      aria-live="polite"
      aria-atomic="false"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastComponent {...toast} onClose={() => onRemove(toast.id)} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
