'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DollarSign, Calendar, FileText, Tag, CreditCard } from 'lucide-react';
import { FormInput, FormSelect, Button } from '@/src/components/ui';
import { transactionSchema, TransactionFormData } from '@/src/lib/validations/transaction';
import { Product, InstitutionWithProducts } from '@/src/types';

interface TransactionFormProps {
  institutions: InstitutionWithProducts[];
  cashProducts: Product[];
  categories: any[];
  onSubmit: (data: TransactionFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export function TransactionForm({
  institutions,
  cashProducts,
  categories,
  onSubmit,
  isSubmitting = false,
}: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: new Date(),
      type: 'EXPENSE',
      installments: 1,
    },
  });

  const selectedProductId = watch('productId');
  const isCreditCard = [...institutions.flatMap((i) => i.products), ...cashProducts].find(
    (p) => p.id === selectedProductId
  )?.type === 'CREDIT_CARD';

  const allProducts = [
    ...institutions.map((inst) => ({
      label: inst.name,
      options: inst.products.map((p) => ({ value: p.id, label: `${p.name} (${p.currency})` })),
    })),
    {
      label: 'Efectivo',
      options: cashProducts.map((p) => ({ value: p.id, label: `${p.name} (${p.currency})` })),
    },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Amount */}
      <FormInput
        {...register('amount', { valueAsNumber: true })}
        id="amount"
        type="number"
        step="0.01"
        label="Monto"
        placeholder="0.00"
        error={errors.amount?.message}
        leftIcon={<DollarSign className="w-4 h-4" />}
        required
      />

      {/* Description */}
      <FormInput
        {...register('description')}
        id="description"
        type="text"
        label="Descripción"
        placeholder="Ej: Supermercado, Nafta, Netflix..."
        error={errors.description?.message}
        leftIcon={<FileText className="w-4 h-4" />}
        required
      />

      {/* Date */}
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <FormInput
            id="date"
            type="date"
            label="Fecha"
            error={errors.date?.message}
            leftIcon={<Calendar className="w-4 h-4" />}
            value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : ''}
            onChange={(e) => field.onChange(new Date(e.target.value))}
            required
          />
        )}
      />

      {/* Product */}
      <FormSelect {...register('productId')} id="productId" label="Producto" error={errors.productId?.message} required>
        <option value="">Seleccionar producto...</option>
        {allProducts.map((group) => (
          <optgroup key={group.label} label={group.label}>
            {group.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </optgroup>
        ))}
      </FormSelect>

      {/* Category */}
      <FormSelect {...register('categoryId')} id="categoryId" label="Categoría (Opcional)" error={errors.categoryId?.message}>
        <option value="">Sin categoría</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.icon} {category.name}
          </option>
        ))}
      </FormSelect>

      {/* Installments (only for credit cards) */}
      {isCreditCard && (
        <FormInput
          {...register('installments', { valueAsNumber: true })}
          id="installments"
          type="number"
          min="1"
          max="60"
          label="Cuotas"
          placeholder="1"
          hint="Para compras en cuotas. Dejar en 1 para pago único."
          error={errors.installments?.message}
          leftIcon={<CreditCard className="w-4 h-4" />}
        />
      )}

      {/* Submit Button */}
      <div className="flex gap-3 pt-4">
        <Button type="submit" loading={isSubmitting} className="flex-1" leftIcon={<DollarSign className="w-4 h-4" />}>
          Crear Transacción
        </Button>
      </div>
    </form>
  );
}
