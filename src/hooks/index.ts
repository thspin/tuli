// src/hooks/index.ts
/**
 * Barrel file para exportar todos los hooks
 * Permite importar múltiples hooks desde un solo lugar
 * Ejemplo: import { useModal, useFormState } from '@/src/hooks';
 */

export { useModal } from './useModal';
export { useFormState } from './useFormState';
export { useCurrency } from './useCurrency';
export { useAsync } from './useAsync';
