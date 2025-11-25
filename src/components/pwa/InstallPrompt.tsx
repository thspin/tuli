'use client';

import { Download, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/src/components/ui/Button';
import { Text } from '@/src/components/ui/Typography';
import { usePWA } from '@/src/hooks/usePWA';
import { motion, AnimatePresence } from 'framer-motion';

export function InstallPrompt() {
  const { isInstallable, installApp } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isInstallable || isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-50"
      >
        <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-xl shadow-lg p-4 max-w-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[var(--color-primary)] rounded-lg flex items-center justify-center flex-shrink-0">
              <Download className="w-5 h-5 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">
                Instalar Tuli
              </h3>
              <Text variant="body-sm" color="secondary" className="mb-3">
                Accede más rápido y usa la app sin conexión
              </Text>

              <div className="flex gap-2">
                <Button size="sm" onClick={installApp} leftIcon={<Download className="w-4 h-4" />}>
                  Instalar
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsDismissed(true)}
                  aria-label="Cerrar"
                >
                  Ahora no
                </Button>
              </div>
            </div>

            <button
              onClick={() => setIsDismissed(true)}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
