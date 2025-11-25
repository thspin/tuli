// src/components/ui/Modal.tsx
'use client'

import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
};

export default function Modal({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = 'md',
}: ModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <div
                className={`bg-white rounded-lg ${maxWidthClasses[maxWidth]} w-full p-6 max-h-[90vh] overflow-y-auto`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                        aria-label="Cerrar"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div>{children}</div>
            </div>
        </div>
    );
}
