// src/components/ui/Card.tsx
import React from 'react';

interface CardProps {
    children: React.ReactNode;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hover?: boolean;
    onClick?: () => void;
    className?: string;
}

const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
};

export default function Card({
    children,
    padding = 'md',
    hover = false,
    onClick,
    className = '',
}: CardProps) {
    const hoverClass = hover ? 'hover:shadow-md transition-shadow cursor-pointer' : '';
    const clickableClass = onClick ? 'cursor-pointer' : '';

    return (
        <div
            className={`bg-white rounded-lg shadow ${paddingClasses[padding]} ${hoverClass} ${clickableClass} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

// Card Header component
export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={`mb-4 ${className}`}>{children}</div>;
}

// Card Title component
export function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <h3 className={`text-xl font-bold text-gray-900 ${className}`}>{children}</h3>;
}

// Card Content component
export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={className}>{children}</div>;
}

// Card Footer component
export function CardFooter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>{children}</div>;
}
