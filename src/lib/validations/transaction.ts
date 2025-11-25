import { z } from 'zod';

export const transactionSchema = z.object({
  amount: z
    .number({
      required_error: 'El monto es requerido',
      invalid_type_error: 'El monto debe ser un número',
    })
    .positive('El monto debe ser mayor a 0')
    .max(999999999, 'El monto es demasiado grande'),
  description: z
    .string({
      required_error: 'La descripción es requerida',
    })
    .min(3, 'La descripción debe tener al menos 3 caracteres')
    .max(200, 'La descripción no puede exceder 200 caracteres')
    .trim(),
  date: z.date({
    required_error: 'La fecha es requerida',
    invalid_type_error: 'La fecha no es válida',
  }),
  type: z.enum(['INCOME', 'EXPENSE'], {
    required_error: 'El tipo de transacción es requerido',
  }),
  productId: z
    .string({
      required_error: 'Debes seleccionar un producto',
    })
    .min(1, 'Debes seleccionar un producto'),
  categoryId: z.string().optional(),
  installments: z
    .number()
    .int('Las cuotas deben ser un número entero')
    .min(1, 'Debe haber al menos 1 cuota')
    .max(60, 'No se permiten más de 60 cuotas')
    .optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;

export const incomeSchema = z.object({
  amount: z
    .number({
      required_error: 'El monto es requerido',
      invalid_type_error: 'El monto debe ser un número',
    })
    .positive('El monto debe ser mayor a 0')
    .max(999999999, 'El monto es demasiado grande'),
  description: z
    .string({
      required_error: 'La descripción es requerida',
    })
    .min(3, 'La descripción debe tener al menos 3 caracteres')
    .max(200, 'La descripción no puede exceder 200 caracteres')
    .trim(),
  date: z.date({
    required_error: 'La fecha es requerida',
    invalid_type_error: 'La fecha no es válida',
  }),
  productId: z
    .string({
      required_error: 'Debes seleccionar una cuenta',
    })
    .min(1, 'Debes seleccionar una cuenta'),
  categoryId: z.string().optional(),
});

export type IncomeFormData = z.infer<typeof incomeSchema>;
