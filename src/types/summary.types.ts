// src/types/summary.types.ts
import { Transaction } from './transaction.types';

export interface Summary {
    id: string;
    year: number;
    month: number;
    closingDate: Date | string;
    dueDate: Date | string;
    totalAmount: number;
    isClosed: boolean;
    productId: string;
}

export interface SummaryDetail {
    periodStart: Date | string;
    periodEnd: Date | string;
    dueDate: Date | string;
    transactions: Transaction[];
}

export interface PaymentAccount {
    id: string;
    name: string;
    type: string;
    currency: string;
    balance: number;
}

export interface PaymentReceipt {
    date: Date;
    summaryMonth: string;
    summaryYear: number;
    amount: number;
    currency: string;
    productName: string;
    paymentAccountName: string;
    paymentAccountType: string;
}

export const MONTH_NAMES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];
