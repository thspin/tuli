'use client';

import { useState } from 'react';
import { Plus, MoreHorizontal, Building2, CreditCard, ArrowUpRight, Wallet } from 'lucide-react';
import { Heading, Text, Amount } from '@/src/components/ui/Typography';
import { Button } from '@/src/components/ui/Button';
import { CurrencyToggle } from '@/src/components/ui/CurrencyToggle';
import { EmptyState } from '@/src/components/ui/EmptyState';
import {
  DropdownMenu,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
} from '@/src/components/ui/DropdownMenu';
import { AccountCard } from './AccountCard';
import AddInstitutionButton from './AddInstitutionButton';
import AddProductButton from './AddProductButton';
import AddTransactionButton from '../transactions/AddTransactionButton';
import AddIncomeButton from './AddIncomeButton';
import { Product, InstitutionWithProducts, DisplayCurrency, Currency } from '@/src/types';

interface AccountsClientProps {
  institutions: InstitutionWithProducts[];
  cashProducts: Product[];
  usdToArsRate: number | null;
}

export default function AccountsClient({
  institutions,
  cashProducts,
  usdToArsRate,
}: AccountsClientProps) {
  const [displayCurrency, setDisplayCurrency] = useState<DisplayCurrency>('ARS');
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddInstitution, setShowAddInstitution] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const convertAmount = (amount: number, fromCurrency: Currency): number => {
    if (displayCurrency === 'ARS') {
      if (fromCurrency === 'USD') {
        return amount * (usdToArsRate || 1350);
      }
      return amount;
    } else {
      if (fromCurrency === 'ARS') {
        return amount / (usdToArsRate || 1350);
      }
      return amount;
    }
  };

  const calculateInstitutionBalance = (products: Product[]): number => {
    return products.reduce((sum, product) => {
      const converted = convertAmount(product.balance, product.currency);
      return sum + converted;
    }, 0);
  };

  const allProducts = [...cashProducts, ...institutions.flatMap((i) => i.products)];
  const hasAccounts = allProducts.length > 0;

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <Heading level={1}>Mis Cuentas</Heading>
            <Text variant="body-sm" color="secondary" className="mt-1">
              Gestiona tus productos financieros y transacciones
            </Text>
          </div>

          <div className="flex items-center gap-2">
            {usdToArsRate && (
              <CurrencyToggle
                value={displayCurrency}
                onChange={setDisplayCurrency}
                rate={usdToArsRate}
              />
            )}

            <Button
              variant="primary"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setShowAddTransaction(true)}
            >
              Nueva Transacción
            </Button>

            <DropdownMenu>
              <DropdownTrigger asChild>
                <Button variant="secondary" size="md">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownTrigger>
              <DropdownContent align="end">
                <DropdownItem
                  icon={<Building2 className="w-4 h-4" />}
                  onClick={() => setShowAddInstitution(true)}
                >
                  Agregar Institución
                </DropdownItem>
                <DropdownItem
                  icon={<CreditCard className="w-4 h-4" />}
                  onClick={() => setShowAddProduct(true)}
                >
                  Agregar Producto
                </DropdownItem>
                <DropdownSeparator />
                <DropdownItem
                  icon={<ArrowUpRight className="w-4 h-4" />}
                  onClick={() => setShowAddIncome(true)}
                >
                  Registrar Ingreso
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </div>
        </div>

        {!hasAccounts ? (
          <EmptyState
            icon={Wallet}
            title="Sin cuentas registradas"
            description="Agrega tu primera cuenta o institución financiera para comenzar a gestionar tus finanzas"
            action={
              <div className="flex gap-3">
                <Button
                  leftIcon={<Building2 className="w-4 h-4" />}
                  onClick={() => setShowAddInstitution(true)}
                >
                  Agregar Institución
                </Button>
                <Button
                  variant="secondary"
                  leftIcon={<Wallet className="w-4 h-4" />}
                  onClick={() => setShowAddProduct(true)}
                >
                  Agregar Efectivo
                </Button>
              </div>
            }
          />
        ) : (
          <>
            {/* Efectivo */}
            {cashProducts.length > 0 && (
              <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <Heading level={2} className="flex items-center gap-2">
                    <Wallet className="w-6 h-6 text-[var(--color-accent)]" />
                    Efectivo
                  </Heading>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cashProducts.map((product) => (
                    <AccountCard
                      key={product.id}
                      product={product}
                      displayCurrency={displayCurrency}
                      convertedBalance={convertAmount(product.balance, product.currency)}
                      onEdit={setEditingProduct}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Instituciones */}
            {institutions.map((institution) => (
              <section key={institution.id} className="mb-8">
                <div className="bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="w-5 h-5 text-[var(--color-accent)]" />
                        <Heading level={2}>{institution.name}</Heading>
                      </div>
                      <Text variant="body-sm" color="muted">
                        Balance total:{' '}
                        <Amount
                          value={calculateInstitutionBalance(institution.products)}
                          currency={displayCurrency}
                          className="font-medium"
                        />
                      </Text>
                    </div>
                    <AddInstitutionButton mode="edit" institution={institution} />
                  </div>

                  {institution.products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {institution.products.map((product) => (
                        <AccountCard
                          key={product.id}
                          product={product}
                          displayCurrency={displayCurrency}
                          convertedBalance={convertAmount(product.balance, product.currency)}
                          onEdit={setEditingProduct}
                        />
                      ))}
                    </div>
                  ) : (
                    <Text variant="body-sm" color="muted" className="text-center py-8">
                      No hay productos en esta institución
                    </Text>
                  )}
                </div>
              </section>
            ))}
          </>
        )}
      </div>

      {/* Modales */}
      {showAddTransaction && (
        <AddTransactionButton
          institutions={institutions}
          cashProducts={cashProducts}
        />
      )}
      {showAddIncome && (
        <AddIncomeButton
          institutions={institutions}
          cashProducts={cashProducts}
        />
      )}
      {showAddInstitution && <AddInstitutionButton />}
      {showAddProduct && <AddProductButton institutions={institutions} />}
      {editingProduct && (
        <AddProductButton
          mode="edit"
          product={editingProduct}
          institutions={institutions}
        />
      )}
    </div>
  );
}
