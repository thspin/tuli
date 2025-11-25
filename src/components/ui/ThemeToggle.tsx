'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/src/providers/ThemeProvider';
import {
  DropdownMenu,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from './DropdownMenu';
import { Button } from './Button';
import { cn } from '@/src/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownTrigger asChild>
        <Button
          variant="ghost"
          size="md"
          className="w-9 px-0"
          aria-label="Cambiar tema"
        >
          {resolvedTheme === 'dark' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </Button>
      </DropdownTrigger>
      <DropdownContent align="end">
        <DropdownItem
          icon={<Sun className="w-4 h-4" />}
          onClick={() => setTheme('light')}
          className={cn(theme === 'light' && 'bg-[var(--color-bg-tertiary)]')}
        >
          Claro
        </DropdownItem>
        <DropdownItem
          icon={<Moon className="w-4 h-4" />}
          onClick={() => setTheme('dark')}
          className={cn(theme === 'dark' && 'bg-[var(--color-bg-tertiary)]')}
        >
          Oscuro
        </DropdownItem>
        <DropdownItem
          icon={<Monitor className="w-4 h-4" />}
          onClick={() => setTheme('system')}
          className={cn(theme === 'system' && 'bg-[var(--color-bg-tertiary)]')}
        >
          Sistema
        </DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  );
}
