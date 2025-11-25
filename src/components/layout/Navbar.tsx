'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Wallet, FileText, Tag } from 'lucide-react';
import { ThemeToggle } from '@/src/components/ui/ThemeToggle';
import { cn } from '@/src/lib/utils';

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/accounts', label: 'Cuentas', icon: Wallet },
  { href: '/summaries', label: 'Resúmenes', icon: FileText },
  { href: '/categories', label: 'Categorías', icon: Tag },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg-secondary)]/80 backdrop-blur-lg border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[var(--color-primary)] rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-display font-semibold text-lg text-[var(--color-text-primary)]">
              Tuli
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive =
                pathname === href || (href !== '/' && pathname.startsWith(href));

              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
