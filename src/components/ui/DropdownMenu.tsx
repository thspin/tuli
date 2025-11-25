'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/src/lib/utils';

interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface DropdownContentProps {
  children: React.ReactNode;
  align?: 'start' | 'end';
  className?: string;
}

interface DropdownItemProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const DropdownContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({ isOpen: false, setIsOpen: () => {} });

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
}

export function DropdownTrigger({ children, asChild }: DropdownTriggerProps) {
  const { isOpen, setIsOpen } = React.useContext(DropdownContext);
  const ref = useRef<HTMLButtonElement>(null);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: () => setIsOpen(!isOpen),
      'aria-expanded': isOpen,
      'aria-haspopup': 'true',
      ref,
    });
  }

  return (
    <button
      ref={ref}
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      aria-haspopup="true"
      className={cn(
        'inline-flex items-center justify-center',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2'
      )}
    >
      {children}
    </button>
  );
}

export function DropdownContent({ children, align = 'end', className }: DropdownContentProps) {
  const { isOpen, setIsOpen } = React.useContext(DropdownContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15 }}
          className={cn(
            'absolute top-full mt-2 z-50',
            'min-w-[200px] rounded-lg',
            'bg-[var(--color-bg-secondary)] border border-[var(--color-border)]',
            'shadow-lg',
            'py-1',
            align === 'end' ? 'right-0' : 'left-0',
            className
          )}
          role="menu"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DropdownItem({ children, icon, onClick, className }: DropdownItemProps) {
  const { setIsOpen } = React.useContext(DropdownContext);

  const handleClick = () => {
    onClick?.();
    setIsOpen(false);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'w-full flex items-center gap-3 px-4 py-2.5',
        'text-sm text-[var(--color-text-primary)]',
        'hover:bg-[var(--color-bg-tertiary)]',
        'transition-colors',
        'focus:outline-none focus:bg-[var(--color-bg-tertiary)]',
        className
      )}
      role="menuitem"
    >
      {icon && <span className="text-[var(--color-text-muted)]">{icon}</span>}
      {children}
    </button>
  );
}

export function DropdownSeparator() {
  return <div className="h-px bg-[var(--color-border)] my-1" role="separator" />;
}
