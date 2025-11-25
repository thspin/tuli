'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Wallet, FileText, Tag } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/accounts', label: 'Cuentas', icon: Wallet },
  { href: '/summaries', label: 'Resúmenes', icon: FileText },
  { href: '/categories', label: 'Categorías', icon: Tag },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] safe-area-pb"
      aria-label="Navegación móvil"
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href || (href !== '/' && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 py-2 px-4 min-w-[64px]',
                'transition-colors',
                isActive
                  ? 'text-[var(--color-primary)]'
                  : 'text-[var(--color-text-muted)]'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                className={cn('w-5 h-5', isActive && 'stroke-[2.5]')}
                aria-hidden="true"
              />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
