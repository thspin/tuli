import { z } from 'zod';

export const productSchema = z.object({
  name: z
    .string({
      required_error: 'El nombre es requerido',
    })
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),
  type: z.enum(['SAVINGS_ACCOUNT', 'CHECKING_ACCOUNT', 'CREDIT_CARD', 'CASH', 'INVESTMENT', 'LOAN'], {
    required_error: 'El tipo de producto es requerido',
  }),
  currency: z.enum(['ARS', 'USD'], {
    required_error: 'La moneda es requerida',
  }),
  balance: z
    .number({
      required_error: 'El balance inicial es requerido',
      invalid_type_error: 'El balance debe ser un número',
    })
    .max(999999999, 'El balance es demasiado grande'),
  institutionId: z.string().optional(),
  closingDay: z
    .number()
    .int('El día de cierre debe ser un número entero')
    .min(1, 'El día debe estar entre 1 y 31')
    .max(31, 'El día debe estar entre 1 y 31')
    .optional()
    .nullable(),
  dueDay: z
    .number()
    .int('El día de vencimiento debe ser un número entero')
    .min(1, 'El día debe estar entre 1 y 31')
    .max(31, 'El día debe estar entre 1 y 31')
    .optional()
    .nullable(),
  creditLimit: z
    .number()
    .positive('El límite debe ser mayor a 0')
    .max(999999999, 'El límite es demasiado grande')
    .optional()
    .nullable(),
});

export type ProductFormData = z.infer<typeof productSchema>;

export const institutionSchema = z.object({
  name: z
    .string({
      required_error: 'El nombre es requerido',
    })
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),
});

export type InstitutionFormData = z.infer<typeof institutionSchema>;
