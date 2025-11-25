// src/types/product.types.ts
import { ProductType, Currency } from '@prisma/client';

export interface Product {
    id: string;
    name: string;
    type: ProductType;
    currency: Currency;
    balance: number;
    closingDay?: number | null;
    dueDay?: number | null;
    limit?: number | null;
    sharedLimit?: boolean;
    institutionId?: string | null;
}

export interface ProductWithInstitution extends Product {
    institution?: Institution | null;
}

export interface Institution {
    id: string;
    name: string;
    type: 'BANK' | 'WALLET';
}

export interface InstitutionWithProducts extends Institution {
    products: Product[];
}

export const PRODUCT_TYPE_ICONS: Record<ProductType, string> = {
    CASH: '💵',
    SAVINGS_ACCOUNT: '🏦',
    CHECKING_ACCOUNT: '📋',
    DEBIT_CARD: '💳',
    CREDIT_CARD: '💳',
    LOAN: '📊',
};

export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
    CASH: 'Efectivo',
    SAVINGS_ACCOUNT: 'Caja de Ahorro',
    CHECKING_ACCOUNT: 'Cuenta Corriente',
    DEBIT_CARD: 'Tarjeta de Débito',
    CREDIT_CARD: 'Tarjeta de Crédito',
    LOAN: 'Préstamo',
};

export const CURRENCY_LABELS: Record<Currency, string> = {
    ARS: 'Peso Argentino (ARS)',
    USD: 'Dólar (USD)',
    USDT: 'Tether (USDT)',
    USDC: 'USD Coin (USDC)',
    BTC: 'Bitcoin (BTC)',
};
