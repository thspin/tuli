'use client';

import { useState } from 'react';
import { ArrowUpDown, Filter, Pencil, Trash2 } from 'lucide-react';
import { Heading, Text, Amount } from '@/src/components/ui/Typography';
import { Select } from '@/src/components/ui/Select';
import { Button } from '@/src/components/ui/Button';
import { EmptyState } from '@/src/components/ui/EmptyState';
import { cn, groupBy, formatRelativeDate } from '@/src/lib/utils';

interface Transaction {
  id: string;
  amount: number;
  date: Date | string;
  description: string;
  type: string;
  installmentNumber?: number | null;
  installmentTotal?: number | null;
  category?: {
    name: string;
    icon: string | null;
  } | null;
}

interface TransactionListProps {
  initialTransactions: Transaction[];
  currency: string;
}

export default function TransactionList({ initialTransactions, currency }: TransactionListProps) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterType, setFilterType] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL');

  const filteredTransactions = initialTransactions.filter((t) => {
    if (filterType === 'ALL') return true;
    return t.type === filterType;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  // Agrupar por fecha
  const groupedTransactions = groupBy(sortedTransactions, (t) =>
    formatRelativeDate(t.date)
  );

  return (
    <div className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Heading level={3}>Historial de Transacciones</Heading>

        <div className="flex gap-2">
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as 'ALL' | 'INCOME' | 'EXPENSE')}
            className="w-auto"
          >
            <option value="ALL">Todos</option>
            <option value="INCOME">Ingresos</option>
            <option value="EXPENSE">Egresos</option>
          </Select>

          <Button
            variant="secondary"
            size="md"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            leftIcon={<ArrowUpDown className="w-4 h-4" />}
            aria-label={sortOrder === 'asc' ? 'Ordenar más recientes primero' : 'Ordenar más antiguos primero'}
          >
            {sortOrder === 'asc' ? 'Antiguos' : 'Recientes'}
          </Button>
        </div>
      </div>

      {/* Content */}
      {sortedTransactions.length === 0 ? (
        <EmptyState
          icon={Filter}
          title="No hay transacciones"
          description="No se encontraron transacciones que coincidan con los filtros seleccionados"
        />
      ) : (
        <div className="divide-y divide-[var(--color-border)]">
          {Object.entries(groupedTransactions).map(([date, transactions]) => (
            <div key={date} className="p-6">
              {/* Date Separator */}
              <div className="flex items-center gap-4 mb-4">
                <Text variant="caption" color="muted">
                  {date}
                </Text>
                <div className="flex-1 h-px bg-[var(--color-border)]" />
              </div>

              {/* Transactions */}
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    currency={currency}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TransactionItem({
  transaction,
  currency,
}: {
  transaction: Transaction;
  currency: string;
}) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors group">
      {/* Category Icon */}
      <div
        className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
          transaction.type === 'INCOME'
            ? 'bg-[var(--color-income-light)] text-[var(--color-income)]'
            : 'bg-[var(--color-expense-light)] text-[var(--color-expense)]'
        )}
      >
        {transaction.category?.icon ? (
          <span className="text-xl">{transaction.category.icon}</span>
        ) : transaction.type === 'INCOME' ? (
          <span className="text-xl">💰</span>
        ) : (
          <span className="text-xl">💸</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-[var(--color-text-primary)] truncate">
          {transaction.description}
        </p>
        <div className="flex items-center gap-2 text-body-sm text-[var(--color-text-muted)]">
          {transaction.category && <span>{transaction.category.name}</span>}
          {transaction.installmentNumber && (
            <>
              {transaction.category && <span>•</span>}
              <span className="text-[var(--color-accent)]">
                Cuota {transaction.installmentNumber}/{transaction.installmentTotal}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Amount */}
      <div className="text-right flex-shrink-0">
        <Amount
          value={transaction.amount}
          currency={currency as 'ARS' | 'USD'}
          type={transaction.type === 'INCOME' ? 'income' : 'expense'}
          showSign
        />
      </div>

      {/* Actions (visible on hover) */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 flex-shrink-0">
        <button
          className="p-1.5 rounded hover:bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
          aria-label="Editar transacción"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          className="p-1.5 rounded hover:bg-[var(--color-expense-light)] text-[var(--color-text-muted)] hover:text-[var(--color-expense)]"
          aria-label="Eliminar transacción"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
