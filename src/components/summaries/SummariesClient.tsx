'use client';

import { useState, useEffect } from 'react';
import { CreditCard, FileText, Calendar, CheckCircle, Clock, Filter } from 'lucide-react';
import { Heading, Text, Amount } from '@/src/components/ui/Typography';
import { Button } from '@/src/components/ui/Button';
import { Select } from '@/src/components/ui/Select';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { EmptyState } from '@/src/components/ui/EmptyState';
import { ListSkeleton } from '@/src/components/ui/Skeleton';
import { generateAllSummaries, getProductSummaries, getSummaryDetail } from '@/src/actions/summaries/summary-actions';
import { getPaymentAccounts } from '@/src/actions/summaries/payment-actions';
import { Product, MONTH_NAMES } from '@/src/types';
import { formatCurrency, formatDate, cn } from '@/src/lib/utils';
import { useToast } from '@/src/providers/ToastProvider';
import PaymentModal from './PaymentModal';
import PaymentReceipt from './PaymentReceipt';

interface SummariesClientProps {
  products: Product[];
}

export default function SummariesClient({ products }: SummariesClientProps) {
  const { success, error: showError } = useToast();
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [summaries, setSummaries] = useState<any[]>([]);
  const [selectedSummary, setSelectedSummary] = useState<any>(null);
  const [summaryDetail, setSummaryDetail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Payment modal states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAccounts, setPaymentAccounts] = useState<any[]>([]);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  // Receipt modal states
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  // Cargar resúmenes cuando se selecciona un producto
  useEffect(() => {
    if (selectedProductId) {
      loadSummaries();
    } else {
      setSummaries([]);
      setSelectedSummary(null);
      setSummaryDetail(null);
    }
  }, [selectedProductId]);

  const loadSummaries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getProductSummaries(selectedProductId);
      if (result.success) {
        setSummaries(result.summaries || []);
      } else {
        const errorMsg = result.error || 'Error al cargar resúmenes';
        setError(errorMsg);
        showError('Error', errorMsg);
      }
    } catch (err) {
      const errorMsg = 'Error al cargar resúmenes';
      setError(errorMsg);
      showError('Error', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSummaryDetail = async (summary: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getSummaryDetail(selectedProductId, summary.year, summary.month);
      if (result.success) {
        setSummaryDetail(result);
        setSelectedSummary(summary);
      } else {
        const errorMsg = result.error || 'Error al cargar detalle';
        setError(errorMsg);
        showError('Error', errorMsg);
      }
    } catch (err) {
      const errorMsg = 'Error al cargar detalle';
      setError(errorMsg);
      showError('Error', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (!selectedProduct) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await generateAllSummaries(selectedProductId);
      if (result.success) {
        await loadSummaries();
        if (result.count && result.count > 0) {
          success('Resúmenes generados', `Se generaron ${result.count} resumen(es) correctamente`);
        } else {
          const errorMsg = 'No se encontraron transacciones para generar resúmenes';
          setError(errorMsg);
          showError('Sin transacciones', errorMsg);
        }
      } else {
        const errorMsg = result.error || 'Error al generar resúmenes';
        setError(errorMsg);
        showError('Error', errorMsg);
      }
    } catch (err) {
      const errorMsg = 'Error al generar resúmenes';
      setError(errorMsg);
      showError('Error', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenPaymentModal = async () => {
    if (!selectedSummary) return;

    setIsPaymentLoading(true);
    setError(null);
    try {
      const result = await getPaymentAccounts(Number(selectedSummary.totalAmount));
      if (result.success) {
        setPaymentAccounts(result.accounts || []);
        setShowPaymentModal(true);
      } else {
        const errorMsg = result.error || 'Error al cargar cuentas de pago';
        setError(errorMsg);
        showError('Error', errorMsg);
      }
    } catch (err) {
      const errorMsg = 'Error al cargar cuentas de pago';
      setError(errorMsg);
      showError('Error', errorMsg);
    } finally {
      setIsPaymentLoading(false);
    }
  };

  const handlePaymentComplete = (receipt: any) => {
    setReceiptData(receipt);
    setShowPaymentModal(false);
    setShowReceiptModal(true);
    loadSummaries();
    setSelectedSummary(null);
    setSummaryDetail(null);
    success('Pago exitoso', 'El resumen ha sido pagado correctamente');
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Heading level={1}>Resúmenes</Heading>
          <Text variant="body-sm" color="secondary" className="mt-1">
            Visualiza y paga los resúmenes mensuales de tus tarjetas de crédito y préstamos
          </Text>
        </div>

        {/* Product Selector */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
              <div className="flex-1 w-full">
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  Producto Financiero
                </label>
                <Select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full"
                >
                  <option value="">Seleccionar producto...</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} ({product.currency})
                    </option>
                  ))}
                </Select>
                {selectedProduct && selectedProduct.closingDay && selectedProduct.dueDay && (
                  <Text variant="caption" color="muted" className="mt-2">
                    Cierre día {selectedProduct.closingDay} · Vencimiento día {selectedProduct.dueDay}
                  </Text>
                )}
              </div>

              {selectedProductId && (
                <Button
                  onClick={handleGenerateSummary}
                  loading={isLoading}
                  leftIcon={<FileText className="w-4 h-4" />}
                  variant="secondary"
                >
                  Generar Resúmenes
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {!selectedProductId ? (
          <EmptyState
            icon={CreditCard}
            title="Selecciona un producto"
            description="Elige una tarjeta de crédito o préstamo para ver sus resúmenes mensuales"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: List of summaries */}
            <Card>
              <CardHeader>
                <CardTitle>Historial de Resúmenes</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading && summaries.length === 0 ? (
                  <ListSkeleton count={3} />
                ) : summaries.length === 0 ? (
                  <EmptyState
                    icon={Filter}
                    title="Sin resúmenes"
                    description="No hay resúmenes disponibles. Genera uno para empezar."
                    size="sm"
                  />
                ) : (
                  <div className="space-y-3">
                    {summaries.map((summary) => (
                      <div
                        key={summary.id}
                        onClick={() => loadSummaryDetail(summary)}
                        className={cn(
                          'p-4 border rounded-lg cursor-pointer transition-all',
                          selectedSummary?.id === summary.id
                            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-sm'
                            : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-bg-tertiary)]'
                        )}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-[var(--color-text-primary)]">
                              {MONTH_NAMES[summary.month - 1]} {summary.year}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-1">
                              {summary.isClosed ? (
                                <>
                                  <CheckCircle className="w-3.5 h-3.5 text-[var(--color-income)]" />
                                  <Text variant="caption" color="muted">
                                    Cerrado
                                  </Text>
                                </>
                              ) : (
                                <>
                                  <Clock className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                                  <Text variant="caption" color="muted">
                                    Parcial
                                  </Text>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <Amount
                              value={Number(summary.totalAmount)}
                              currency={selectedProduct?.currency as 'ARS' | 'USD'}
                              className="text-lg font-bold"
                            />
                            <div className="flex items-center gap-1.5 mt-1 justify-end">
                              <Calendar className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
                              <Text variant="caption" color="muted">
                                {formatDate(summary.dueDate)}
                              </Text>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Right: Summary detail */}
            <Card>
              <CardHeader>
                <CardTitle>Detalle del Resumen</CardTitle>
              </CardHeader>
              <CardContent>
                {!selectedSummary ? (
                  <EmptyState
                    icon={FileText}
                    title="Selecciona un resumen"
                    description="Haz clic en un resumen de la lista para ver sus detalles"
                    size="sm"
                  />
                ) : isLoading ? (
                  <ListSkeleton count={3} />
                ) : summaryDetail ? (
                  <div>
                    {/* Info Card */}
                    <div className="mb-6 p-4 bg-[var(--color-bg-tertiary)] rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <Text variant="body-sm" color="secondary">
                          Período
                        </Text>
                        <Text variant="body-sm" className="font-medium">
                          {formatDate(summaryDetail.periodStart)} - {formatDate(summaryDetail.periodEnd)}
                        </Text>
                      </div>
                      <div className="flex justify-between items-center">
                        <Text variant="body-sm" color="secondary">
                          Vencimiento
                        </Text>
                        <Text variant="body-sm" className="font-medium">
                          {formatDate(summaryDetail.dueDate)}
                        </Text>
                      </div>
                      <div className="flex justify-between items-center">
                        <Text variant="body-sm" color="secondary">
                          Estado
                        </Text>
                        <div className="flex items-center gap-1.5">
                          {selectedSummary.isClosed ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-[var(--color-income)]" />
                              <Text variant="body-sm" className="font-medium text-[var(--color-income)]">
                                Definitivo
                              </Text>
                            </>
                          ) : (
                            <>
                              <Clock className="w-4 h-4 text-[var(--color-accent)]" />
                              <Text variant="body-sm" className="font-medium text-[var(--color-accent)]">
                                Parcial
                              </Text>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Transactions */}
                    <div className="mb-6">
                      <Heading level={4} className="mb-3">
                        Transacciones ({summaryDetail.transactions.length})
                      </Heading>
                      {summaryDetail.transactions.length === 0 ? (
                        <Text variant="body-sm" color="muted" className="text-center py-8">
                          No hay transacciones en este período
                        </Text>
                      ) : (
                        <div className="space-y-2 max-h-80 overflow-y-auto">
                          {summaryDetail.transactions.map((transaction: any) => (
                            <div
                              key={transaction.id}
                              className="p-3 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors"
                            >
                              <div className="flex justify-between items-start gap-3">
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-[var(--color-text-primary)] truncate">
                                    {transaction.description}
                                  </p>
                                  <Text variant="caption" color="muted">
                                    {formatDate(transaction.date)}
                                  </Text>
                                </div>
                                <Amount
                                  value={Number(transaction.amount)}
                                  currency={selectedProduct?.currency as 'ARS' | 'USD'}
                                  className="font-semibold flex-shrink-0"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Total and Payment */}
                    <div className="pt-4 border-t border-[var(--color-border)]">
                      <div className="flex justify-between items-center mb-4">
                        <Text className="text-lg font-bold">Total a Pagar</Text>
                        <Amount
                          value={Number(selectedSummary.totalAmount)}
                          currency={selectedProduct?.currency as 'ARS' | 'USD'}
                          className="text-2xl font-bold text-[var(--color-primary)]"
                        />
                      </div>

                      <Button
                        onClick={handleOpenPaymentModal}
                        loading={isPaymentLoading}
                        variant="success"
                        className="w-full"
                        leftIcon={<CreditCard className="w-4 h-4" />}
                      >
                        Pagar Resumen
                      </Button>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Modals */}
      {showPaymentModal && selectedSummary && selectedProduct && (
        <PaymentModal
          summary={selectedSummary}
          product={selectedProduct}
          paymentAccounts={paymentAccounts}
          onClose={() => setShowPaymentModal(false)}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      {showReceiptModal && receiptData && (
        <PaymentReceipt receipt={receiptData} onClose={() => setShowReceiptModal(false)} />
      )}
    </div>
  );
}
