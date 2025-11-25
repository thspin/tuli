'use client';

import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import Modal from '@/src/components/ui/Modal';
import { Button } from '@/src/components/ui/Button';
import { Select } from '@/src/components/ui/Select';
import { Amount, Text, Heading } from '@/src/components/ui/Typography';
import { Alert } from '@/src/components/ui/Alert';
import { payOffSummary } from '@/src/actions/summaries/payment-actions';
import { Product, MONTH_NAMES } from '@/src/types';
import { useToast } from '@/src/providers/ToastProvider';

interface PaymentModalProps {
  summary: any;
  product: Product;
  paymentAccounts: any[];
  onClose: () => void;
  onPaymentComplete: (receipt: any) => void;
}

export default function PaymentModal({
  summary,
  product,
  paymentAccounts,
  onClose,
  onPaymentComplete,
}: PaymentModalProps) {
  const { error: showError } = useToast();
  const [selectedPaymentAccount, setSelectedPaymentAccount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePaySummary = async () => {
    if (!selectedPaymentAccount) return;

    const paymentAccountData = paymentAccounts.find((a) => a.id === selectedPaymentAccount);

    setIsLoading(true);
    try {
      const result = await payOffSummary(summary.id, selectedPaymentAccount);
      if (result.success) {
        const receipt = {
          date: new Date(),
          summaryMonth: MONTH_NAMES[summary.month - 1],
          summaryYear: summary.year,
          amount: Number(summary.totalAmount),
          currency: product.currency,
          productName: product.name,
          paymentAccountName: paymentAccountData?.name || '',
          paymentAccountType: paymentAccountData?.type || '',
        };

        onPaymentComplete(receipt);
      } else {
        showError('Error', result.error || 'Error al pagar el resumen');
      }
    } catch (err) {
      showError('Error', 'Error al pagar el resumen');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen onClose={onClose} title="Pagar Resumen">
      <div className="space-y-6">
        {/* Summary Info */}
        <div className="p-4 bg-[var(--color-primary)]/5 rounded-lg border border-[var(--color-primary)]/20">
          <Text variant="body-sm" color="secondary" className="mb-1">
            Resumen a pagar:
          </Text>
          <Heading level={3} className="mb-1">
            {MONTH_NAMES[summary.month - 1]} {summary.year}
          </Heading>
          <Text variant="body-sm" color="muted" className="mb-3">
            {product.name}
          </Text>
          <Amount
            value={Number(summary.totalAmount)}
            currency={product.currency as 'ARS' | 'USD'}
            className="text-2xl font-bold text-[var(--color-primary)]"
          />
        </div>

        {/* Payment Account Selection */}
        {paymentAccounts.length === 0 ? (
          <Alert variant="warning">
            No tienes cuentas con saldo suficiente para pagar este resumen.
          </Alert>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Cuenta de pago
              </label>
              <Select
                value={selectedPaymentAccount}
                onChange={(e) => setSelectedPaymentAccount(e.target.value)}
                className="w-full"
              >
                <option value="">Seleccionar cuenta...</option>
                {paymentAccounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} ({account.currency}) - Disponible: {account.balance.toFixed(2)}
                  </option>
                ))}
              </Select>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button variant="secondary" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button
                variant="success"
                onClick={handlePaySummary}
                disabled={!selectedPaymentAccount}
                loading={isLoading}
                leftIcon={<CreditCard className="w-4 h-4" />}
                className="flex-1"
              >
                Confirmar Pago
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
