'use client'

import { useState, useEffect } from 'react';
import { createTransaction } from '@/src/actions/transactions/transaction-actions';
import { getCategories } from '@/src/actions/categories/category-actions';
import { Product, InstitutionWithProducts, Category } from '@/src/types';
import { Modal, Input, Select } from '@/src/components/ui';

interface AddTransactionButtonProps {
    institutions: InstitutionWithProducts[];
    cashProducts: Product[];
}

export default function AddTransactionButton({ institutions, cashProducts }: AddTransactionButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Selection state
    const [selectedInstitutionId, setSelectedInstitutionId] = useState<string>('');
    const [selectedProductId, setSelectedProductId] = useState<string>('');

    // Categories state
    const [categories, setCategories] = useState<any[]>([]);

    // Hydration fix: Date state
    const [dateValue, setDateValue] = useState('');

    // Transaction details state
    const [amount, setAmount] = useState('');
    const [installments, setInstallments] = useState(1);
    const [installmentAmount, setInstallmentAmount] = useState('');

    useEffect(() => {
        // Set default date only on client to avoid hydration mismatch
        setDateValue(new Date().toISOString().split('T')[0]);
    }, []);

    // Load categories when modal opens
    useEffect(() => {
        if (isOpen) {
            loadCategories();
        }
    }, [isOpen]);

    const loadCategories = async () => {
        const result = await getCategories('EXPENSE');
        if (result.success) {
            setCategories(result.categories || []);
        }
    };

    // Filter products based on selected institution
    const availableProducts = selectedInstitutionId === 'CASH'
        ? cashProducts
        : selectedInstitutionId
            ? institutions.find(i => i.id === selectedInstitutionId)?.products || []
            : [];

    // Reset product when institution changes
    useEffect(() => {
        setSelectedProductId('');
    }, [selectedInstitutionId]);

    const selectedProduct = availableProducts.find(p => p.id === selectedProductId);
    const isCreditCard = selectedProduct?.type === 'CREDIT_CARD';

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Ensure installmentAmount is sent if it exists
        if (installmentAmount) {
            formData.set('installmentAmount', installmentAmount);
        }

        try {
            const result = await createTransaction(formData);

            if (result.success) {
                setIsOpen(false);
                form.reset();
                setSelectedInstitutionId('');
                setSelectedProductId('');
                setAmount('');
                setInstallments(1);
                setInstallmentAmount('');
                // Reset date to today
                setDateValue(new Date().toISOString().split('T')[0]);
            } else {
                setError(result.error || 'Error desconocido');
            }
        } catch (err) {
            console.error('Client submission error:', err);
            setError(`Error al procesar la solicitud: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
            >
                <span>💸</span> Nuevo Gasto
            </button>

            {isOpen && (
                <Modal
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="Nuevo Gasto"
                >

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="date"
                            label="Fecha"
                            name="date"
                            required
                            value={dateValue}
                            onChange={(e) => setDateValue(e.target.value)}
                        />

                        {/* Step 1: Institution Selection */}
                        <Select
                            label="Institución / Origen"
                            value={selectedInstitutionId}
                            onChange={(e) => setSelectedInstitutionId(e.target.value)}
                        >
                            <option value="">Seleccionar...</option>
                            <option value="CASH">💵 Efectivo</option>
                            {institutions.map(inst => (
                                <option key={inst.id} value={inst.id}>
                                    {inst.type === 'BANK' ? '🏦' : '📱'} {inst.name}
                                </option>
                            ))}
                        </Select>

                        {/* Step 2: Product Selection */}
                        <Select
                            label="Cuenta / Producto"
                            name="fromProductId"
                            required
                            value={selectedProductId}
                            onChange={(e) => setSelectedProductId(e.target.value)}
                            disabled={!selectedInstitutionId}
                        >
                            <option value="">
                                {!selectedInstitutionId
                                    ? 'Seleccione una institución primero'
                                    : 'Seleccionar cuenta...'}
                            </option>
                            {availableProducts.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.name} ({product.currency})
                                </option>
                            ))}
                        </Select>

                        <Input
                            type="number"
                            label="Monto"
                            name="amount"
                            step="0.01"
                            required
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => {
                                const newAmount = e.target.value;
                                setAmount(newAmount);
                                // Update installment amount if installments > 1
                                if (installments > 1 && newAmount) {
                                    setInstallmentAmount((parseFloat(newAmount) / installments).toFixed(2));
                                }
                            }}
                        />

                        <Select
                            label="Categoría"
                            name="categoryId"
                        >
                            <option value="">Sin categoría</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.icon ? `${category.icon} ` : ''}{category.name}
                                </option>
                            ))}
                        </Select>

                        <Input
                            type="text"
                            label="Descripción"
                            name="description"
                            required
                            placeholder="Ej: Supermercado, Nafta"
                        />

                        {isCreditCard && (
                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 space-y-3">
                                <Select
                                    label="Cuotas"
                                    name="installments"
                                    value={installments}
                                    onChange={(e) => {
                                        const newInstallments = parseInt(e.target.value);
                                        setInstallments(newInstallments);
                                        // Reset installment amount to simple division when changing installments
                                        if (amount) {
                                            setInstallmentAmount((parseFloat(amount) / newInstallments).toFixed(2));
                                        }
                                    }}
                                    className="border-blue-200 focus:ring-blue-500"
                                >
                                    <option value="1">1 pago</option>
                                    <option value="3">3 cuotas</option>
                                    <option value="6">6 cuotas</option>
                                    <option value="9">9 cuotas</option>
                                    <option value="12">12 cuotas</option>
                                    <option value="18">18 cuotas</option>
                                    <option value="24">24 cuotas</option>
                                </Select>

                                {installments > 1 && (
                                    <div>
                                        <label className="block text-sm font-medium text-blue-900 mb-1">
                                            Valor de cada cuota
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <span className="text-blue-500 font-bold">$</span>
                                            <Input
                                                type="number"
                                                name="installmentAmount"
                                                step="0.01"
                                                value={installmentAmount}
                                                onChange={(e) => setInstallmentAmount(e.target.value)}
                                                className="border-blue-200 focus:ring-blue-500"
                                                fullWidth={true}
                                            />
                                        </div>

                                        {amount && installmentAmount && (
                                            <div className="mt-2 text-xs text-blue-700 space-y-1">
                                                <div className="flex justify-between">
                                                    <span>Total financiado:</span>
                                                    <span className="font-bold">
                                                        ${(parseFloat(installmentAmount) * installments).toFixed(2)}
                                                    </span>
                                                </div>
                                                {(parseFloat(installmentAmount) * installments) > parseFloat(amount) && (
                                                    <div className="flex justify-between text-orange-600">
                                                        <span>Interés total:</span>
                                                        <span>
                                                            +${((parseFloat(installmentAmount) * installments) - parseFloat(amount)).toFixed(2)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <p className="text-xs text-blue-600">
                                    Se crearán transacciones futuras para cada cuota.
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? 'Guardando...' : 'Guardar Gasto'}
                        </button>
                    </form>
                </Modal>
            )}
        </>
    );
}
