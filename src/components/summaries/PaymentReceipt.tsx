'use client';

import { CheckCircle } from 'lucide-react';
import Modal from '@/src/components/ui/Modal';
import { Button } from '@/src/components/ui/Button';
import { Amount, Text, Heading } from '@/src/components/ui/Typography';

interface PaymentReceiptProps {
  receipt: {
    date: Date;
    summaryMonth: string;
    summaryYear: number;
    amount: number;
    currency: string;
    productName: string;
    paymentAccountName: string;
    paymentAccountType: string;
  };
  onClose: () => void;
}

export default function PaymentReceipt({ receipt, onClose }: PaymentReceiptProps) {
  return (
    <Modal isOpen onClose={onClose} title="">
      <div className="space-y-6">
        {/* Success Icon */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--color-income-light)] rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-[var(--color-income)]" />
          </div>
          <Heading level={2} className="text-[var(--color-income)] mb-2">
            ¡Pago Exitoso!
          </Heading>
          <Text variant="body-sm" color="secondary">
            Tu pago ha sido procesado correctamente
          </Text>
        </div>

        {/* Receipt Ticket */}
        <div
          className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-6"
          style={{
            background:
              'repeating-linear-gradient(0deg, var(--color-bg-primary), var(--color-bg-primary) 10px, var(--color-bg-secondary) 10px, var(--color-bg-secondary) 20px)',
          }}
        >
          {/* Header */}
          <div className="text-center mb-4 pb-4 border-b border-dashed border-[var(--color-border)]">
            <Text variant="caption" color="muted" className="uppercase tracking-wide mb-1 block">
              Comprobante de Pago
            </Text>
            <Text variant="caption" color="muted">
              {receipt.date.toLocaleDateString('es-AR')} •{' '}
              {receipt.date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div>
              <Text variant="caption" color="muted" className="uppercase tracking-wide block mb-1">
                Resumen Pagado
              </Text>
              <p className="font-semibold text-[var(--color-text-primary)]">
                {receipt.summaryMonth} {receipt.summaryYear}
              </p>
              <Text variant="body-sm" color="secondary">
                {receipt.productName}
              </Text>
            </div>

            <div className="pt-4 border-t border-dashed border-[var(--color-border)]">
              <Text variant="caption" color="muted" className="uppercase tracking-wide block mb-1">
                Pagado Desde
              </Text>
              <p className="font-medium text-[var(--color-text-primary)]">
                {receipt.paymentAccountName}
              </p>
            </div>

            <div className="pt-4 border-t border-dashed border-[var(--color-border)]">
              <Text variant="caption" color="muted" className="uppercase tracking-wide block mb-1">
                Monto
              </Text>
              <Amount
                value={receipt.amount}
                currency={receipt.currency as 'ARS' | 'USD'}
                className="text-3xl font-bold text-[var(--color-income)]"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-dashed border-[var(--color-border)] text-center">
            <Text variant="caption" color="muted">
              El saldo de tu {receipt.productName} ha sido restaurado
            </Text>
          </div>
        </div>

        {/* Action button */}
        <Button variant="success" onClick={onClose} className="w-full">
          Continuar
        </Button>
      </div>
    </Modal>
  );
}
