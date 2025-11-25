import * as LucideIcons from 'lucide-react';
import { cn } from '@/src/lib/utils';

export type IconName = keyof typeof LucideIcons;

interface IconProps {
  name: IconName;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

export const Icon = ({
  name,
  size = 'md',
  className,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = !ariaLabel,
  ...props
}: IconProps) => {
  const LucideIcon = LucideIcons[name] as LucideIcons.LucideIcon;

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }

  return (
    <LucideIcon
      className={cn(sizes[size], className)}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      {...props}
    />
  );
};
