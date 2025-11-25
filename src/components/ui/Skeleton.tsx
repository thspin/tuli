import { cn } from '@/src/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('bg-[var(--color-bg-tertiary)] rounded animate-pulse', className)}
      aria-hidden="true"
    />
  );
}

// Skeleton específico para transacciones
export function TransactionSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4" aria-busy="true" aria-label="Cargando transacción">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-5 w-20" />
    </div>
  );
}

// Skeleton para cards de cuenta
export function AccountCardSkeleton() {
  return (
    <div
      className="bg-[var(--color-bg-secondary)] rounded-xl p-5 border border-[var(--color-border)]"
      aria-busy="true"
      aria-label="Cargando cuenta"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-8 w-40" />
      </div>
    </div>
  );
}

// Skeleton para listas
export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
