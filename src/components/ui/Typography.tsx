import { ReactNode } from 'react';
import { cn, formatCurrency } from '@/src/lib/utils';

interface HeadingProps {
  level?: 1 | 2 | 3;
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading = ({
  level = 1,
  children,
  className,
  as,
}: HeadingProps) => {
  const Tag = as || (`h${level}` as keyof JSX.IntrinsicElements);

  const sizes = {
    1: 'text-display-lg',
    2: 'text-display-md',
    3: 'text-title',
  };

  return (
    <Tag className={cn(sizes[level], 'text-[var(--color-text-primary)]', className)}>
      {children}
    </Tag>
  );
};

interface AmountProps {
  value: number;
  currency?: 'ARS' | 'USD';
  size?: 'sm' | 'md' | 'lg';
  type?: 'income' | 'expense' | 'neutral';
  className?: string;
  showSign?: boolean;
}

export const Amount = ({
  value,
  currency = 'ARS',
  size = 'md',
  type,
  className,
  showSign = false,
}: AmountProps) => {
  const formatted = formatCurrency(Math.abs(value), currency);

  const sizeClasses = {
    sm: 'text-amount',
    md: 'text-amount',
    lg: 'text-amount-lg',
  };

  const typeClasses = {
    income: 'text-[var(--color-income)]',
    expense: 'text-[var(--color-expense)]',
    neutral: 'text-[var(--color-text-primary)]',
  };

  const sign = showSign ? (value >= 0 ? '+' : '-') : '';

  return (
    <span
      className={cn(
        sizeClasses[size],
        type && typeClasses[type],
        className
      )}
    >
      {sign}{formatted}
    </span>
  );
};

interface TextProps {
  children: ReactNode;
  variant?: 'body' | 'body-sm' | 'caption';
  color?: 'primary' | 'secondary' | 'muted';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const Text = ({
  children,
  variant = 'body',
  color = 'primary',
  className,
  as = 'p',
}: TextProps) => {
  const Tag = as;

  const variantClasses = {
    body: 'text-body',
    'body-sm': 'text-body-sm',
    caption: 'text-caption',
  };

  const colorClasses = {
    primary: 'text-[var(--color-text-primary)]',
    secondary: 'text-[var(--color-text-secondary)]',
    muted: 'text-[var(--color-text-muted)]',
  };

  return (
    <Tag className={cn(variantClasses[variant], colorClasses[color], className)}>
      {children}
    </Tag>
  );
};
