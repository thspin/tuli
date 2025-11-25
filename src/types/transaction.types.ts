// src/types/transaction.types.ts
import { TransactionType, Currency } from '@prisma/client';

export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';
import { Product } from './product.types';
import { Category } from './category.types';

export interface Transaction {
    id: string;
    amount: number;
    date: Date | string;
    description: string;
    status: TransactionStatus;
    type: TransactionType;
    categoryId: string | null;
    installmentNumber: number | null;
    installmentTotal: number | null;
    installmentId: string | null;
    userId: string;
    fromProductId: string;
    toProductId: string | null;
}

export interface TransactionWithDetails extends Transaction {
    category: Category | null;
    fromProduct: Product | null;
    toProduct: Product | null;
}

export interface TransactionFormData {
    date: string;
    fromProductId: string;
    amount: number;
    categoryId?: string;
    description: string;
    installments?: number;
    installmentAmount?: number;
}

export interface IncomeFormData {
    date: string;
    productId: string;
    amount: number;
    categoryId?: string;
    description: string;
}
