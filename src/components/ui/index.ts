/**
 * Barrel file para exportar todos los componentes UI
 * Permite importar múltiples componentes desde un solo lugar
 * Ejemplo: import { Button, Modal, Input } from '@/src/components/ui';
 */

// Buttons & Inputs
export { default as Button, Button as ButtonNamed } from './Button';
export type { ButtonVariant, ButtonSize } from './Button';

export { default as Input, Input as InputNamed } from './Input';
export { default as Select, Select as SelectNamed } from './Select';

// Form Components (with validation)
export { FormInput } from './FormInput';
export { FormSelect } from './FormSelect';
export { FormTextarea } from './FormTextarea';

// Layout & Containers
export { default as Modal, Modal as ModalNamed } from './Modal';
export {
  default as Card,
  Card as CardNamed,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from './Card';

// Feedback
export { default as Alert } from './Alert';
export type { AlertVariant } from './Alert';

export { ToastComponent, ToastContainer } from './Toast';
export type { Toast, ToastVariant } from './Toast';

// Typography
export { Heading, Amount, Text } from './Typography';

// Icons
export { Icon } from './Icon';
export type { IconName } from './Icon';

// Loading & Empty States
export { Skeleton, TransactionSkeleton, AccountCardSkeleton, ListSkeleton } from './Skeleton';
export { EmptyState } from './EmptyState';

// Dropdowns
export {
  DropdownMenu,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
} from './DropdownMenu';

// Specialized
export { CurrencyToggle } from './CurrencyToggle';
