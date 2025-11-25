// src/components/ui/index.ts
/**
 * Barrel file para exportar todos los componentes UI
 * Permite importar múltiples componentes desde un solo lugar
 * Ejemplo: import { Button, Modal, Input } from '@/src/components/ui';
 */

export { default as Button } from './Button';
export type { ButtonVariant, ButtonSize } from './Button';

export { default as Modal } from './Modal';

export { default as Input } from './Input';

export { default as Select } from './Select';

export { default as Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card';

export { default as Alert } from './Alert';
export type { AlertVariant } from './Alert';
