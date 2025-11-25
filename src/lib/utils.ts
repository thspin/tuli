import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * Uses clsx to handle conditional classes and tailwind-merge to resolve conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number with locale and decimals
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toLocaleString('es-AR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format currency amount
 */
export function formatCurrency(amount: number, currency: 'ARS' | 'USD' = 'ARS'): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format relative date (Hoy, Ayer, etc.)
 */
export function formatRelativeDate(date: Date | string): string {
  const d = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Reset time to compare only dates
  const resetTime = (date: Date) => {
    date.setHours(0, 0, 0, 0);
    return date;
  };

  const dateOnly = resetTime(new Date(d));
  const todayOnly = resetTime(new Date(today));
  const yesterdayOnly = resetTime(new Date(yesterday));

  if (dateOnly.getTime() === todayOnly.getTime()) {
    return 'Hoy';
  } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
    return 'Ayer';
  } else {
    return d.toLocaleDateString('es-AR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  }
}

/**
 * Group array by key function
 */
export function groupBy<T>(array: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return array.reduce((result, item) => {
    const key = keyFn(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {} as Record<string, T[]>);
}
