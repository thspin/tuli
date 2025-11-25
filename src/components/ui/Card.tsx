import React from 'react';
import { cn } from '@/src/lib/utils';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'interactive' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const variantClasses = {
  default: 'bg-[var(--color-bg-secondary)] border border-[var(--color-border)]',
  elevated: 'bg-[var(--color-bg-secondary)] shadow-[var(--shadow-card)]',
  interactive: `
    bg-[var(--color-bg-secondary)] border border-[var(--color-border)]
    hover:border-[var(--color-accent)] hover:shadow-md
    cursor-pointer transition-all duration-200
  `,
  ghost: 'bg-transparent',
};

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
};

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  className,
  onClick,
  ...props
}: CardProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden',
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('pb-4', className)}>{children}</div>;
}

export function CardTitle({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3 className={cn('text-title font-semibold text-[var(--color-text-primary)]', className)}>
      {children}
    </h3>
  );
}

export function CardContent({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function CardFooter({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('pt-4 mt-4 border-t border-[var(--color-border)]', className)}>
      {children}
    </div>
  );
}

export { Card };
