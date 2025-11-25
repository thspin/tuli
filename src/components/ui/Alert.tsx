// src/components/ui/Alert.tsx
import React from 'react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
    variant?: AlertVariant;
    title?: string;
    children: React.ReactNode;
    onClose?: () => void;
    className?: string;
}

const variantStyles: Record<AlertVariant, { bg: string; border: string; text: string; icon: string }> = {
    info: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-800',
        icon: 'ℹ️',
    },
    success: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-800',
        icon: '✅',
    },
    warning: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-800',
        icon: '⚠️',
    },
    error: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-800',
        icon: '❌',
    },
};

export default function Alert({
    variant = 'info',
    title,
    children,
    onClose,
    className = '',
}: AlertProps) {
    const styles = variantStyles[variant];

    return (
        <div className={`${styles.bg} border ${styles.border} rounded-lg p-4 ${className}`}>
            <div className="flex items-start gap-3">
                <span className="text-xl">{styles.icon}</span>
                <div className="flex-1">
                    {title && (
                        <h4 className={`font-semibold ${styles.text} mb-1`}>{title}</h4>
                    )}
                    <div className={`text-sm ${styles.text}`}>{children}</div>
                </div>
                {onClose && (
                    <button
                        onClick={onClose}
                        className={`${styles.text} hover:opacity-70 text-lg leading-none`}
                        aria-label="Cerrar"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}
