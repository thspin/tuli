// src/hooks/useCurrency.ts
'use client'

import { useState, useCallback } from 'react';
import { Currency } from '@prisma/client';
import type { DisplayCurrency } from '@/src/types';

/**
 * Hook para manejar conversión de monedas y formatos
 */
export function useCurrency(usdToArsRate: number | null) {
    const [displayCurrency, setDisplayCurrency] = useState<DisplayCurrency>('ARS');

    const convertAmount = useCallback((amount: number, fromCurrency: Currency): number => {
        if (displayCurrency === 'ARS') {
            if (fromCurrency === 'USD') {
                return amount * (usdToArsRate || 1350);
            }
            return amount;
        } else {
            // displayCurrency === 'USD'
            if (fromCurrency === 'ARS') {
                return amount / (usdToArsRate || 1350);
            }
            return amount;
        }
    }, [displayCurrency, usdToArsRate]);

    const formatCurrency = useCallback((amount: number, currency?: DisplayCurrency): string => {
        const currencyToUse = currency || displayCurrency;
        const symbol = currencyToUse === 'ARS' ? '$' : 'US$';
        const formatted = amount.toLocaleString('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return `${symbol} ${formatted}`;
    }, [displayCurrency]);

    const toggleCurrency = useCallback(() => {
        setDisplayCurrency((prev) => (prev === 'ARS' ? 'USD' : 'ARS'));
    }, []);

    return {
        displayCurrency,
        setDisplayCurrency,
        toggleCurrency,
        convertAmount,
        formatCurrency,
    };
}
