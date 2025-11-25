'use client';

import { useRouter } from 'next/navigation';
import { CreditCard, Wallet as WalletIcon, Building2, TrendingUp, Pencil } from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Amount } from '@/src/components/ui/Typography';
import { cn } from '@/src/lib/utils';
import { Product, ProductType, Currency } from '@/src/types';

interface AccountCardProps {
  product: Product;
  displayCurrency: Currency;
  convertedBalance: number;
  onEdit?: (product: Product) => void;
}

const PRODUCT_TYPE_CONFIG: Record<ProductType, { icon: typeof CreditCard; bgColor: string; textColor: string; label: string }> = {
  CASH: { icon: WalletIcon, bgColor: 'bg-green-100', textColor: 'text-green-600', label: 'Efectivo' },
  CHECKING: { icon: Building2, bgColor: 'bg-blue-100', textColor: 'text-blue-600', label: 'Cuenta Corriente' },
  SAVINGS: { icon: TrendingUp, bgColor: 'bg-emerald-100', textColor: 'text-emerald-600', label: 'Caja de Ahorro' },
  CREDIT_CARD: { icon: CreditCard, bgColor: 'bg-purple-100', textColor: 'text-purple-600', label: 'Tarjeta de Crédito' },
  LOAN: { icon: Building2, bgColor: 'bg-orange-100', textColor: 'text-orange-600', label: 'Préstamo' },
};

export function AccountCard({ product, displayCurrency, convertedBalance, onEdit }: AccountCardProps) {
  const router = useRouter();
  const config = PRODUCT_TYPE_CONFIG[product.type];
  const Icon = config.icon;

  const handleClick = () => {
    router.push(`/accounts/${product.id}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(product);
  };

  return (
    <Card
      variant="interactive"
      padding="none"
      onClick={handleClick}
      className="group"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', config.bgColor)}>
              <Icon className={cn('w-5 h-5', config.textColor)} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-[var(--color-text-primary)] truncate">
                {product.name}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">
                {product.institution?.name || config.label}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {onEdit && (
              <button
                onClick={handleEdit}
                className={cn(
                  'p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity',
                  'hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)]'
                )}
                aria-label="Editar producto"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}
            <span
              className={cn(
                'text-xs font-medium px-2 py-0.5 rounded-full',
                product.currency === 'ARS'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-green-100 text-green-700'
              )}
            >
              {product.currency}
            </span>
          </div>
        </div>

        {/* Balance */}
        <div className="mb-4">
          <p className="text-caption text-[var(--color-text-muted)] mb-1">
            Balance actual
          </p>
          <Amount
            value={convertedBalance}
            currency={displayCurrency}
            size="lg"
            type={product.balance >= 0 ? 'income' : 'expense'}
          />
          {displayCurrency !== product.currency && (
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Original: {product.currency === 'ARS' ? '$' : 'US$'} {product.balance.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
            </p>
          )}
        </div>

        {/* Metadata */}
        {(product.type === 'CREDIT_CARD' || (product.type === 'LOAN' && product.limit)) && (
          <div className="pt-3 border-t border-[var(--color-border)]">
            {product.type === 'CREDIT_CARD' && product.closingDay && product.dueDay && (
              <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                <span>Cierre día {product.closingDay}</span>
                <span>•</span>
                <span>Vence día {product.dueDay}</span>
              </div>
            )}
            {product.type === 'LOAN' && product.limit && (
              <div className="text-xs text-[var(--color-text-muted)]">
                Límite disponible: {product.currency === 'ARS' ? '$' : 'US$'} {product.limit.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
