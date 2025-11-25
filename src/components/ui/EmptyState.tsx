import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-4 text-center',
        className
      )}
    >
      {Icon && (
        <div className="w-16 h-16 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center mb-4">
          <Icon className="w-8 h-8 text-[var(--color-text-muted)]" />
        </div>
      )}
      <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-2">{title}</h3>
      <p className="text-body-sm text-[var(--color-text-secondary)] max-w-sm mb-6">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}
