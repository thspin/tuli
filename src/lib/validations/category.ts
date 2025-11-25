import { z } from 'zod';

export const categorySchema = z.object({
  name: z
    .string({
      required_error: 'El nombre es requerido',
    })
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .trim(),
  type: z.enum(['INCOME', 'EXPENSE'], {
    required_error: 'El tipo de categoría es requerido',
  }),
  icon: z
    .string()
    .max(10, 'El ícono no puede exceder 10 caracteres')
    .optional()
    .nullable(),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, 'El color debe ser un código hexadecimal válido (ej: #FF5733)')
    .optional()
    .nullable(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
